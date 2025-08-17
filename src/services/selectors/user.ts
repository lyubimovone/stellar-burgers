import { RootState } from '../store';
import { TUser } from '@utils-types';

export const selectUser = (state: RootState): TUser | null => state.user.user;

export const selectIsAuth = (state: RootState): boolean => !!state.user.user;
