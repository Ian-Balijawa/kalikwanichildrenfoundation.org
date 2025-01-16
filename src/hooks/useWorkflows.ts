import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useRequest from './useRequest';
import { DemandType, IStage } from '@/types/api';

export interface Workflow {
	stages: {
		id: number;
		name: string;
		description: string;
		order: number;
		createdAt: string;
		updatedAt: string;
	}[];
	id: number;
	name: string;
	description: string;
	demandTypes: DemandType[];
}

export type CreateWorkflowInput = {
	name: string;
	description: string;
	demandTypes: DemandType[];
	stages: IStage[];
	id?: number;
};

export type UpdateWorkflowInput = Partial<CreateWorkflowInput>;

const WORKFLOWS_QUERY_KEY = ['workflows'] as const;

// API functions
const workflowsApi = ( request: ReturnType<typeof useRequest> ) => ( {
	fetchWorkflows: async (): Promise<Workflow[]> => {
		const response = await request.get<Workflow[]>( '/workflows' );
		return response.data;
	},

	fetchWorkflow: async ( id: number ): Promise<Workflow> => {
		const response = await request.get<Workflow>( `/workflows/${id}` );
		return response.data;
	},

	createWorkflow: async ( data: CreateWorkflowInput ): Promise<Workflow> => {
		const response = await request.post<Workflow>( '/workflows', data );
		return response.data;
	},

	updateWorkflow: async ( { id, data }: { id: number; data: UpdateWorkflowInput } ): Promise<Workflow> => {
		const response = await request.put<Workflow>( `/workflows/${id}`, data );
		return response.data;
	},

	deleteWorkflow: async ( id: number ): Promise<void> => {
		await request.delete( `/workflows/${id}` );
	},
} );

export const useWorkflows = ( id?: number ) => {
	const request = useRequest();
	const queryClient = useQueryClient();
	const api = workflowsApi( request );

	// Queries
	const {
		data: workflows = [],
		isLoading: isLoadingWorkflows,
		error: workflowsError,
	} = useQuery( {
		queryKey: WORKFLOWS_QUERY_KEY,
		queryFn: api.fetchWorkflows,
	} );

	const {
		data: workflow,
		isLoading: isLoadingWorkflow,
		error: workflowError,
	} = useQuery( {
		queryKey: [...WORKFLOWS_QUERY_KEY, id],
		queryFn: () => api.fetchWorkflow( id! ),
		enabled: !!id,
	} );

	// Mutations
	const createWorkflow = useMutation( {
		mutationFn: api.createWorkflow,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: WORKFLOWS_QUERY_KEY } );
		},
	} );

	const updateWorkflow = useMutation( {
		mutationFn: api.updateWorkflow,
		onSuccess: ( updatedWorkflow ) => {
			queryClient.invalidateQueries( { queryKey: WORKFLOWS_QUERY_KEY } );
			queryClient.setQueryData<Workflow[]>( WORKFLOWS_QUERY_KEY, ( old ) =>
				old?.map( ( item ) =>
					item.id === updatedWorkflow.id ? updatedWorkflow : item
				)
			);
		},
	} );

	const deleteWorkflow = useMutation( {
		mutationFn: api.deleteWorkflow,
		onSuccess: ( _, deletedId ) => {
			queryClient.invalidateQueries( { queryKey: WORKFLOWS_QUERY_KEY } );
			queryClient.setQueryData<Workflow[]>( WORKFLOWS_QUERY_KEY, ( old ) =>
				old?.filter( ( item ) => item.id !== deletedId )
			);
		},
	} );

	return {
		// Data
		workflows,
		workflow,

		// Loading states
		isLoading: isLoadingWorkflows || isLoadingWorkflow,
		isCreating: createWorkflow.isPending,
		isUpdating: updateWorkflow.isPending,
		isDeleting: deleteWorkflow.isPending,

		// Error states
		error: workflowsError || workflowError,

		// Mutations
		createWorkflow: createWorkflow.mutate,
		updateWorkflow: updateWorkflow.mutate,
		deleteWorkflow: deleteWorkflow.mutate,
	};
};
