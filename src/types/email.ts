export type EmailParams = {
	to: string[];
	subject: string;
	body: string;
	cc?: string[];
	bcc?: string[];
	attachments?: File[];
	is_personal?: boolean;
};

export type ReplyEmailParams = EmailParams & {
	threadId: string;
	messageId: string;
};

export type Draft = {
	id: string;
	threadId: string;
	snippet: string;
	historyId: string;
	internalDate: string;
	payload: {
		mimeType: string;
		headers: {
			name: string;
			value: string;
		}[];
		body: {
			size: number;
			data?: string;
		};
		parts?: {
			partId: string;
			mimeType: string;
			filename: string;
			headers: {
				name: string;
				value: string;
			}[];
			body: {
				size: number;
				data?: string;
				attachmentId?: string;
			};
		}[];
	};
	sizeEstimate: number;
};

export type InboxMessage = {
	id: string;
	threadId: string;
	labelIds: string[];
	snippet: string;
	historyId: string;
	internalDate: string;
	payload: {
		mimeType: string;
		headers: {
			name: string;
			value: string;
		}[];
		body: {
			size: number;
			data?: string;
		};
		parts?: {
			partId: string;
			mimeType: string;
			filename: string;
			headers: {
				name: string;
				value: string;
			}[];
			body: {
				size: number;
				data?: string;
				attachmentId?: string;
			};
		}[];
	};
	sizeEstimate: number;
};

export type Message = InboxMessage & {
	raw?: string;
};
