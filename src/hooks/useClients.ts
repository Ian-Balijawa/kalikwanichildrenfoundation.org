import { useQueryClient } from '@tanstack/react-query';
import useRequest from './useRequest';
import { Client } from '@/types/api';

type UpdateClientInput = Partial<Client>;
type CreateClientInput = {
	name: string;
	email: string;
	phoneNumber: string;
	address: string;
	type: string;
};

const CLIENTS_QUERY_KEY = ['clients'] as const;

// Dummy data for clients
const demoClients: Client[] = [
	{
		id: 1,
		name: "TechCorp Solutions",
		email: "contact@techcorp.com",
		phoneNumber: "1234567890",
		type: "Enterprise",
		address: "123 Tech Park, Silicon Valley",
		isActive: true,
		createdAt: "2023-01-15",
		updatedAt: "2024-01-15",
	},
	{
		id: 2,
		name: "Global Retail Inc",
		email: "info@globalretail.com",
		phoneNumber: "2345678901",
		type: "Corporate",
		address: "456 Business Ave, New York",
		isActive: true,
		createdAt: "2023-02-20",
		updatedAt: "2024-01-14",
	},
	{
		id: 3,
		name: "HealthCare Plus",
		email: "support@healthcareplus.com",
		phoneNumber: "3456789012",
		type: "Healthcare",
		address: "789 Medical Center Blvd, Boston",
		isActive: true,
		createdAt: "2023-03-10",
		updatedAt: "2024-01-15",
	},
	{
		id: 4,
		name: "EduTech Systems",
		email: "admin@edutech.com",
		phoneNumber: "4567890123",
		type: "Education",
		address: "321 Campus Drive, Austin",
		isActive: false,
		createdAt: "2023-04-05",
		updatedAt: "2024-01-13",
	},
	{
		id: 5,
		name: "FinServ Bank",
		email: "support@finserv.com",
		phoneNumber: "5678901234",
		type: "Financial",
		address: "567 Wall Street, Manhattan",
		isActive: true,
		createdAt: "2023-05-12",
		updatedAt: "2024-01-15",
	},
	{
		id: 6,
		name: "Green Energy Co",
		email: "info@greenenergy.com",
		phoneNumber: "6789012345",
		type: "Energy",
		address: "890 Solar Road, Phoenix",
		isActive: true,
		createdAt: "2023-06-18",
		updatedAt: "2024-01-15",
	},
	{
		id: 7,
		name: "SmartHome Automation",
		email: "sales@smarthome.com",
		phoneNumber: "7890123456",
		type: "IoT",
		address: "432 Smart Street, Seattle",
		isActive: true,
		createdAt: "2023-07-22",
		updatedAt: "2024-01-14",
	},
	{
		id: 8,
		name: "Logistics Pro",
		email: "operations@logisticspro.com",
		phoneNumber: "8901234567",
		type: "Logistics",
		address: "765 Transport Hub, Chicago",
		isActive: false,
		createdAt: "2023-08-30",
		updatedAt: "2024-01-12",
	},
	{
		id: 9,
		name: "Media Masters",
		email: "contact@mediamasters.com",
		phoneNumber: "9012345678",
		type: "Media",
		address: "234 Studio Lane, Los Angeles",
		isActive: true,
		createdAt: "2023-09-14",
		updatedAt: "2024-01-15",
	},
	{
		id: 10,
		name: "Retail Chain Corp",
		email: "support@retailchain.com",
		phoneNumber: "0123456789",
		type: "Retail",
		address: "543 Mall Street, Miami",
		isActive: true,
		createdAt: "2023-10-25",
		updatedAt: "2024-01-15",
	},
];

export const useClients = ( clientId?: string ) => {
	const request = useRequest();
	const queryClient = useQueryClient();

	return {
		// Data
		clients: demoClients,
		client: demoClients.find( client => client.id === Number( clientId ) ),
		clientProfile: demoClients.find( client => client.id === Number( clientId ) ),

		// Loading states
		isLoading: false,
		isLoadingProfile: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,

		// Mutations
		createClient: async ( data: CreateClientInput ) => {
			const newClient = {
				...data,
				id: demoClients.length + 1,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				isActive: true,
			};
			demoClients.push( newClient as Client );
			return newClient;
		},
		updateClient: async ( { id, data }: { id: string; data: UpdateClientInput } ) => {
			const clientIndex = demoClients.findIndex( c => c.id === Number( id ) );
			if ( clientIndex >= 0 ) {
				demoClients[clientIndex] = { ...demoClients[clientIndex], ...data };
				return demoClients[clientIndex];
			}
			throw new Error( 'Client not found' );
		},
		deleteClient: async ( id: string ) => {
			const clientIndex = demoClients.findIndex( c => c.id === Number( id ) );
			if ( clientIndex >= 0 ) {
				const client = demoClients[clientIndex];
				demoClients.splice( clientIndex, 1 );
				return client;
			}
			throw new Error( 'Client not found' );
		},
	};
};
