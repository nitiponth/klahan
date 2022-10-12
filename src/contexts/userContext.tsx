import React, { Dispatch, ReactNode, useContext, useReducer } from 'react';
import { ActionMap } from '../utils/types/context';
import { IUser } from '../utils/types/user';

export enum UserContextTypes {
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
}

type ContextPayload = {
  [UserContextTypes.SET_USER]: IUser;
  [UserContextTypes.CLEAR_USER]: undefined;
};

export type ContextActions =
  ActionMap<ContextPayload>[keyof ActionMap<ContextPayload>];

interface ContextStates {
  currentUser: any;
}

const initialState: ContextStates = {
  currentUser: undefined,
};

export const UserContext = React.createContext<{
  state: ContextStates;
  dispatch: Dispatch<ContextActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface AppProviderProps {
  children: ReactNode;
}

const reducer = (
  state: ContextStates,
  action: ContextActions,
): ContextStates => {
  switch (action.type) {
    case UserContextTypes.SET_USER:
      return { ...state, currentUser: action.payload };
    case UserContextTypes.CLEAR_USER:
      return { ...state, currentUser: undefined };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState, undefined);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
