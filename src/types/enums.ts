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
    AIRTIME = 'AIRTIME',
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
