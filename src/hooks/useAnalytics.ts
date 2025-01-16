import { useQuery } from '@tanstack/react-query';
import useRequest from './useRequest';
import { Summary, UserTicketCountByStatus } from '@/types/summary';

interface AnalyticsParams {
	from?: string;
	to?: string;
	userId?: string;
	timeseries?: 'daily' | 'weekly' | 'monthly';
}

const ANALYTICS_KEY = ['analytics'] as const;

// API functions
const analyticsApi = ( request: ReturnType<typeof useRequest> ) => ( {
	fetchAnalyticsSummary: async ( params?: AnalyticsParams ): Promise<Summary> => {
		const queryParams = new URLSearchParams();
		if ( params?.from ) queryParams.append( 'from', params.from );
		if ( params?.to ) queryParams.append( 'to', params.to );
		if ( params?.userId ) queryParams.append( 'userId', params.userId );
		if ( params?.timeseries ) queryParams.append( 'timeseries', params.timeseries );

		const queryString = queryParams.toString();
		const url = `/analytics/summary${queryString ? `?${queryString}` : ''}`;

		const response = await request.get<Summary>( url );
		return response.data;
	},

	fetchUserTicketCountByStatus: async ( userId?: string ): Promise<UserTicketCountByStatus['data']['data']> => {
		const url = userId
			? `/analytics/user-ticket-count-by-status?userId=${userId}`
			: '/analytics/user-ticket-count-by-status';

		const response = await request.get<UserTicketCountByStatus>( url );
		return response.data.data.data;
	},
} );

export const useAnalytics = ( params?: AnalyticsParams ) => {
	const request = useRequest();
	const api = analyticsApi( request );

	// Queries
	const {
		data: summary,
		isLoading: isLoadingSummary,
		error: summaryError,
		...summaryDetails
	} = useQuery( {
		queryKey: [...ANALYTICS_KEY, 'summary', params],
		queryFn: () => api.fetchAnalyticsSummary( params ),
	} );

	const {
		data: userTicketCountByStatus,
		isLoading: isLoadingTicketCount,
		error: ticketCountError,
		...userTicketCountDetails
	} = useQuery( {
		queryKey: [...ANALYTICS_KEY, 'userTicketCount', params?.userId],
		queryFn: () => api.fetchUserTicketCountByStatus( params?.userId ),
	} );

	return {
		// Data
		summary,
		userTicketCountByStatus,

		// Loading states
		isLoading: isLoadingSummary || isLoadingTicketCount,

		// Error states
		error: summaryError || ticketCountError,

		// Query details
		summaryDetails,
		userTicketCountDetails,
	};
};
