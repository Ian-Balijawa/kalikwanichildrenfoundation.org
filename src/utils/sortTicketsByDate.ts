import { Ticket } from '../types/api';

export function sortTicketsByDate(tickets: Ticket[]): Ticket[] {
	const cloned = [...tickets];
	return cloned.sort((a, b) => {
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);
		return dateB.getTime() - dateA.getTime();
	});
}
