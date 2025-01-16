export interface TicketCountByPriority {
	highPriority: number;
	mediumPriority: number;
	lowPriority: number;
}

export interface TicketCountBySLA {
	slaViolated: number;
	slaNormal: number;
	slaWarning: number;
}

export interface TicketCountByType {
	work_order: number;
	incident: number;
	defaults: number;
	catalog_task: number;
	problem: number;
	change: number;
}

export interface TicketCountByStatus {
	open: number;
	inProgress: number;
	resolved: number;
	closed: number;
	blocked: number;
}

export interface Timeseries {
	time: string;
	totalTickets: number;
	open: number;
	inProgress: number;
	resolved: number;
	closed: number;
	blocked: number;
	highPriority: number;
	mediumPriority: number;
	lowPriority: number;
	slaViolated: number;
	slaNormal: number;
	slaWarning: number;
	work_order: number;
	incident: number;
	defaults: number;
	catalog_task: number;
	problem: number;
	change: number;
}

export interface Summary {
	ticketCountByPriority: TicketCountByPriority;
	ticketCountBySLA: TicketCountBySLA;
	ticketCountByType: TicketCountByType;
	ticketCountByStatus: TicketCountByStatus;
	timeseries: Timeseries[];
}

export interface TicketCountByStatus {
	open: number;
	inProgress: number;
	resolved: number;
	closed: number;
	blocked: number;
}

export interface TimeSeries {
	date: string;
	status: string;
	count: number;
}

export interface Performance {
	open: number;
	inProgress: number;
	resolved: number;
	closed: number;
	blocked: number;
}

export interface Data {
	status: number;
	message: string;
	data: {
		userId: number;
		username: string;
		ticketCountByStatus: TicketCountByStatus;
		timeSeries: TimeSeries[];
		performance: Performance;
	}[];
}

export interface UserTicketCountByStatus {
	status: number;
	message: string;
	data: Data;
}
