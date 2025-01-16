import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useRequest from './useRequest';
import { CreateDemand, Demand, DemandDocument, ROLE } from '@/types/api';
import { DemandStatus, DemandType, ChannelsEnum, PaymentMode, DocumentType, DocumentStatus, ApprovalStatus, StageName, DemandStageStatus } from "@/types/api";

const DEMANDS_QUERY_KEY = ['demands'] as const;
const DEMAND_QUERY_KEY = ['demand'] as const;

// Sample dummy demands for demo
const dummyDemands: Demand[] = [
	{
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
				documentType: DocumentType.URS,
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
		__demandUsers__: []
	},
	{
		id: 2,
		title: "USSD Menu Restructuring",
		demandSummary: "Redesign of USSD menu structure for better user experience",
		description: "Complete overhaul of the USSD menu system to improve navigation and add new services",
		businessOwner: "Sarah Johnson",
		demandType: DemandType.CHANGE_REQUEST,
		status: DemandStatus.UAT,
		channelsImpacted: [ChannelsEnum.USSD],
		paymentMode: [PaymentMode.Airtime],
		businessPriorityMapping: "Medium",
		departmentName: "Customer Experience",
		priorityNumber: 2,
		createdAt: new Date( "2024-02-15" ).toISOString(),
		updatedAt: new Date( "2024-03-10" ).toISOString(),
		client: {
			id: 2,
			name: "MTN Uganda",
			email: "mtn-ug@example.com",
			phoneNumber: "+256700000001",
			type: "Enterprise",
			address: "Kampala, Uganda",
			isActive: true,
			createdAt: new Date( "2024-01-01" ).toISOString(),
			updatedAt: new Date( "2024-01-01" ).toISOString(),
		},
		demandStages: [
			{
				id: 3,
				name: StageName.Testing,
				description: "User acceptance testing",
				order: 1,
				status: DemandStageStatus.InProgress,
				actions: ["Test execution", "Bug fixing"],
				inputs: ["Test cases", "Test data"],
				outputs: ["Test results"],
				documents: []
			}
		],
		__comments__: [],
		__workplans__: [],
		releaseMonth: "2024-03",
		__documents__: [],
		businessPriority: "Medium",
		developer: "Alex Chen",
		approvalStatus: "Pending",
		baselineReleaseMonth: "2024-03",
		revisedReleaseMonth: "2024-03",
		segregationGateDate: "2024-02-25",
		developmentGateDate: "2024-03-01",
		demandTracker: "USSD-2024-001",
		__demandUsers__: [],
		attachmentFile: "",
	},
	{
		id: 3,
		title: "Data Analytics Dashboard",
		demandSummary: "Implementation of real-time analytics dashboard for business insights",
		description: "Development of a comprehensive analytics dashboard for monitoring key business metrics",
		businessOwner: "Michael Brown",
		demandType: DemandType.NEW_PROJECT,
		status: DemandStatus.SOLUTION,
		channelsImpacted: [ChannelsEnum.WEB_APP],
		paymentMode: [PaymentMode.ECW_DIRECT],
		businessPriorityMapping: "High",
		departmentName: "Business Intelligence",
		priorityNumber: 3,
		createdAt: new Date( "2024-03-01" ).toISOString(),
		updatedAt: new Date( "2024-03-05" ).toISOString(),
		client: {
			id: 3,
			name: "MTN Analytics",
			email: "analytics@example.com",
			phoneNumber: "+256700000002",
			type: "Internal",
			address: "Kampala, Uganda",
			isActive: true,
			createdAt: new Date( "2024-01-01" ).toISOString(),
			updatedAt: new Date( "2024-01-01" ).toISOString(),
		},
		demandStages: [
			{
				id: 4,
				name: StageName.Design,
				description: "Dashboard design and planning",
				order: 1,
				status: DemandStageStatus.InProgress,
				actions: ["UI/UX design", "Architecture planning"],
				inputs: ["Requirements document"],
				outputs: ["Design specifications"],
				documents: []
			}
		],
		__comments__: [],
		__workplans__: [],
		releaseMonth: "2024-05",
		__documents__: [],
		businessPriority: "High",
		developer: "David Wilson",
		approvalStatus: "Pending",
		baselineReleaseMonth: "2024-05",
		revisedReleaseMonth: "2024-05",
		segregationGateDate: "2024-03-15",
		developmentGateDate: "2024-03-20",
		demandTracker: "DASH-2024-001",
		__demandUsers__: [],
		attachmentFile: "",
	}
];

// API functions
const demandsApi = ( request: ReturnType<typeof useRequest> ) => ( {
	fetchDemands: async (): Promise<Demand[]> => {
		const response = await request.get<Demand[]>( '/demands' );
		return response.data || [];
	},

	fetchDemand: async ( id: number ): Promise<Demand | null> => {
		if ( !id ) return null;
		const response = await request.get<Demand[]>( `/demands?id=${id}` );
		return response.data[0];
	},

	createDemand: async ( data: CreateDemand ): Promise<Demand> => {
		const response = await request.post( '/demands/', data );
		return response.data;
	},

	updateDemand: async ( { id, data }: { id: number; data: Partial<Demand> } ): Promise<Demand> => {
		const response = await request.put( `/demands/${id}`, data );
		return response.data;
	},

	deleteDemand: async ( id: number ): Promise<void> => {
		await request.delete( `/demands/${id}` );
	},

	assignUsers: async ( data: { demandId: number; users: { userId: number; role: ROLE }[] } ): Promise<Demand> => {
		const response = await request.post( '/demands/assign', data );
		return response.data;
	},

	removeAssignment: async ( id: number ): Promise<void> => {
		await request.delete( `/demands/assign/${id}` );
	},

	uploadFile: async ( formData: FormData ): Promise<void> => {
		await request.post( '/demands/upload', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		} );
	},

	fetchDocuments: async ( id: number ): Promise<DemandDocument[]> => {
		const response = await request.get<DemandDocument[]>( `/demands/${id}/documents` );
		return response.data || [];
	},

	uploadDocument: async ( { id, data }: { id: number; data: FormData } ): Promise<void> => {
		await request.post( `/demands/${id}/documents`, data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		} );
	},
} );

export const useDemands = ( { id }: { id?: number } ) => {
	const [searchQuery, setSearchQuery] = useState( '' );
	const request = useRequest();
	const queryClient = useQueryClient();
	const api = demandsApi( request );

	// Queries
	const {
		data: demands = [],
		isLoading,
		error,
		refetch,
	} = useQuery( {
		queryKey: DEMANDS_QUERY_KEY,
		queryFn: api.fetchDemands,
	} );

	const {
		data: currentDemand,
		refetch: refetchDemand
	} = useQuery( {
		queryKey: [...DEMAND_QUERY_KEY, id],
		queryFn: () => api.fetchDemand( id! ),
		enabled: !!id,
	} );

	const { data: documents = [] } = useQuery( {
		queryKey: [...DEMAND_QUERY_KEY, id, 'documents'],
		queryFn: () => api.fetchDocuments( id! ),
		enabled: !!id,
	} );

	// Mutations
	const createDemand = useMutation( {
		mutationFn: api.createDemand,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: DEMANDS_QUERY_KEY } );
		},
	} );

	const updateDemand = useMutation( {
		mutationFn: api.updateDemand,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: DEMANDS_QUERY_KEY } );
			if ( id ) {
				queryClient.invalidateQueries( { queryKey: [...DEMAND_QUERY_KEY, id] } );
			}
		},
	} );

	const deleteDemand = useMutation( {
		mutationFn: () => api.deleteDemand( id! ),
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: DEMANDS_QUERY_KEY } );
		},
	} );

	const assignUsersToDemand = useMutation( {
		mutationFn: api.assignUsers,
		onSuccess: () => {
			if ( id ) {
				queryClient.invalidateQueries( { queryKey: [...DEMAND_QUERY_KEY, id] } );
			}
		},
	} );

	const removeAssignment = useMutation( {
		mutationFn: api.removeAssignment,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: DEMANDS_QUERY_KEY } );
		},
	} );

	const uploadFile = useMutation( {
		mutationFn: api.uploadFile,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: DEMANDS_QUERY_KEY } );
		},
	} );

	const uploadDemandDocument = useMutation( {
		mutationFn: api.uploadDocument,
		onSuccess: () => {
			if ( id ) {
				queryClient.invalidateQueries( {
					queryKey: [...DEMAND_QUERY_KEY, id, 'documents']
				} );
			}
		},
	} );

	return {
		// Data
		demands: dummyDemands,
		currentDemand,
		documents,
		searchQuery,
		setSearchQuery,

		// Loading and error states
		isLoading: false,
		error,

		// Refetch functions
		refetch,
		refetchDemand,

		// Mutations
		createDemand: createDemand.mutate,
		updateDemand: updateDemand.mutate,
		deleteDemand: deleteDemand.mutate,
		assignUsersToDemand: assignUsersToDemand.mutate,
		removeAssignment: removeAssignment.mutate,
		uploadFile: uploadFile.mutate,
		uploadDemandDocument: uploadDemandDocument.mutate,
	};
};
