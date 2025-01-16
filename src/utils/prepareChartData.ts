import { Ticket } from '../types/api';

export const prepareChartData = (tickets: Ticket[]) => {
	const dateMap = new Map();

	tickets.forEach((ticket) => {
		if (!ticket.createdAt) return;
		const date = new Date(ticket.createdAt).toISOString().split('T')[0];
		if (!dateMap.has(date)) {
			dateMap.set(date, { date, Resolved: 0, Unresolved: 0 });
		}
		const status = ticket.status === 'OPEN' ? 'Unresolved' : 'Resolved';
		dateMap.get(date)[status]++;
	});

	return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date));
};
