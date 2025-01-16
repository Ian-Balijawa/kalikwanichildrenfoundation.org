import { useMutation, useQueryClient } from '@tanstack/react-query';
import useRequest from './useRequest';

interface DemandStage {
	id?: number;
	demandId: number;
	stageId: number;
	status: 'NotStarted' | 'InProgress' | 'Completed' | 'Blocked';
}

type CreateDemandStageInput = Omit<DemandStage, 'id'>;
type UpdateDemandStageInput = Partial<Pick<DemandStage, 'status'>>;

const DEMAND_STAGES_QUERY_KEY = ['demand-stages'] as const;

// API functions
const demandStagesApi = ( request: ReturnType<typeof useRequest> ) => ( {
	createDemandStage: async ( data: CreateDemandStageInput ): Promise<DemandStage> => {
		const response = await request.post<DemandStage>( '/demand-stages', data );
		return response.data;
	},

	updateDemandStage: async ( { id, data }: { id: number; data: UpdateDemandStageInput } ): Promise<DemandStage> => {
		const response = await request.put<DemandStage>( `/demand-stages/${id}`, data );
		return response.data;
	},

	deleteDemandStage: async ( id: number ): Promise<void> => {
		await request.delete( `/demand-stages/${id}` );
	},
} );

export const useDemandStages = () => {
	const request = useRequest();
	const queryClient = useQueryClient();
	const api = demandStagesApi( request );

	// Mutations
	const createDemandStage = useMutation( {
		mutationFn: api.createDemandStage,
		onSuccess: ( newDemandStage ) => {
			queryClient.invalidateQueries( { queryKey: DEMAND_STAGES_QUERY_KEY } );
			// Optimistically update the cache
			queryClient.setQueryData<DemandStage[]>( DEMAND_STAGES_QUERY_KEY, ( old ) =>
				old ? [...old, newDemandStage] : [newDemandStage]
			);
		},
	} );

	const updateDemandStage = useMutation( {
		mutationFn: api.updateDemandStage,
		onSuccess: ( updatedDemandStage ) => {
			queryClient.invalidateQueries( { queryKey: DEMAND_STAGES_QUERY_KEY } );
			// Optimistically update the cache
			queryClient.setQueryData<DemandStage[]>( DEMAND_STAGES_QUERY_KEY, ( old ) =>
				old?.map( ( item ) =>
					item.id === updatedDemandStage.id ? updatedDemandStage : item
				)
			);
		},
	} );

	const deleteDemandStage = useMutation( {
		mutationFn: api.deleteDemandStage,
		onSuccess: ( _, deletedId ) => {
			queryClient.invalidateQueries( { queryKey: DEMAND_STAGES_QUERY_KEY } );
			// Optimistically update the cache
			queryClient.setQueryData<DemandStage[]>( DEMAND_STAGES_QUERY_KEY, ( old ) =>
				old?.filter( ( item ) => item.id !== deletedId )
			);
		},
	} );

	return {
		// Loading states
		isCreating: createDemandStage.isPending,
		isUpdating: updateDemandStage.isPending,
		isDeleting: deleteDemandStage.isPending,

		// Mutations
		createDemandStage: createDemandStage.mutate,
		updateDemandStage: updateDemandStage.mutate,
		deleteDemandStage: deleteDemandStage.mutate,
	};
};
