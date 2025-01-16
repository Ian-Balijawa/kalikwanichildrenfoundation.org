import { BaseEntity, User } from './common';
import { TicketPriority, TicketRequestTypes, TicketStatus } from './enums';

export type TicketComment = BaseEntity & {
    comment: string;
};

export type TicketHistory = BaseEntity & {
    action: string;
    user: User;
};

export type Ticket = BaseEntity & {
    messageId: string;
    threadId: string;
    subject: string;
    sender: string;
    body: string;
    priority: TicketPriority;
    slaStatus: string;
    status: TicketStatus;
    ticketType: TicketRequestTypes;
    slaPercentage: string;
    createdBy: string;
    ticketNumber: string;
    timestamp: string;
    assignedAt: string;
    blockedAt?: string;
    reOpenedAt?: string;
    resolvedAt?: string;
    assignedTo?: User;
    to?: string[];
    cc?: string[];
    closedAt?: string;
    attachments: any[];
    history?: TicketHistory[];
    comments: TicketComment[];
};

export type TicketData = Pick<
    Ticket,
    'subject' | 'sender' | 'body' | 'priority' | 'status' | 'ticketType' | 'ticketNumber'
> & {
    snippet: string;
};
