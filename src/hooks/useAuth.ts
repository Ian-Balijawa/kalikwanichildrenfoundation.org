import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useRequest from './useRequest';
import { LoginResponse, User } from '@/types/api';
import { useDispatch } from 'react-redux';
import { signin } from '@/app/slices/auth';
import { useNavigate } from 'react-router-dom';
import { LoginData } from '@/types/common';
import { SignUpData } from '@/types/common';

const USER_QUERY_KEY = ['user'] as const;

// API functions
const authApi = ( request: ReturnType<typeof useRequest> ) => ( {
	signUp: async ( data: SignUpData ): Promise<User> => {
		const response = await request.post( '/auth/signup', data );
		return response.data;
	},

	login: async ( data: LoginData ): Promise<LoginResponse> => {
		const response = await request.post( '/auth/login', data );
		return response.data;
	},

	logout: async (): Promise<void> => {
		await request.get( '/auth/logout' );
	},

	getCurrentUser: async (): Promise<User> => {
		const response = await request.get<User>( '/auth/me' );
		return response.data;
	},

	sendVerificationEmail: async ( email: string ): Promise<void> => {
		await request.post( '/auth/verify/email/send', null, { params: { email } } );
	},

	verifyEmail: async ( token: string ): Promise<void> => {
		await request.post( '/auth/verify/email', null, { params: { token } } );
	},

	requestPasswordReset: async ( email: string ): Promise<void> => {
		await request.post( '/auth/password/reset', { email } );
	},

	resetPassword: async ( { token, password }: { token: string; password: string } ): Promise<void> => {
		await request.post( '/auth/password/create', { password }, { params: { token } } );
	},

	updatePassword: async ( data: { oldPassword: string; newPassword: string } ): Promise<void> => {
		await request.post( '/auth/password/update', data );
	},
} );

export const useAuth = () => {
	const request = useRequest();
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const api = authApi( request );

	// Queries
	const { data: user, isLoading: isLoadingUser } = useQuery( {
		queryKey: USER_QUERY_KEY,
		queryFn: api.getCurrentUser,
		enabled: false,
	} );

	// Mutations
	const signup = useMutation( {
		mutationFn: api.signUp,
	} );

	const login = useMutation( {
		mutationFn: api.login,
		onSuccess: ( response ) => {
			dispatch( signin( {
				user: response.data.user,
				token: response.data.accessToken
			} ) );
			navigate( '/' );
		},
	} );

	const logout = useMutation( {
		mutationFn: api.logout,
		onSuccess: () => {
			queryClient.removeQueries( { queryKey: USER_QUERY_KEY } );
		},
	} );

	const sendVerificationEmail = useMutation( {
		mutationFn: api.sendVerificationEmail,
	} );

	const verifyEmail = useMutation( {
		mutationFn: api.verifyEmail,
	} );

	const requestPasswordReset = useMutation( {
		mutationFn: api.requestPasswordReset,
	} );

	const resetPassword = useMutation( {
		mutationFn: api.resetPassword,
	} );

	const updatePassword = useMutation( {
		mutationFn: api.updatePassword,
	} );

	return {
		// Current user data
		user,
		isLoadingUser,

		// Auth mutations
		signup,
		login,
		logout,

		// Email verification
		sendVerificationEmail,
		verifyEmail,

		// Password management
		requestPasswordReset,
		resetPassword,
		updatePassword,
	};
};
