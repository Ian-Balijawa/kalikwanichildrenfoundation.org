import { WorkPlan } from '@/types/WorkPlan';
import { DemandUser } from './demand';

type BaseEntity = {
	id: string;
	createdAt: string;
	updatedAt: string;
};

export enum DemandType {
	NEW_PROJECT = 'New Project',
	CHANGE_REQUEST = 'Change Request',
	MAINTENANCE = 'Maintenance',
	SUPPORT = 'Support',
	OTHER = 'Other',
	DATA_REQUEST = 'Data Request',
	BUG_FIX = 'Bug Fix',
}

export enum PaymentMode {
	Airtime = 'AIRTIME',
	ECW_DIRECT = 'ECW_DIRECT',
	ONE_SIXITY_FIVE = '165',
	VISA = 'VISA',
	POSTPAID = 'POSTPAID',
	OTHER = 'OTHER',
}

export enum ChannelsEnum {
	WEB_APP = 'WEB_APP',
	MOBILE_APP = 'MOBILE_APP',
	USSD = 'USSD',
	THIRD_PARTY_APP = '3RD_PARTY_APP',
	API_INTERFACE = 'API_INTERFACE',
	WEBSITE = 'WEBSITE',
}

export enum DocumentType {
	RTM = 'RTM',
	WORKPLAN = 'WORKPLAN',
	CER = 'CER',
	URS = 'URS',
	SIT_SIGN_OFF = 'SIT SIGN OFF',
	UAT_SIGNOFF = 'UAT SIGNOFF',
	PPT_SIGN_OFF = 'PPT SIGN OFF',
	OTHER = 'OTHER',
}

export enum DocumentStatus {
	DRAFT = 'DRAFT',
	FINAL = 'FINAL',
}

export enum ApprovalStatus {
	APPROVED = 'APPROVED',
	PENDING = 'PENDING',
	REJECTED = 'REJECTED',
}

export interface WorkplanTask {
	id: string;
	title: string;
	description: string;
	workPlanId: number;
	deadline: Date;
	assignedToId: string;
	storyPoints: string;
	status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface WorkplanSubtask {
	id: string;
	title: string;
	description: string;
	workplanTask: string;
	deadline: string;
	storyPoints: string;
	status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}

export type DemandDocument = {
	id: number;
	name: string;
	description: string;
	version: string;
	documentUrl: string;
	isUploadedToDrive: boolean;
	documentType: DocumentType;
	status: DocumentStatus;
	approvalStatus: ApprovalStatus;
	createdAt: string;
	updatedAt: string;
};

export type SignUpData = {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	role: string;
	phoneNumber: string;
};

export type LoginData = {
	email: string;
	password: string;
};

export enum ROLE {
	SUPPORT = 'SUPPORT',
	SUPPORT_ADMIN = 'SUPPORT_ADMIN',
	ADMIN = 'Admin',
	CUSTOMER = 'Customer',
	SU = 'Super User',
	BA = 'BUSINESS_ANALYST',
	DEVELOPER = 'DEVELOPER',
	PROJECT_MANAGER = 'PROJECT_MANAGER',
	QUALITY_ANALYST = 'QUALITY_ANALYST',
}

export enum WorkPlanRole {
	DEVELOPER = 'Developer',
	BUSINESS_ANALYST = 'Business Analyst',
	QA_TESTER = 'QA Tester',
	PROJECT_MANAGER = 'Project Manager',
	OTHER = 'Other',
}

export enum StageStatus {
	NOT_STARTED = 'NotStarted',
	IN_PROGRESS = 'InProgress',
	COMPLETED = 'Completed',
	BLOCKED = 'Blocked',
}

export enum DemandPriority {
	HIGH = 'High',
	MEDIUM = 'Medium',
	LOW = 'Low',
}

export enum DemandStatus {
	SOLUTION = 'Solution',
	COMMERCIALS = 'Commercials',
	BUSINESS_APPROVAL = 'BusinessApproval',
	DEVELOPMENT = 'Development',
	SHELF_READY = 'ShelfReady',
	SIT = 'SIT',
	UAT = 'UAT',
	CLOSED = 'Closed',
}

export enum TicketRequestTypes {
	INCIDENT = 'INCIDENT',
	CHANGE = 'CHANGE',
	PROBLEM = 'PROBLEM',
	DEFAULT = 'DEFAULT',
	SCTASK = 'CATALOG_TASK',
	WORK_ORDER = 'WORK_ORDER',
}

export enum TicketStatus {
	OPEN = 'OPEN',
	IN_PROGRESS = 'IN_PROGRESS',
	RESOLVED = 'RESOLVED',
	CLOSED = 'CLOSED',
	BLOCKED = 'BLOCKED',
}

export enum SlaStatus {
	NORMAL = 'NORMAL',
	WARNING = 'WARNING',
	BLEACHED = 'BLEACHED',
}

export enum TicketPriority {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH',
	URGENT = 'URGENT',
}

export type User = BaseEntity & {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	phoneNumber: string;
	isOnline: boolean;
	isActive: boolean;
	lastSeen: string;
	isEmailVerified: boolean;
	role: ROLE;
	emailVerificationCode?: string | null;
	passwordResetCode?: string | null;
	isOnDuty?: boolean;
	isOnLeave?: boolean;
};

export type Milestone = {
	id: number;
	name: string;
	criticalPathOrder: number;
	completed: boolean;
};

export type Client = {
	id: number;
	name: string;
	email: string;
	phoneNumber: string;
	type: string;
	address: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

export type CreateClientData = {
	name: string;
	email: string;
	phoneNumber: string;
	address: string;
	type: string;
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

export type TicketHistory = BaseEntity & {
	action: string;
	user: User;
};

export type TicketComment = BaseEntity & {
	comment: string;
	createdBy: string;
};

export type DemandComment = {
	id: number;
	content: string;
	author: string;
	demand: string;
	stageId: number;
};

export enum DemandStageStatus {
	NotStarted = 'NotStarted',
	InProgress = 'InProgress',
	Completed = 'Completed',
	Blocked = 'Blocked',
}

export enum StageName {
	Requirements = "Requirements",
	Design = "Design",
	Development = "Development",
	PeerReview = "PeerReview",
	Testing = "Testing",
	Deployment = "Deployment",
	Monitoring = "Monitoring",
}

type Document = {
	name: string;
	role: 'Input' | 'Output' | 'Reference';
	purpose: string;
};

export interface IStage {
	name: any;
	id: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	stage: {
		id: number;
		name: StageName;
		description: string;
		order: number;
		createdAt: string;
		updatedAt: string;
	};
}


export type Stage = {
	id: number;
	order: number;
	name: string;
	description: string;
	status: DemandStageStatus;
	actions: string[];
	inputs: string[];
	outputs: string[];
	documents: Document[];
};

export type Demand = {
	createdAt: string | Date;
	updatedAt: string | Date;
	id: number;
	demandSummary: string;
	channelsImpacted: string[];
	title: string;
	paymentMode: PaymentMode[];
	demandType: DemandType;
	businessOwner: string;
	description: string;
	attachmentFile: string;
	status: string;
	__demandUsers__: DemandUser[];
	client: Client;
	demandStages: Stage[];
	__comments__: DemandComment[];
	__workplans__: WorkPlan[];
	releaseMonth: string;
	__documents__: DemandDocument[];
	businessPriority: string;
	developer: string;
	approvalStatus: string;
	baselineReleaseMonth: string;
	revisedReleaseMonth: string;
	businessPriorityMapping: string;
	departmentName: string;
	priorityNumber: number;
	segregationGateDate: string;
	developmentGateDate: string;
	demandTracker: string;
};

export type CreateDemand = {
	title: string;
	demandCreatorRole: ROLE;
	demandSummary: string;
	description: string;
	businessOwner: string;
	organisation: string;
	demandType: string;
	status: DemandStatus;
	channelsImpacted: ChannelsEnum[];
	paymentMode: PaymentMode[];
	businessPriorityMapping: string;
	departmentName: string;
	priorityNumber: number;
	clientId: string;
	// Optional fields
	baselineReleaseMonth?: Date;
	revisedReleaseMonth?: Date;
	releaseMonth?: string;
	segregationGateDate?: Date;
	developmentGateDate?: Date;
	demandTrackerId?: string;
	attachmentFile?: string;
};

export type ChangeRequest = any;

export interface LoginResponse {
	message: string;
	statusCode: number;
	data: {
		accessToken: string;
		user: User;
	};
}
