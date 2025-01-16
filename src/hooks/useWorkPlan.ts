import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useRequest from './useRequest';
import { WorkPlan, WorkPlanResponse } from '@/types/WorkPlan';
import { Demand, PaymentMode, ApprovalStatus, ChannelsEnum, DemandStageStatus, DemandStatus, DemandType, DocumentStatus, StageName, DocumentType } from '@/types/api';

const WORK_PLANS_QUERY_KEY = ['workPlans'] as const;
const WORK_PLAN_QUERY_KEY = ( workPlanId?: string | number ) => ['workPlan', workPlanId] as const;

export type CreateWorkPlanData = {
	workPlanTitle: string;
	description: string;
	plannedStartDate: Date | string;
	plannedEndDate: Date | string;
	actualStartDate?: Date | string;
	actualEndDate?: Date | string;
	demand: Partial<Demand>;
	submissionDeadline: Date | string;
	uploadFileName?: string;
	uploadFileType?: string;
	uploadFilePath?: string;
};

export type UpdateWorkPlanData = Partial<CreateWorkPlanData>;

// API functions
const workPlanApi = ( request: ReturnType<typeof useRequest> ) => ( {
	fetchWorkPlans: async (): Promise<WorkPlan[]> => {
		const response = await request.get<WorkPlan[]>( '/workplans' );
		return response.data;
	},

	fetchWorkPlanById: async ( workPlanId: string | number ): Promise<WorkPlan> => {
		const response = await request.get<WorkPlan>( `/workplans/${workPlanId}` );
		// return response.data;
		return dummyWorkPlans.find( ( workPlan ) => workPlan.id === workPlanId )!;
	},

	createWorkPlan: async ( data: CreateWorkPlanData ): Promise<WorkPlan> => {
		const response = await request.post<WorkPlan>( '/workplans', data );
		return response.data;
	},

	updateWorkPlan: async ( { workPlanId, data }: { workPlanId: string | number; data: UpdateWorkPlanData } ): Promise<WorkPlan> => {
		const response = await request.put<WorkPlan>( `/workplans/${workPlanId}`, data );
		return response.data;
	},

	deleteWorkPlan: async ( workPlanId: string | number ): Promise<void> => {
		await request.delete( `/workplans/${workPlanId}` );
	},

	uploadWorkPlanFile: async ( { workPlanId, formData }: { workPlanId: string | number; formData: FormData } ): Promise<WorkPlanResponse> => {
		const response = await request.post(
			`/workplans/${workPlanId}/upload`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		return response.data;
	},
} );

// Dummy workplans for demo
const dummyWorkPlans: WorkPlan[] = [
	{
		id: 1,
		workPlanTitle: "Mobile Money API Development Phase 1",
		description: "Implementation of core mobile money API endpoints",
		plannedStartDate: "2024-03-15",
		plannedEndDate: "2024-04-15",
		actualStartDate: "2024-03-15",
		actualEndDate: "2024-04-15",
		submissionDeadline: "2024-04-10",
		uploadFileName: "workplan_v1.pdf",
		uploadFileType: "application/pdf",
		uploadFilePath: "/uploads/workplan_v1.pdf",
		createdAt: new Date( "2024-03-10" ).toISOString(),
		updatedAt: new Date( "2024-03-10" ).toISOString(),
		demand: {
			id: 1,
			title: "Mobile Money API Integration",
			demandSummary: "Integrate new mobile money API endpoints for seamless transactions",
			description: "Implementation of new mobile money API endpoints to support instant transfers and improved transaction processing",
			businessOwner: "John Smith",
			demandType: DemandType.NEW_PROJECT,
			status: DemandStatus.DEVELOPMENT,
			attachmentFile: "",
			channelsImpacted: [ChannelsEnum.API_INTERFACE, ChannelsEnum.MOBILE_APP],
			paymentMode: [PaymentMode.Airtime],
			businessPriorityMapping: "High",
			departmentName: "Digital Payments",
			priorityNumber: 1,
			createdAt: new Date( "2024-03-10" ).toISOString(),
			updatedAt: new Date( "2024-03-15" ).toISOString(),
			client: {
				id: 1,
				name: "MTN Mobile Money",
				email: "mtn@example.com",
				phoneNumber: "+256700000000",
				type: "Enterprise",
				address: "Kampala, Uganda",
				isActive: true,
				createdAt: new Date( "2024-01-01" ).toISOString(),
				updatedAt: new Date( "2024-01-01" ).toISOString(),
			},
			demandStages: [
				{
					id: 1,
					name: StageName.Requirements,
					description: "Gathering and analyzing requirements",
					order: 1,
					status: DemandStageStatus.Completed,
					actions: ["Document requirements", "Stakeholder review"],
					inputs: ["Business requirements", "Technical specifications"],
					outputs: ["Requirements document"],
					documents: [
						{
							name: "Requirements Specification",
							role: "Output",
							purpose: "Define project requirements"
						}
					]
				},
				{
					id: 2,
					name: StageName.Development,
					description: "API development and integration",
					order: 2,
					status: DemandStageStatus.InProgress,
					actions: ["Code implementation", "Unit testing"],
					inputs: ["Technical design"],
					outputs: ["Working code"],
					documents: []
				}
			],
			__comments__: [],
			__workplans__: [],
			releaseMonth: "2024-04",
			__documents__: [
				{
					id: 1,
					name: "API Requirements Document",
					description: "Detailed API specifications and requirements",
					version: "1.0",
					documentUrl: "https://example.com/docs/api-req",
					isUploadedToDrive: true,
					documentType: DocumentType.CER,
					status: DocumentStatus.FINAL,
					approvalStatus: ApprovalStatus.APPROVED,
					createdAt: new Date( "2024-03-10" ).toISOString(),
					updatedAt: new Date( "2024-03-10" ).toISOString()
				}
			],
			businessPriority: "High",
			developer: "Jane Doe",
			approvalStatus: "Approved",
			baselineReleaseMonth: "2024-04",
			revisedReleaseMonth: "2024-04",
			segregationGateDate: "2024-03-20",
			developmentGateDate: "2024-03-25",
			demandTracker: "MOB-2024-001",
			__demandUsers__: [],
		},
		storyPoints: 10,
	},
	{
		id: 2,
		workPlanTitle: "USSD Menu Redesign Implementation",
		description: "Development and testing of new USSD menu structure",
		plannedStartDate: "2024-03-01",
		plannedEndDate: "2024-03-30",
		actualStartDate: "2024-03-01",
		actualEndDate: "2024-03-30",
		submissionDeadline: "2024-03-25",
		demand: {
			id: 1,
			title: "Mobile Money API Integration",
			demandSummary: "Integrate new mobile money API endpoints for seamless transactions",
			description: "Implementation of new mobile money API endpoints to support instant transfers and improved transaction processing",
			businessOwner: "John Smith",
			demandType: DemandType.NEW_PROJECT,
			status: DemandStatus.DEVELOPMENT,
			attachmentFile: "",
			channelsImpacted: [ChannelsEnum.API_INTERFACE, ChannelsEnum.MOBILE_APP],
			paymentMode: [PaymentMode.Airtime],
			businessPriorityMapping: "High",
			departmentName: "Digital Payments",
			priorityNumber: 1,
			createdAt: new Date( "2024-03-10" ).toISOString(),
			updatedAt: new Date( "2024-03-15" ).toISOString(),
			client: {
				id: 1,
				name: "MTN Mobile Money",
				email: "mtn@example.com",
				phoneNumber: "+256700000000",
				type: "Enterprise",
				address: "Kampala, Uganda",
				isActive: true,
				createdAt: new Date( "2024-01-01" ).toISOString(),
				updatedAt: new Date( "2024-01-01" ).toISOString(),
			},
			demandStages: [
				{
					id: 1,
					name: StageName.Requirements,
					description: "Gathering and analyzing requirements",
					order: 1,
					status: DemandStageStatus.Completed,
					actions: ["Document requirements", "Stakeholder review"],
					inputs: ["Business requirements", "Technical specifications"],
					outputs: ["Requirements document"],
					documents: [
						{
							name: "Requirements Specification",
							role: "Output",
							purpose: "Define project requirements"
						}
					]
				},
				{
					id: 2,
					name: StageName.Development,
					description: "API development and integration",
					order: 2,
					status: DemandStageStatus.InProgress,
					actions: ["Code implementation", "Unit testing"],
					inputs: ["Technical design"],
					outputs: ["Working code"],
					documents: []
				}
			],
			__comments__: [],
			__workplans__: [],
			releaseMonth: "2024-04",
			__documents__: [
				{
					id: 1,
					name: "API Requirements Document",
					description: "Detailed API specifications and requirements",
					version: "1.0",
					documentUrl: "https://example.com/docs/api-req",
					isUploadedToDrive: true,
					documentType: DocumentType.CER,
					status: DocumentStatus.FINAL,
					approvalStatus: ApprovalStatus.APPROVED,
					createdAt: new Date( "2024-03-10" ).toISOString(),
					updatedAt: new Date( "2024-03-10" ).toISOString()
				}
			],
			businessPriority: "High",
			developer: "Jane Doe",
			approvalStatus: "Approved",
			baselineReleaseMonth: "2024-04",
			revisedReleaseMonth: "2024-04",
			segregationGateDate: "2024-03-20",
			developmentGateDate: "2024-03-25",
			demandTracker: "MOB-2024-001",
			__demandUsers__: [],
		},
		uploadFileName: "ussd_workplan.pdf",
		uploadFileType: "application/pdf",
		uploadFilePath: "/uploads/ussd_workplan.pdf",
		createdAt: new Date( "2024-02-28" ).toISOString(),
		updatedAt: new Date( "2024-02-28" ).toISOString(),
		storyPoints: 0
	},
	{
		id: 3,
		workPlanTitle: "Analytics Dashboard Development",
		description: "Implementation of real-time analytics dashboard",
		plannedStartDate: "2024-03-20",
		plannedEndDate: "2024-05-20",
		actualStartDate: "2024-03-20",
		actualEndDate: "2024-05-20",
		submissionDeadline: "2024-05-15",
		demand: {
			id: 1,
			title: "Mobile Money API Integration",
			demandSummary: "Integrate new mobile money API endpoints for seamless transactions",
			description: "Implementation of new mobile money API endpoints to support instant transfers and improved transaction processing",
			businessOwner: "John Smith",
			demandType: DemandType.NEW_PROJECT,
			status: DemandStatus.DEVELOPMENT,
			attachmentFile: "",
			channelsImpacted: [ChannelsEnum.API_INTERFACE, ChannelsEnum.MOBILE_APP],
			paymentMode: [PaymentMode.Airtime],
			businessPriorityMapping: "High",
			departmentName: "Digital Payments",
			priorityNumber: 1,
			createdAt: new Date( "2024-03-10" ).toISOString(),
			updatedAt: new Date( "2024-03-15" ).toISOString(),
			client: {
				id: 1,
				name: "MTN Mobile Money",
				email: "mtn@example.com",
				phoneNumber: "+256700000000",
				type: "Enterprise",
				address: "Kampala, Uganda",
				isActive: true,
				createdAt: new Date( "2024-01-01" ).toISOString(),
				updatedAt: new Date( "2024-01-01" ).toISOString(),
			},
			demandStages: [
				{
					id: 1,
					name: StageName.Requirements,
					description: "Gathering and analyzing requirements",
					order: 1,
					status: DemandStageStatus.Completed,
					actions: ["Document requirements", "Stakeholder review"],
					inputs: ["Business requirements", "Technical specifications"],
					outputs: ["Requirements document"],
					documents: [
						{
							name: "Requirements Specification",
							role: "Output",
							purpose: "Define project requirements"
						}
					]
				},
				{
					id: 2,
					name: StageName.Development,
					description: "API development and integration",
					order: 2,
					status: DemandStageStatus.InProgress,
					actions: ["Code implementation", "Unit testing"],
					inputs: ["Technical design"],
					outputs: ["Working code"],
					documents: []
				}
			],
			__comments__: [],
			__workplans__: [],
			releaseMonth: "2024-04",
			__documents__: [
				{
					id: 1,
					name: "API Requirements Document",
					description: "Detailed API specifications and requirements",
					version: "1.0",
					documentUrl: "https://example.com/docs/api-req",
					isUploadedToDrive: true,
					documentType: DocumentType.CER,
					status: DocumentStatus.FINAL,
					approvalStatus: ApprovalStatus.APPROVED,
					createdAt: new Date( "2024-03-10" ).toISOString(),
					updatedAt: new Date( "2024-03-10" ).toISOString()
				}
			],
			businessPriority: "High",
			developer: "Jane Doe",
			approvalStatus: "Approved",
			baselineReleaseMonth: "2024-04",
			revisedReleaseMonth: "2024-04",
			segregationGateDate: "2024-03-20",
			developmentGateDate: "2024-03-25",
			demandTracker: "MOB-2024-001",
			__demandUsers__: [],
		},
		storyPoints: 0,
		uploadFileName: '',
		uploadFileType: '',
		uploadFilePath: '',
		createdAt: '',
		updatedAt: ''
	},
];

export const useWorkPlan = () => {
	const request = useRequest();
	const queryClient = useQueryClient();
	const api = workPlanApi( request );

	// Queries
	const {
		data: workPlans = dummyWorkPlans,
		isFetching,
		error,
	} = useQuery( {
		queryKey: WORK_PLANS_QUERY_KEY,
		queryFn: () => Promise.resolve( dummyWorkPlans ),
	} );

	const useWorkPlanById = ( workPlanId?: string | number ) => {
		return useQuery( {
			queryKey: WORK_PLAN_QUERY_KEY( workPlanId ),
			queryFn: () => api.fetchWorkPlanById( workPlanId! ),
			enabled: !!workPlanId,
		} );
	};

	// Mutations
	const createWorkPlan = useMutation( {
		mutationFn: api.createWorkPlan,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: WORK_PLANS_QUERY_KEY } );
		},
	} );

	const updateWorkPlan = useMutation( {
		mutationFn: api.updateWorkPlan,
		onSuccess: ( _result, { workPlanId } ) => {
			queryClient.invalidateQueries( { queryKey: WORK_PLANS_QUERY_KEY } );
			queryClient.invalidateQueries( { queryKey: WORK_PLAN_QUERY_KEY( workPlanId ) } );
		},
	} );

	const deleteWorkPlan = useMutation( {
		mutationFn: api.deleteWorkPlan,
		onSuccess: ( _result, workPlanId ) => {
			queryClient.invalidateQueries( { queryKey: WORK_PLANS_QUERY_KEY } );
			queryClient.invalidateQueries( { queryKey: WORK_PLAN_QUERY_KEY( workPlanId ) } );
		},
	} );

	const uploadWorkPlanFile = useMutation( {
		mutationFn: api.uploadWorkPlanFile,
		onSuccess: ( _result, { workPlanId } ) => {
			queryClient.invalidateQueries( { queryKey: WORK_PLAN_QUERY_KEY( workPlanId ) } );
		},
	} );

	return {
		// Data
		workPlans,
		useWorkPlanById,

		// Loading states
		isLoading: isFetching,
		error,
		isCreating: createWorkPlan.isPending,
		isUpdating: updateWorkPlan.isPending,
		isDeleting: deleteWorkPlan.isPending,
		isUploading: uploadWorkPlanFile.isPending,

		// Mutations
		createWorkPlan: createWorkPlan.mutate,
		updateWorkPlan: updateWorkPlan.mutate,
		deleteWorkPlan: deleteWorkPlan.mutate,
		uploadWorkPlanFile: uploadWorkPlanFile.mutate,
	};
};
