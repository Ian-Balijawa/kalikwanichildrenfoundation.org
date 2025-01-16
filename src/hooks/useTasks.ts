import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useRequest from './useRequest';
import { User, ROLE } from '@/types/api';

export type Task = {
	id: number;
	title: string;
	description: string;
	workPlanId: number;
	deadline: string;
	startDate: string;
	endDate: string;
	subtasks: SubTask[];
	assignedTo?: User;
	storyPoints: number;
	progress: number;
	status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
};

export type SubTask = {
	title: string;
	description: string;
	taskId: number;
	deadline: Date;
	startDate: Date;
	endDate: Date;
	storyPoints: number;
	progress: number;
	status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
};

export type CreateTaskData = {
	title: string;
	description: string;
	workPlanId: number;
	deadline: string;
	assignedToId: number;
	storyPoints: number;
	progress: number;
	status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
};

export type UpdateTaskData = Partial<CreateTaskData>;

const TASKS_QUERY_KEY = ['tasks'] as const;
const TASK_QUERY_KEY = ( taskId?: number ) => ['task', taskId] as const;
const SUBTASKS_QUERY_KEY = ( taskId?: number ) => ['subtasks', taskId] as const;

// API functions
const tasksApi = ( request: ReturnType<typeof useRequest> ) => ( {
	fetchTasks: async ( workPlanId: number ): Promise<Task[]> => {
		const response = await request.get<Task[]>( '/tasks', {
			params: { workplanId: workPlanId },
		} );
		return response.data || [];
	},

	fetchTask: async ( taskId: number ): Promise<Task> => {
		const response = await request.get<Task>( `/tasks/${taskId}` );
		return response.data;
	},

	createTask: async ( data: CreateTaskData ): Promise<Task> => {
		const response = await request.post( '/tasks', data );
		return response.data;
	},

	updateTask: async ( { taskId, data }: { taskId: number; data: UpdateTaskData } ): Promise<Task> => {
		const response = await request.patch( `/tasks/${taskId}`, data );
		return response.data;
	},

	deleteTask: async ( { taskId }: { taskId: number } ): Promise<void> => {
		await request.delete( `/tasks/${taskId}` );
	},

	assignTask: async ( { taskId, userId }: { taskId: number; userId: number } ): Promise<Task> => {
		const response = await request.patch( `/tasks/${taskId}/assign/${userId}` );
		return response.data;
	},

	updateTaskStatus: async ( { taskId, status }: { taskId: number; status: string } ): Promise<Task> => {
		const response = await request.patch( `/tasks/${taskId}/status/${status}` );
		return response.data;
	},

	createSubtask: async ( data: SubTask ): Promise<SubTask> => {
		const response = await request.post( '/tasks/subtasks', data );
		return response.data;
	},

	fetchSubtasks: async ( taskId: number ): Promise<Task[]> => {
		const response = await request.get<Task[]>( '/tasks/subtasks', {
			params: { taskId },
		} );
		return response.data || [];
	},
} );

// Dummy tasks for demo
const dummyTasks: Task[] = [
	{
		id: 1,
		title: "API Endpoint Design",
		description: "Design and document API endpoints for mobile money integration",
		workPlanId: 1,
		deadline: "2024-03-20",
		startDate: "2024-03-15",
		endDate: "2024-03-20",
		assignedTo: {
			id: "1",
			firstname: "Jane",
			lastname: "Doe",
			email: "jane@example.com",
			role: ROLE.DEVELOPER,
			phoneNumber: "+1234567890",
			isOnline: true,
			isActive: true,
			lastSeen: new Date().toISOString(),
			isEmailVerified: true,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			password: "hashed_password",
		},
		storyPoints: 5,
		progress: 75,
		status: "IN_PROGRESS",
		subtasks: [
			{
				title: "Document API Endpoints",
				description: "Create detailed documentation for each endpoint",
				taskId: 1,
				deadline: new Date( "2024-03-18" ),
				startDate: new Date( "2024-03-15" ),
				endDate: new Date( "2024-03-18" ),
				storyPoints: 2,
				progress: 100,
				status: "COMPLETED"
			},
			{
				title: "Review with Team",
				description: "Team review of API design",
				taskId: 1,
				deadline: new Date( "2024-03-20" ),
				startDate: new Date( "2024-03-19" ),
				endDate: new Date( "2024-03-20" ),
				storyPoints: 1,
				progress: 0,
				status: "NOT_STARTED"
			}
		]
	},
	{
		id: 2,
		title: "API Implementation",
		description: "Implement the designed API endpoints",
		workPlanId: 1,
		deadline: "2024-03-30",
		startDate: "2024-03-21",
		endDate: "2024-03-30",
		assignedTo: {
			id: "2",
			firstname: "John",
			lastname: "Smith",
			email: "john@example.com",
			role: ROLE.DEVELOPER,
			phoneNumber: "+1234567891",
			isOnline: false,
			isActive: true,
			lastSeen: new Date().toISOString(),
			isEmailVerified: true,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			password: "hashed_password",
		},
		storyPoints: 8,
		progress: 0,
		status: "NOT_STARTED",
		subtasks: []
	},
	{
		id: 3,
		title: "USSD Menu Flow Design",
		description: "Design the new USSD menu flow structure",
		workPlanId: 2,
		deadline: "2024-03-10",
		startDate: "2024-03-01",
		endDate: "2024-03-10",
		assignedTo: {
			id: "3",
			firstname: "Alice",
			lastname: "Johnson",
			email: "alice@example.com",
			role: ROLE.BA,
			phoneNumber: "+1234567892",
			isOnline: true,
			isActive: true,
			lastSeen: new Date().toISOString(),
			isEmailVerified: true,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			password: "hashed_password",
		},
		storyPoints: 5,
		progress: 100,
		status: "COMPLETED",
		subtasks: []
	},
	{
		id: 4,
		title: "Dashboard UI Implementation",
		description: "Implement the analytics dashboard user interface",
		workPlanId: 3,
		deadline: "2024-04-15",
		startDate: "2024-03-20",
		endDate: "2024-04-15",
		storyPoints: 13,
		progress: 0,
		status: "NOT_STARTED",
		subtasks: []
	}
] as const;

export const useTasks = ( { workPlanId }: { workPlanId: number } ) => {
	const request = useRequest();
	const queryClient = useQueryClient();
	const api = tasksApi( request );

	// Queries
	const {
		data: tasks = dummyTasks.filter( task => task.workPlanId === workPlanId ),
		isFetching,
		error,
	} = useQuery( {
		queryKey: TASKS_QUERY_KEY,
		queryFn: () => Promise.resolve( dummyTasks.filter( task => task.workPlanId === workPlanId ) ),
		enabled: !!workPlanId,
	} );

	const useTask = ( taskId: number ) => {
		return useQuery( {
			queryKey: TASK_QUERY_KEY( taskId ),
			queryFn: () => api.fetchTask( taskId ),
			enabled: !!taskId,
		} );
	};

	const useSubtasks = ( taskId: number ) => {
		return useQuery( {
			queryKey: SUBTASKS_QUERY_KEY( taskId ),
			queryFn: () => api.fetchSubtasks( taskId ),
			enabled: !!taskId,
		} );
	};

	// Mutations
	const createTask = useMutation( {
		mutationFn: api.createTask,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: TASKS_QUERY_KEY } );
		},
	} );

	const updateTask = useMutation( {
		mutationFn: api.updateTask,
		onSuccess: ( _result, { taskId } ) => {
			queryClient.invalidateQueries( { queryKey: TASKS_QUERY_KEY } );
			queryClient.invalidateQueries( { queryKey: TASK_QUERY_KEY( taskId ) } );
		},
	} );

	const deleteTask = useMutation( {
		mutationFn: api.deleteTask,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: TASKS_QUERY_KEY } );
		},
	} );

	const assignTask = useMutation( {
		mutationFn: api.assignTask,
		onSuccess: ( _result, { taskId } ) => {
			queryClient.invalidateQueries( { queryKey: TASK_QUERY_KEY( taskId ) } );
		},
	} );

	const updateTaskStatus = useMutation( {
		mutationFn: api.updateTaskStatus,
		onSuccess: ( _result, { taskId } ) => {
			queryClient.invalidateQueries( { queryKey: TASK_QUERY_KEY( taskId ) } );
		},
	} );

	const createSubtask = useMutation( {
		mutationFn: api.createSubtask,
		onSuccess: ( _result, { taskId } ) => {
			queryClient.invalidateQueries( { queryKey: TASK_QUERY_KEY( taskId ) } );
		},
	} );

	return {
		// Data
		tasks,
		useTask,
		useSubtasks,

		// Loading states
		isLoading: isFetching,
		error,

		// Mutations
		createTask: createTask.mutate,
		updateTask: updateTask.mutate,
		deleteTask: deleteTask.mutate,
		assignTask: assignTask.mutate,
		updateTaskStatus: updateTaskStatus.mutate,
		createSubtask: createSubtask.mutate,

		// Mutation states
		isCreating: createTask.isPending,
		isUpdating: updateTask.isPending,
		isDeleting: deleteTask.isPending,
		isAssigning: assignTask.isPending,
		isUpdatingStatus: updateTaskStatus.isPending,
		isCreatingSubtask: createSubtask.isPending,
	};
};
