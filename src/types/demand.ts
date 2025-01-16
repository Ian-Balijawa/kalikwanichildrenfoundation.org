import { BaseEntity, Client, Document, User } from './common';
import {
	ApprovalStatus,
	ChannelsEnum,
	DemandStatus,
	DemandType,
	DocumentStatus,
	DocumentType,
	PaymentMode,
	ROLE,
	StageStatus
} from './enums';
import { WorkPlan } from './WorkPlan';

export type DemandDocument = BaseEntity & {
	name: string;
	description: string;
	version: string;
	documentUrl: string;
	isUploadedToDrive: boolean;
	documentType: DocumentType;
	status: DocumentStatus;
	approvalStatus: ApprovalStatus;
};

export type DemandComment = BaseEntity & {
	content: string;
	author: string;
	demand: string;
	stageId: number;
};

export type Stage = BaseEntity & {
	order: number;
	name: string;
	description: string;
	status: StageStatus;
	actions: string[];
	inputs: string[];
	outputs: string[];
	documents: Document[];
};

export type DemandUser = {
	id: number;
	userId: number;
	demandId: number;
	role: ROLE;
	user: User;
};

export type Demand = BaseEntity & {
	demandSummary: string;
	channelsImpacted: string[];
	title: string;
	businessOwner: string;
	description: string;
	attachmentFile: string;
	status: DemandStatus;
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
	demandType: DemandType;
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
