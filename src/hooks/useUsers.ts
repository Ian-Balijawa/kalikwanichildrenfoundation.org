import { useQueryClient } from '@tanstack/react-query';
import useRequest from './useRequest';
import { User, ROLE } from '@/types/api';

type UpdateUserInput = Partial<User>;
type CreateUserInput = Partial<User>;

const USERS_QUERY_KEY = ['users'] as const;

// Dummy data for users
const demoUsers: User[] = [
	{
		id: "1",
		firstname: "Sarah",
		lastname: "Wilson",
		email: "sarah.wilson@company.com",
		password: "hashed_password",
		phoneNumber: "1234567890",
		isOnline: true,
		isActive: true,
		lastSeen: "2024-01-15T14:30:00Z",
		isEmailVerified: true,
		role: ROLE.SUPPORT,
		emailVerificationCode: null,
		passwordResetCode: null,
		createdAt: "2023-01-01",
		updatedAt: "2024-01-15",
		isOnDuty: true,
		isOnLeave: false,
	},
	{
		id: "2",
		firstname: "Mike",
		lastname: "Johnson",
		email: "mike.johnson@company.com",
		password: "hashed_password",
		phoneNumber: "2345678901",
		isOnline: true,
		isActive: true,
		lastSeen: "2024-01-15T13:45:00Z",
		isEmailVerified: true,
		role: ROLE.DEVELOPER,
		emailVerificationCode: null,
		passwordResetCode: null,
		createdAt: "2023-02-15",
		updatedAt: "2024-01-15",
		isOnDuty: true,
		isOnLeave: false,
	},
	{
		id: "3",
		firstname: "Alex",
		lastname: "Chen",
		email: "alex.chen@company.com",
		password: "hashed_password",
		phoneNumber: "3456789012",
		isOnline: true,
		isActive: true,
		lastSeen: "2024-01-15T11:20:00Z",
		isEmailVerified: true,
		role: ROLE.DEVELOPER,
		emailVerificationCode: null,
		passwordResetCode: null,
		createdAt: "2023-03-10",
		updatedAt: "2024-01-15",
		isOnDuty: false,
		isOnLeave: true,
	},
	{
		id: "4",
		firstname: "Emily",
		lastname: "Zhang",
		email: "emily.zhang@company.com",
		password: "hashed_password",
		phoneNumber: "4567890123",
		isOnline: false,
		isActive: true,
		lastSeen: "2024-01-14T15:30:00Z",
		isEmailVerified: true,
		role: ROLE.BA,
		emailVerificationCode: null,
		passwordResetCode: null,
		createdAt: "2023-04-20",
		updatedAt: "2024-01-14",
		isOnDuty: false,
		isOnLeave: false,
	},
	{
		id: "5",
		firstname: "David",
		lastname: "Smith",
		email: "david.smith@company.com",
		password: "hashed_password",
		phoneNumber: "5678901234",
		isOnline: true,
		isActive: true,
		lastSeen: "2024-01-15T12:00:00Z",
		isEmailVerified: true,
		role: ROLE.ADMIN,
		emailVerificationCode: null,
		passwordResetCode: null,
		createdAt: "2023-05-05",
		updatedAt: "2024-01-15",
		isOnDuty: true,
		isOnLeave: false,
	},
	{
		id: "6",
		firstname: "Lisa",
		lastname: "Brown",
		email: "lisa.brown@company.com",
		password: "hashed_password",
		phoneNumber: "6789012345",
		isOnline: false,
		isActive: false,
		lastSeen: "2024-01-13T09:15:00Z",
		isEmailVerified: true,
		role: ROLE.SUPPORT_ADMIN,
		emailVerificationCode: null,
		passwordResetCode: null,
		createdAt: "2023-06-15",
		updatedAt: "2024-01-13",
		isOnDuty: false,
		isOnLeave: false,
	},
	{
		id: "7",
		firstname: "James",
		lastname: "Taylor",
		email: "james.taylor@company.com",
		password: "hashed_password",
		phoneNumber: "7890123456",
		isOnline: true,
		isActive: true,
		lastSeen: "2024-01-15T14:45:00Z",
		isEmailVerified: true,
		role: ROLE.PROJECT_MANAGER,
		emailVerificationCode: null,
		passwordResetCode: null,
		createdAt: "2023-07-01",
		updatedAt: "2024-01-15",
		isOnDuty: true,
		isOnLeave: false,
	},
	{
		id: "8",
		firstname: "Sophie",
		lastname: "Garcia",
		email: "sophie.garcia@company.com",
		password: "hashed_password",
		phoneNumber: "8901234567",
		isOnline: true,
		isActive: true,
		lastSeen: "2024-01-15T13:20:00Z",
		isEmailVerified: true,
		role: ROLE.QUALITY_ANALYST,
		emailVerificationCode: null,
		passwordResetCode: null,
		createdAt: "2023-08-10",
		updatedAt: "2024-01-15",
		isOnDuty: true,
		isOnLeave: false,
	},
	{
		id: "9",
		firstname: "Ryan",
		lastname: "Martinez",
		email: "ryan.martinez@company.com",
		password: "hashed_password",
		phoneNumber: "9012345678",
		isOnline: false,
		isActive: true,
		lastSeen: "2024-01-14T16:30:00Z",
		isEmailVerified: true,
		role: ROLE.DEVELOPER,
		emailVerificationCode: null,
		passwordResetCode: null,
		createdAt: "2023-09-20",
		updatedAt: "2024-01-14",
		isOnDuty: false,
		isOnLeave: true,
	},
	{
		id: "10",
		firstname: "Emma",
		lastname: "Wilson",
		email: "emma.wilson@company.com",
		password: "hashed_password",
		phoneNumber: "0123456789",
		isOnline: true,
		isActive: true,
		lastSeen: "2024-01-15T15:00:00Z",
		isEmailVerified: true,
		role: ROLE.SUPPORT,
		emailVerificationCode: null,
		passwordResetCode: null,
		createdAt: "2023-10-01",
		updatedAt: "2024-01-15",
		isOnDuty: true,
		isOnLeave: false,
	},
];

// API functions
const usersApi = ( request: ReturnType<typeof useRequest> ) => ( {
	fetchUsers: async (): Promise<User[]> => {
		const response = await request.get<{ data: User[] }>( '/users' );
		return response.data.data;
	},

	fetchUser: async ( userId: string ): Promise<User> => {
		const response = await request.get<User>( `/users/${userId}` );
		return response.data;
	},

	createUser: async ( data: CreateUserInput ): Promise<User> => {
		const response = await request.post<User>( '/users', data );
		return response.data;
	},

	updateUser: async ( { id, data }: { id: string; data: UpdateUserInput } ): Promise<User> => {
		const response = await request.patch<User>( `/users/${id}`, data );
		return response.data;
	},

	deleteUser: async ( id: string ): Promise<User> => {
		const response = await request.delete<User>( `/users/${id}` );
		return response.data;
	},

	fetchUserProfile: async ( userId: string ): Promise<User> => {
		const response = await request.get<User>( `/users/profile?id=${userId}` );
		return response.data;
	},

	markUserOnDuty: async ( id: string ): Promise<User> => {
		const response = await request.patch<User>( `/users/${id}/duty` );
		return response.data;
	},

	markUserOnLeave: async ( id: string ): Promise<User> => {
		const response = await request.patch<User>( `/users/${id}/leave` );
		return response.data;
	},

	removeFromDuty: async ( id: string ): Promise<User> => {
		const response = await request.patch<User>( `/users/${id}/remove-duty` );
		return response.data;
	},

	removeFromLeave: async ( id: string ): Promise<User> => {
		const response = await request.patch<User>( `/users/${id}/remove-leave` );
		return response.data;
	},
} );

export const useUsers = ( userId?: string ) => {
	const request = useRequest();
	const queryClient = useQueryClient();
	const api = usersApi( request );

	return {
		// Data
		users: demoUsers,
		user: demoUsers.find( user => user.id === userId ),
		userProfile: demoUsers.find( user => user.id === userId ),

		// Loading states
		isLoading: false,
		isLoadingProfile: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,

		// Mutations
		createUser: async ( data: CreateUserInput ) => {
			const newUser = {
				...data,
				id: String( demoUsers.length + 1 ),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				isOnline: true,
				isActive: true,
				lastSeen: new Date().toISOString(),
				isEmailVerified: true,
				emailVerificationCode: null,
				passwordResetCode: null,
				isOnDuty: false,
				isOnLeave: false,
			};
			demoUsers.push( newUser as User );
			return newUser;
		},
		updateUser: async ( { id, data }: { id: string; data: UpdateUserInput } ) => {
			const userIndex = demoUsers.findIndex( u => u.id === id );
			if ( userIndex >= 0 ) {
				demoUsers[userIndex] = { ...demoUsers[userIndex], ...data };
				return demoUsers[userIndex];
			}
			throw new Error( 'User not found' );
		},
		deleteUser: async ( id: string ) => {
			const userIndex = demoUsers.findIndex( u => u.id === id );
			if ( userIndex >= 0 ) {
				const user = demoUsers[userIndex];
				demoUsers.splice( userIndex, 1 );
				return user;
			}
			throw new Error( 'User not found' );
		},
		markUserOnDuty: async ( id: string ) => {
			const user = demoUsers.find( u => u.id === id );
			if ( user ) {
				user.isOnDuty = true;
				user.isOnLeave = false;
				return user;
			}
			throw new Error( 'User not found' );
		},
		markUserOnLeave: async ( id: string ) => {
			const user = demoUsers.find( u => u.id === id );
			if ( user ) {
				user.isOnLeave = true;
				user.isOnDuty = false;
				return user;
			}
			throw new Error( 'User not found' );
		},
		removeUserFromDuty: async ( id: string ) => {
			const user = demoUsers.find( u => u.id === id );
			if ( user ) {
				user.isOnDuty = false;
				return user;
			}
			throw new Error( 'User not found' );
		},
		removeUserFromLeave: async ( id: string ) => {
			const user = demoUsers.find( u => u.id === id );
			if ( user ) {
				user.isOnLeave = false;
				return user;
			}
			throw new Error( 'User not found' );
		},
	};
};
