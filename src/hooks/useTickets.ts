import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useRequest from './useRequest';
import { Ticket, TicketRequestTypes, TicketPriority, TicketStatus, ROLE } from '@/types/api';
import dayjs from 'dayjs';

const TICKETS_QUERY_KEY = ['tickets'] as const;
const TICKET_QUERY_KEY = ['ticket'] as const;

const demoTickets: Ticket[] = [
	{
		id: "1",
		createdAt: "2024-01-15T09:00:00Z",
		updatedAt: "2024-01-15T14:30:00Z",
		messageId: "msg_1",
		threadId: "thread_1",
		subject: "Login Page Not Loading After Latest Deployment",
		sender: "john.doe@company.com",
		body: "Users are reporting that the login page is not loading after the latest deployment. Error occurs on both Chrome and Firefox browsers.",
		priority: TicketPriority.URGENT,
		slaStatus: "At Risk",
		status: TicketStatus.OPEN,
		ticketType: TicketRequestTypes.INCIDENT,
		slaPercentage: "75%",
		createdBy: "John Doe",
		ticketNumber: "TKT-2024-001",
		timestamp: "2024-01-15T09:00:00Z",
		assignedAt: "2024-01-15T09:15:00Z",
		assignedTo: {
			firstname: "Sarah",
			lastname: "Wilson",
			email: "sarah.wilson@company.com",
			password: "hashed_password",
			phoneNumber: "1234567890",
			isOnline: true,
			isActive: true,
			lastSeen: "2024-01-15T14:30:00Z",
			isEmailVerified: true,
			role: ROLE.SUPPORT,
			emailVerificationCode: null,
			passwordResetCode: null,
			id: "user_1",
			createdAt: "2023-01-01",
			updatedAt: "2024-01-15",
		},
		to: ["support@company.com"],
		cc: ["tech.lead@company.com"],
		closedAt: "",
		attachments: ["screenshot1.png", "error_log.txt"],
		history: [],
		comments: [
			{
				id: "comment_1",
				comment: "Investigating the deployment logs now.",
				createdAt: "2024-01-15T09:30:00Z",
				updatedAt: "2024-01-15T09:30:00Z",
				createdBy: "Sarah Wilson"
			}
		],
	},
	{
		id: "2",
		createdAt: "2024-01-14T11:20:00Z",
		updatedAt: "2024-01-15T13:45:00Z",
		messageId: "msg_2",
		threadId: "thread_2",
		subject: "Feature Request: Export Data to Excel",
		sender: "mary.smith@company.com",
		body: "We need the ability to export dashboard data to Excel format for monthly reporting purposes.",
		priority: TicketPriority.MEDIUM,
		slaStatus: "On Track",
		status: TicketStatus.IN_PROGRESS,
		ticketType: TicketRequestTypes.CHANGE,
		slaPercentage: "50%",
		createdBy: "Mary Smith",
		ticketNumber: "TKT-2024-002",
		timestamp: "2024-01-14T11:20:00Z",
		assignedAt: "2024-01-14T12:00:00Z",
		assignedTo: {
			firstname: "Mike",
			lastname: "Johnson",
			email: "mike.johnson@company.com",
			password: "hashed_password",
			phoneNumber: "2345678901",
			isOnline: true,
			isActive: true,
			lastSeen: "2024-01-15T13:45:00Z",
			isEmailVerified: true,
			role: ROLE.DEVELOPER,
			emailVerificationCode: null,
			passwordResetCode: null,
			id: "user_2",
			createdAt: "2023-01-01",
			updatedAt: "2024-01-15",
		},
		to: ["dev.team@company.com"],
		cc: [],
		closedAt: "",
		attachments: ["requirements.pdf"],
		history: [],
		comments: [],
	},
	{
		id: "3",
		createdAt: "2024-01-13T15:00:00Z",
		updatedAt: "2024-01-15T11:20:00Z",
		messageId: "msg_3",
		threadId: "thread_3",
		subject: "Performance Issues in Production Environment",
		sender: "david.brown@company.com",
		body: "Users are experiencing slow response times during peak hours. Average page load time has increased to 5 seconds.",
		priority: TicketPriority.HIGH,
		slaStatus: "Critical",
		status: TicketStatus.IN_PROGRESS,
		ticketType: TicketRequestTypes.PROBLEM,
		slaPercentage: "25%",
		createdBy: "David Brown",
		ticketNumber: "TKT-2024-003",
		timestamp: "2024-01-13T15:00:00Z",
		assignedAt: "2024-01-13T15:30:00Z",
		assignedTo: {
			firstname: "Alex",
			lastname: "Chen",
			email: "alex.chen@company.com",
			password: "hashed_password",
			phoneNumber: "3456789012",
			isOnline: true,
			isActive: true,
			lastSeen: "2024-01-15T11:20:00Z",
			isEmailVerified: true,
			role: ROLE.DEVELOPER,
			emailVerificationCode: null,
			passwordResetCode: null,
			id: "user_3",
			createdAt: "2023-01-01",
			updatedAt: "2024-01-15",
		},
		to: ["tech.support@company.com"],
		cc: ["management@company.com"],
		closedAt: "",
		attachments: ["performance_report.pdf"],
		history: [],
		comments: [],
	},
	{
		id: "4",
		createdAt: "2024-01-12T10:00:00Z",
		updatedAt: "2024-01-15T09:00:00Z",
		messageId: "msg_4",
		threadId: "thread_4",
		subject: "Update User Documentation",
		sender: "emma.davis@company.com",
		body: "Documentation needs to be updated to reflect recent UI changes and new features.",
		priority: TicketPriority.LOW,
		slaStatus: "On Track",
		status: TicketStatus.OPEN,
		ticketType: TicketRequestTypes.SCTASK,
		slaPercentage: "90%",
		createdBy: "Emma Davis",
		ticketNumber: "TKT-2024-004",
		timestamp: "2024-01-12T10:00:00Z",
		assignedAt: "2024-01-12T11:00:00Z",
		assignedTo: {
			firstname: "Lisa",
			lastname: "Taylor",
			email: "lisa.taylor@company.com",
			password: "hashed_password",
			phoneNumber: "4567890123",
			isOnline: false,
			isActive: true,
			lastSeen: "2024-01-15T09:00:00Z",
			isEmailVerified: true,
			role: ROLE.SUPPORT,
			emailVerificationCode: null,
			passwordResetCode: null,
			id: "user_4",
			createdAt: "2023-01-01",
			updatedAt: "2024-01-15",
		},
		to: ["docs.team@company.com"],
		cc: [],
		closedAt: "",
		attachments: [],
		history: [],
		comments: [],
	},
	{
		id: "5",
		createdAt: "2024-01-11T14:30:00Z",
		updatedAt: "2024-01-15T10:15:00Z",
		messageId: "msg_5",
		threadId: "thread_5",
		subject: "Security Vulnerability in API Endpoint",
		sender: "security.team@company.com",
		body: "Critical security vulnerability discovered in the authentication API endpoint. Immediate attention required.",
		priority: TicketPriority.URGENT,
		slaStatus: "Critical",
		status: TicketStatus.BLOCKED,
		ticketType: TicketRequestTypes.INCIDENT,
		slaPercentage: "10%",
		createdBy: "Security Team",
		ticketNumber: "TKT-2024-005",
		timestamp: "2024-01-11T14:30:00Z",
		assignedAt: "2024-01-11T14:35:00Z",
		assignedTo: {
			firstname: "James",
			lastname: "Wilson",
			email: "james.wilson@company.com",
			password: "hashed_password",
			phoneNumber: "5678901234",
			isOnline: true,
			isActive: true,
			lastSeen: "2024-01-15T10:15:00Z",
			isEmailVerified: true,
			role: ROLE.SUPPORT,
			emailVerificationCode: null,
			passwordResetCode: null,
			id: "user_5",
			createdAt: "2023-01-01",
			updatedAt: "2024-01-15",
		},
		to: ["security@company.com"],
		cc: ["cto@company.com"],
		closedAt: "",
		attachments: ["security_report.pdf"],
		history: [],
		comments: [],
	},
	{
		id: "6",
		createdAt: "2024-01-10T09:45:00Z",
		updatedAt: "2024-01-15T12:30:00Z",
		messageId: "msg_6",
		threadId: "thread_6",
		subject: "Mobile App Crash on Startup",
		sender: "mobile.user@company.com",
		body: "iOS app version 2.1.0 crashes immediately after splash screen on iPhone 13.",
		priority: TicketPriority.HIGH,
		slaStatus: "At Risk",
		status: TicketStatus.RESOLVED,
		ticketType: TicketRequestTypes.INCIDENT,
		slaPercentage: "95%",
		createdBy: "Mobile User",
		ticketNumber: "TKT-2024-006",
		timestamp: "2024-01-10T09:45:00Z",
		assignedAt: "2024-01-10T10:00:00Z",
		assignedTo: {
			firstname: "Ryan",
			lastname: "Lee",
			email: "ryan.lee@company.com",
			password: "hashed_password",
			phoneNumber: "6789012345",
			isOnline: true,
			isActive: true,
			lastSeen: "2024-01-15T12:30:00Z",
			isEmailVerified: true,
			role: ROLE.SUPPORT,
			emailVerificationCode: null,
			passwordResetCode: null,
			id: "user_6",
			createdAt: "2023-01-01",
			updatedAt: "2024-01-15",
		},
		to: ["mobile.dev@company.com"],
		cc: [],
		closedAt: "2024-01-15T12:30:00Z",
		attachments: ["crash_log.txt"],
		history: [],
		comments: [],
	},
	{
		id: "7",
		createdAt: "2024-01-09T16:20:00Z",
		updatedAt: "2024-01-15T11:45:00Z",
		messageId: "msg_7",
		threadId: "thread_7",
		subject: "Database Backup Failure",
		sender: "system.alert@company.com",
		body: "Automated database backup failed last night. Manual intervention required.",
		priority: TicketPriority.HIGH,
		slaStatus: "Resolved",
		status: TicketStatus.CLOSED,
		ticketType: TicketRequestTypes.PROBLEM,
		slaPercentage: "100%",
		createdBy: "System Alert",
		ticketNumber: "TKT-2024-007",
		timestamp: "2024-01-09T16:20:00Z",
		assignedAt: "2024-01-09T16:25:00Z",
		assignedTo: {
			firstname: "Tom",
			lastname: "Anderson",
			email: "tom.anderson@company.com",
			password: "hashed_password",
			phoneNumber: "7890123456",
			isOnline: false,
			isActive: true,
			lastSeen: "2024-01-15T11:45:00Z",
			isEmailVerified: true,
			role: ROLE.SUPPORT,
			emailVerificationCode: null,
			passwordResetCode: null,
			id: "user_7",
			createdAt: "2023-01-01",
			updatedAt: "2024-01-15",
		},
		to: ["dba.team@company.com"],
		cc: [],
		closedAt: "2024-01-15T11:45:00Z",
		attachments: ["backup_log.txt"],
		history: [],
		comments: [],
	},
	{
		id: "8",
		createdAt: "2024-01-08T13:15:00Z",
		updatedAt: "2024-01-15T10:30:00Z",
		messageId: "msg_8",
		threadId: "thread_8",
		subject: "New Feature: Dark Mode Implementation",
		sender: "product.manager@company.com",
		body: "Request to implement dark mode theme across all pages. Design specs attached.",
		priority: TicketPriority.MEDIUM,
		slaStatus: "On Track",
		status: TicketStatus.IN_PROGRESS,
		ticketType: TicketRequestTypes.CHANGE,
		slaPercentage: "60%",
		createdBy: "Product Manager",
		ticketNumber: "TKT-2024-008",
		timestamp: "2024-01-08T13:15:00Z",
		assignedAt: "2024-01-08T14:00:00Z",
		assignedTo: {
			firstname: "Emily",
			lastname: "Zhang",
			email: "emily.zhang@company.com",
			password: "hashed_password",
			phoneNumber: "8901234567",
			isOnline: true,
			isActive: true,
			lastSeen: "2024-01-15T10:30:00Z",
			isEmailVerified: true,
			role: ROLE.DEVELOPER,
			emailVerificationCode: null,
			passwordResetCode: null,
			id: "user_8",
			createdAt: "2023-01-01",
			updatedAt: "2024-01-15",
		},
		to: ["frontend.team@company.com"],
		cc: ["design.team@company.com"],
		closedAt: "",
		attachments: ["dark_mode_specs.pdf"],
		history: [],
		comments: [],
	},
	{
		id: "9",
		createdAt: "2024-01-07T11:30:00Z",
		updatedAt: "2024-01-15T09:45:00Z",
		messageId: "msg_9",
		threadId: "thread_9",
		subject: "SSL Certificate Expiration Warning",
		sender: "monitoring@company.com",
		body: "SSL certificate for api.company.com will expire in 14 days. Renewal required.",
		priority: TicketPriority.HIGH,
		slaStatus: "On Track",
		status: TicketStatus.OPEN,
		ticketType: TicketRequestTypes.WORK_ORDER,
		slaPercentage: "80%",
		createdBy: "Monitoring System",
		ticketNumber: "TKT-2024-009",
		timestamp: "2024-01-07T11:30:00Z",
		assignedAt: "2024-01-07T12:00:00Z",
		assignedTo: {
			firstname: "Chris",
			lastname: "Martinez",
			email: "chris.martinez@company.com",
			password: "hashed_password",
			phoneNumber: "9012345678",
			isOnline: true,
			isActive: true,
			lastSeen: "2024-01-15T09:45:00Z",
			isEmailVerified: true,
			role: ROLE.DEVELOPER,
			emailVerificationCode: null,
			passwordResetCode: null,
			id: "user_9",
			createdAt: "2023-01-01",
			updatedAt: "2024-01-15",
		},
		to: ["devops@company.com"],
		cc: [],
		closedAt: "",
		attachments: [],
		history: [],
		comments: [],
	},
	{
		id: "10",
		createdAt: "2024-01-06T10:00:00Z",
		updatedAt: "2024-01-15T08:30:00Z",
		messageId: "msg_10",
		threadId: "thread_10",
		subject: "User Account Integration with SSO",
		sender: "integration.team@company.com",
		body: "Implement Single Sign-On (SSO) integration with Microsoft Azure AD for enterprise customers.",
		priority: TicketPriority.MEDIUM,
		slaStatus: "On Track",
		status: TicketStatus.IN_PROGRESS,
		ticketType: TicketRequestTypes.CHANGE,
		slaPercentage: "45%",
		createdBy: "Integration Team",
		ticketNumber: "TKT-2024-010",
		timestamp: "2024-01-06T10:00:00Z",
		assignedAt: "2024-01-06T10:30:00Z",
		assignedTo: {
			firstname: "Daniel",
			lastname: "Kim",
			email: "daniel.kim@company.com",
			password: "hashed_password",
			phoneNumber: "0123456789",
			isOnline: true,
			isActive: true,
			lastSeen: "2024-01-15T08:30:00Z",
			isEmailVerified: true,
			role: ROLE.DEVELOPER,
			emailVerificationCode: null,
			passwordResetCode: null,
			id: "user_10",
			createdAt: "2023-01-01",
			updatedAt: "2024-01-15",
		},
		to: ["backend.team@company.com"],
		cc: ["enterprise.support@company.com"],
		closedAt: "",
		attachments: ["sso_requirements.pdf"],
		history: [],
		comments: [],
	},
];

// API functions
const ticketsApi = ( request: ReturnType<typeof useRequest> ) => ( {
	fetchTickets: async ( toDate: string, fromDate: string ): Promise<Ticket[]> => {
		const response = await request.get<Ticket[]>( '/tickets', {
			params: { to: toDate, from: fromDate },
		} );
		return response.data;
	},

	fetchTicket: async ( id: string ): Promise<Ticket> => {
		const response = await request.get<Ticket[]>( '/tickets', {
			params: { id },
		} );
		return response.data[0];
	},

	createTicket: async ( data: Partial<Ticket> ): Promise<Ticket> => {
		const response = await request.post( '/tickets', data );
		return response.data;
	},

	updateTicket: async ( { id, data }: { id: string; data: Partial<Ticket> } ): Promise<Ticket> => {
		const response = await request.patch( `/tickets/${id}`, data );
		return response.data;
	},

	deleteTicket: async ( id: string ): Promise<void> => {
		await request.delete( `/tickets/${id}` );
	},

	assignTicket: async ( { id, assignedTo }: { id: string; assignedTo: string } ): Promise<Ticket> => {
		const response = await request.patch( `/tickets/${id}/assign`, { assignedTo } );
		return response.data;
	},

	updateStatus: async ( { id, status }: { id: string; status: string } ): Promise<Ticket> => {
		const response = await request.patch( `/tickets/${id}/status`, { status } );
		return response.data;
	},

	addComment: async ( { id, comment }: { id: string; comment: string } ): Promise<Ticket> => {
		const response = await request.patch( `/tickets/${id}/comment`, { comment } );
		return response.data;
	},

	refreshGmail: async (): Promise<any> => {
		const response = await request.get( '/gmail/refresh' );
		return response.data;
	},
} );

export const useTickets = ( id?: string ) => {
	const [searchQuery, setSearchQuery] = useState( '' );
	const request = useRequest();
	const queryClient = useQueryClient();
	const api = ticketsApi( request );

	const toDate = dayjs().add( 1, 'day' ).format( 'YYYY-MM-DD' );
	const fromDate = dayjs().subtract( 1, 'month' ).format( 'YYYY-MM-DD' );

	const {
		data: tickets = [],
		isLoading,
		error,
	} = useQuery( {
		queryKey: TICKETS_QUERY_KEY,
		queryFn: () => api.fetchTickets( toDate, fromDate ),
		gcTime: 1000 * 60 * 60,
		staleTime: 1000 * 60 * 15,
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	} );

	const { data: currentTicket } = useQuery( {
		queryKey: [...TICKET_QUERY_KEY, id],
		queryFn: () => Promise.resolve( demoTickets.find( ticket => ticket.id === id ) ),
		enabled: !!id,
	} );

	// Mutations
	const addTicket = useMutation( {
		mutationFn: api.createTicket,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: TICKETS_QUERY_KEY } );
		},
	} );

	const updateTicket = useMutation( {
		mutationFn: api.updateTicket,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: TICKETS_QUERY_KEY } );
			if ( id ) {
				queryClient.invalidateQueries( { queryKey: [...TICKET_QUERY_KEY, id] } );
			}
		},
	} );

	const deleteTicket = useMutation( {
		mutationFn: api.deleteTicket,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: TICKETS_QUERY_KEY } );
		},
	} );

	const assignTicket = useMutation( {
		mutationFn: api.assignTicket,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: TICKETS_QUERY_KEY } );
		},
	} );

	const updateTicketStatus = useMutation( {
		mutationFn: api.updateStatus,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: TICKETS_QUERY_KEY } );
		},
	} );

	const addComment = useMutation( {
		mutationFn: api.addComment,
		onSuccess: () => {
			queryClient.invalidateQueries( { queryKey: TICKETS_QUERY_KEY } );
		},
	} );

	return {
		// Data
		tickets: demoTickets,
		allTickets: tickets,
		currentTicket: demoTickets.find( ticket => ticket.id === id ),
		searchQuery,
		setSearchQuery,

		// Loading and error states
		isLoading: false,
		isFetching: isLoading,
		error: null,

		// Mutations
		addTicket: addTicket.mutate,
		updateTicket: updateTicket.mutate,
		deleteTicket: deleteTicket.mutate,
		assignTicket: assignTicket.mutate,
		updateTicketStatus: updateTicketStatus.mutate,
		addComment: addComment.mutate,

		// Utilities
		refreshGmail: api.refreshGmail,
	};
};
