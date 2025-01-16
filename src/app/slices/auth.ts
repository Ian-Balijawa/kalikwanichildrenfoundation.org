import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { User } from '@/types/api';

export interface Auth {
	user: User | null;
	token: string;
}

const initialState: Auth = {
	user: null,
	token: '',
};

const slice = createSlice( {
	name: 'auth',
	initialState,
	reducers: {
		signin: ( state, action: PayloadAction<{ user: User | null; token: string }> ) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		signout: ( state ) => {
			state.user = null;
			state.token = '';
		},
	},
} );

export const { signin, signout } = slice.actions;
export const user = ( state: RootState ) => state.auth.user;
export default slice.reducer;
