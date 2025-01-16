import { useQuery, useMutation, UseQueryResult } from '@tanstack/react-query';
import useRequest from './useRequest';
import { Draft, InboxMessage, Message } from '@/types/email';

interface EmailParams {
	to: string[];
	subject: string;
	body: string;
	cc?: string[];
	bcc?: string[];
	attachments?: File[];
	is_personal?: boolean;
}

export interface ReplyEmailParams extends EmailParams {
	threadId: string;
	messageId: string;
}

const EMAIL_KEY = ['email'] as const;

// Dummy data
const demoEmails = {
	inbox: [
		{
			id: "1",
			threadId: "t1",
			snippet: "Hi, I wanted to follow up on the project status...",
			historyId: "h1",
			internalDate: new Date().getTime().toString(),
			payload: {
				mimeType: "text/plain",
				headers: [
					{ name: "subject", value: "Project Status Update" },
					{ name: "from", value: "john.doe@company.com" },
					{ name: "to", value: "me@company.com" },
				],
				body: { size: 1024, data: "Hi, I wanted to follow up on the project status..." },
			},
			sizeEstimate: 1024,
			labelIds: ["INBOX"],
		},
		{
			id: "2",
			threadId: "t2",
			snippet: "Please review the attached documentation...",
			historyId: "h2",
			internalDate: ( new Date().getTime() - 86400000 ).toString(), // yesterday
			payload: {
				mimeType: "text/plain",
				headers: [
					{ name: "subject", value: "Documentation Review" },
					{ name: "from", value: "sarah.smith@company.com" },
					{ name: "to", value: "me@company.com" },
				],
				body: { size: 2048, data: "Please review the attached documentation..." },
			},
			sizeEstimate: 2048,
			labelIds: ["INBOX"],
		},
	],
	sent: [
		{
			id: "3",
			threadId: "t3",
			snippet: "Here are the requested files...",
			historyId: "h3",
			internalDate: new Date().getTime().toString(),
			payload: {
				mimeType: "text/plain",
				headers: [
					{ name: "subject", value: "Requested Files" },
					{ name: "from", value: "me@company.com" },
					{ name: "to", value: "client@external.com" },
				],
				body: { size: 1024, data: "Here are the requested files..." },
			},
			sizeEstimate: 1024,
			labelIds: ["SENT"],
		},
	],
	drafts: [
		{
			id: "4",
			threadId: "t4",
			snippet: "Draft: Meeting agenda for tomorrow...",
			historyId: "h4",
			internalDate: new Date().getTime().toString(),
			payload: {
				mimeType: "text/plain",
				headers: [
					{ name: "subject", value: "Meeting Agenda - Draft" },
					{ name: "from", value: "me@company.com" },
					{ name: "to", value: "team@company.com" },
				],
				body: { size: 512, data: "Draft: Meeting agenda for tomorrow..." },
			},
			sizeEstimate: 512,
		},
	],
	trash: [
		{
			id: "5",
			threadId: "t5",
			snippet: "Limited time offer...",
			historyId: "h5",
			internalDate: new Date().getTime().toString(),
			payload: {
				mimeType: "text/plain",
				headers: [
					{ name: "subject", value: "Special Promotion" },
					{ name: "from", value: "marketing@external.com" },
					{ name: "to", value: "me@company.com" },
				],
				body: { size: 1024, data: "Limited time offer..." },
			},
			sizeEstimate: 1024,
			labelIds: ["TRASH"],
		},
	],
};

// API functions
const emailApi = ( request: ReturnType<typeof useRequest> ) => ( {
	sendEmail: async ( params: EmailParams ): Promise<void> => {
		// Simulate API call
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		console.log( 'Email sent:', params );
	},

	replyEmail: async ( params: ReplyEmailParams ): Promise<void> => {
		// Simulate API call
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		console.log( 'Reply sent:', params );
	},

	fetchDrafts: async ( is_personal: boolean ): Promise<Draft[]> => {
		// Simulate API call
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		return demoEmails.drafts;
	},

	fetchDraft: async ( id: string, is_personal: boolean ): Promise<Draft> => {
		// Simulate API call
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		const draft = demoEmails.drafts.find( d => d.id === id );
		if ( !draft ) throw new Error( 'Draft not found' );
		return draft;
	},

	fetchInbox: async ( maxResults?: number, is_personal: boolean = false ): Promise<InboxMessage[]> => {
		// Simulate API call
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		return maxResults ? demoEmails.inbox.slice( 0, maxResults ) : demoEmails.inbox;
	},

	fetchMessage: async ( id: string, is_personal: boolean ): Promise<Message> => {
		// Simulate API call
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		const message = [...demoEmails.inbox, ...demoEmails.sent, ...demoEmails.trash]
			.find( m => m.id === id );
		if ( !message ) throw new Error( 'Message not found' );
		return message;
	},

	fetchSent: async ( is_personal: boolean ): Promise<Message[]> => {
		// Simulate API call
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		return demoEmails.sent;
	},

	fetchTrash: async ( is_personal: boolean ): Promise<Message[]> => {
		// Simulate API call
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		return demoEmails.trash;
	},
} );

export const useEmail = () => {
	const request = useRequest();
	const api = emailApi( request );

	// Mutations
	const sendEmail = useMutation( {
		mutationFn: api.sendEmail,
	} );

	const replyEmail = useMutation( {
		mutationFn: api.replyEmail,
	} );

	// Query Hooks
	const useGetDrafts = ( is_personal = false ): UseQueryResult<Draft[]> =>
		useQuery( {
			queryKey: [...EMAIL_KEY, 'drafts', is_personal],
			queryFn: () => api.fetchDrafts( is_personal ),
		} );

	const useGetDraft = ( id: string, is_personal = false ): UseQueryResult<Draft> =>
		useQuery( {
			queryKey: [...EMAIL_KEY, 'draft', id, is_personal],
			queryFn: () => api.fetchDraft( id, is_personal ),
		} );

	const useGetInbox = ( maxResults?: number, is_personal = false ): UseQueryResult<InboxMessage[]> =>
		useQuery( {
			queryKey: [...EMAIL_KEY, 'inbox', maxResults, is_personal],
			queryFn: () => api.fetchInbox( maxResults, is_personal ),
		} );

	const useGetMessage = ( id: string, is_personal = false ): UseQueryResult<Message> =>
		useQuery( {
			queryKey: [...EMAIL_KEY, 'message', id, is_personal],
			queryFn: () => api.fetchMessage( id, is_personal ),
			enabled: !!id,
		} );

	const useGetSent = ( is_personal = false ): UseQueryResult<Message[]> =>
		useQuery( {
			queryKey: [...EMAIL_KEY, 'sent', is_personal],
			queryFn: () => api.fetchSent( is_personal ),
		} );

	const useGetTrash = ( is_personal = false ): UseQueryResult<Message[]> =>
		useQuery( {
			queryKey: [...EMAIL_KEY, 'trash', is_personal],
			queryFn: () => api.fetchTrash( is_personal ),
		} );

	return {
		// Mutations
		sendEmail: sendEmail.mutate,
		replyEmail: replyEmail.mutate,

		// Loading states
		isSending: sendEmail.isPending,
		isReplying: replyEmail.isPending,

		// Query Hooks
		useGetDrafts,
		useGetDraft,
		useGetInbox,
		useGetMessage,
		useGetSent,
		useGetTrash,
	};
};
