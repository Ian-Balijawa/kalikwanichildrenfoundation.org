import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useRequest from './useRequest';
import { DemandStageStatus, IStage as Stage } from '@/types/api';

export interface StageResponse {
	id: number;
	name: string;
	description: string;
	order: number;
	workflowId: number;
	createdAt: string;
	updatedAt: string;
	__demandStages__: {
		id: number;
		status: string;
		createdAt: string;
		updatedAt: string;
	}[];
}

type CreateStageInput = {
	name: string;
	description: string;
	order: number;
	workflowId: number;
	status: DemandStageStatus;
};

type UpdateStageInput = Partial<CreateStageInput>;

export const STAGES_QUERY_KEY = ['stages'] as const;

// API functions
const stagesApi = ( request: ReturnType<typeof useRequest> ) => ( {
	fetchStages: async (): Promise<Stage[]> => {
		const response = await request.get<Stage[]>( '/stages' );
		return response.data;
	},

	fetchStage: async ( id: number ): Promise<Stage> => {
		const response = await request.get<Stage>( `/stages/${id}` );
		return response.data;
	},

	createStage: async ( data: CreateStageInput ): Promise<Stage> => {
		const response = await request.post<Stage>( '/stages', data );
		return response.data;
	},

	updateStage: async ( { id, data }: { id: number; data: UpdateStageInput } ): Promise<Stage> => {
		const response = await request.put<Stage>( `/stages/${id}`, data );
		return response.data;
	},

	deleteStage: async ( id: number ): Promise<void> => {
		await request.delete( `/stages/${id}` );
	},
} );

export const useStages = ( id?: number ) => {
	const request = useRequest();
	const queryClient = useQueryClient();
	const api = stagesApi( request );

	// Queries
	const {
		data: stages = [],
		isLoading: isLoadingStages,
		error: stagesError,
	} = useQuery( {
		queryKey: STAGES_QUERY_KEY,
		queryFn: api.fetchStages,
	} );

	const {
		data: stage,
		isLoading: isLoadingStage,
		error: stageError,
	} = useQuery( {
		queryKey: [...STAGES_QUERY_KEY, id],
		queryFn: () => api.fetchStage( id! ),
		enabled: !!id,
	} );

	// Mutations
	const createStage = useMutation( {
		mutationFn: api.createStage,
		onSuccess: ( newStage ) => {
			queryClient.invalidateQueries( { queryKey: STAGES_QUERY_KEY } );
			// Optimistically update the cache
			queryClient.setQueryData<Stage[]>( STAGES_QUERY_KEY, ( old ) =>
				old ? [...old, newStage] : [newStage]
			);
		},
	} );

	const updateStage = useMutation( {
		mutationFn: api.updateStage,
		onSuccess: ( updatedStage ) => {
			queryClient.invalidateQueries( { queryKey: STAGES_QUERY_KEY } );
			// Optimistically update the cache
			queryClient.setQueryData<Stage[]>( STAGES_QUERY_KEY, ( old ) =>
				old?.map( ( item ) =>
					item.id === updatedStage.id ? updatedStage : item
				)
			);
		},
	} );

	const deleteStage = useMutation( {
		mutationFn: api.deleteStage,
		onSuccess: ( _, deletedId ) => {
			queryClient.invalidateQueries( { queryKey: STAGES_QUERY_KEY } );
			// Optimistically update the cache
			queryClient.setQueryData<Stage[]>( STAGES_QUERY_KEY, ( old ) =>
				old?.filter( ( item ) => item.id !== deletedId )
			);
		},
	} );

	return {
		// Data
		stages,
		stage,

		// Loading states
		isLoading: isLoadingStages || isLoadingStage,
		isCreating: createStage.isPending,
		isUpdating: updateStage.isPending,
		isDeleting: deleteStage.isPending,

		// Error states
		error: stagesError || stageError,

		// Mutations
		createStage: createStage.mutate,
		updateStage: updateStage.mutate,
		deleteStage: deleteStage.mutate,
	};
};
