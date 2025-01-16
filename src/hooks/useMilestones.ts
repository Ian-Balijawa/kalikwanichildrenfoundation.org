import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useRequest from './useRequest';

interface Milestone {
	id: number;
	name: string;
	criticalPathOrder: number;
	completed: boolean;
}

type CreateMilestoneInput = Omit<Milestone, 'id'>;
type UpdateMilestoneInput = Partial<CreateMilestoneInput>;

const MILESTONES_QUERY_KEY = ['milestones'] as const;

// API functions
const milestonesApi = ( request: ReturnType<typeof useRequest> ) => ( {
	fetchMilestones: async (): Promise<Milestone[]> => {
		const response = await request.get<Milestone[]>( '/milestones' );
		return response.data;
	},

	fetchMilestone: async ( id: number ): Promise<Milestone> => {
		const response = await request.get<Milestone>( `/milestones/${id}` );
		return response.data;
	},

	createMilestone: async ( data: CreateMilestoneInput ): Promise<Milestone> => {
		const response = await request.post<Milestone>( '/milestones', data );
		return response.data;
	},

	updateMilestone: async ( { id, data }: { id: number; data: UpdateMilestoneInput } ): Promise<Milestone> => {
		const response = await request.put<Milestone>( `/milestones/${id}`, data );
		return response.data;
	},

	deleteMilestone: async ( id: number ): Promise<void> => {
		await request.delete( `/milestones/${id}` );
	},
} );

export const useMilestones = ( id?: number ) => {
	const request = useRequest();
	const queryClient = useQueryClient();
	const api = milestonesApi( request );

	// Queries
	const {
		data: milestones = [],
		isLoading: isLoadingMilestones,
		error: milestonesError,
	} = useQuery( {
		queryKey: MILESTONES_QUERY_KEY,
		queryFn: api.fetchMilestones,
	} );

	const {
		data: milestone,
		isLoading: isLoadingMilestone,
		error: milestoneError,
	} = useQuery( {
		queryKey: [...MILESTONES_QUERY_KEY, id],
		queryFn: () => api.fetchMilestone( id! ),
		enabled: !!id,
	} );

	// Mutations
	const createMilestone = useMutation( {
		mutationFn: api.createMilestone,
		onSuccess: ( newMilestone ) => {
			queryClient.invalidateQueries( { queryKey: MILESTONES_QUERY_KEY } );
			// Optimistically update the cache
			queryClient.setQueryData<Milestone[]>( MILESTONES_QUERY_KEY, ( old ) =>
				old ? [...old, newMilestone] : [newMilestone]
			);
		},
	} );

	const updateMilestone = useMutation( {
		mutationFn: api.updateMilestone,
		onSuccess: ( updatedMilestone ) => {
			queryClient.invalidateQueries( { queryKey: MILESTONES_QUERY_KEY } );
			// Optimistically update the cache
			queryClient.setQueryData<Milestone[]>( MILESTONES_QUERY_KEY, ( old ) =>
				old?.map( ( item ) =>
					item.id === updatedMilestone.id ? updatedMilestone : item
				)
			);
		},
	} );

	const deleteMilestone = useMutation( {
		mutationFn: api.deleteMilestone,
		onSuccess: ( _, deletedId ) => {
			queryClient.invalidateQueries( { queryKey: MILESTONES_QUERY_KEY } );
			// Optimistically update the cache
			queryClient.setQueryData<Milestone[]>( MILESTONES_QUERY_KEY, ( old ) =>
				old?.filter( ( item ) => item.id !== deletedId )
			);
		},
	} );

	return {
		// Data
		milestones,
		milestone,

		// Loading states
		isLoading: isLoadingMilestones || isLoadingMilestone,
		isCreating: createMilestone.isPending,
		isUpdating: updateMilestone.isPending,
		isDeleting: deleteMilestone.isPending,

		// Error states
		error: milestonesError || milestoneError,

		// Mutations
		createMilestone: createMilestone.mutate,
		updateMilestone: updateMilestone.mutate,
		deleteMilestone: deleteMilestone.mutate,
	};
};
