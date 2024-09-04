import { createContext, ReactNode, useEffect, useState } from 'react';
import { prisma } from '@core/db';
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { API } from '../shared/endpoints';
import { UserReturnStatus } from '../enum';

export type CurrentUserBusinessUnitsType = {
  id: string;
  name: string;
};

export interface CurrentUserType extends prisma.User {
  InBusinessUnits: CurrentUserBusinessUnitsType[];
}

export type UserContextType = {
  currentUserData: CurrentUserType | null;
  setCurrentUserData: (userData: CurrentUserType | null) => void;
  isLoading: boolean;
  userReturnStatus: UserReturnStatus;
};

export const UserContext = createContext<UserContextType>({} as UserContextType);

interface IUserProvider {
  children: ReactNode;
}

const UserProvider = ({ children }: IUserProvider) => {
  const { error, apiError, execute, isLoading } = useFetchWithMsal();
  const [currentUserData, setCurrentUserData] = useState<CurrentUserType | null>(null);
  const [userReturnStatus, setUserReturnStatus] = useState<UserReturnStatus>(UserReturnStatus.LOADING);

  useEffect(() => {
    if (!currentUserData && !error) {
      execute('GET', API.user.currentUser).then((response: CurrentUserType) => {
        // get the current users record (via API token in the BE), set context to use data throughout app
        if (response) {
          setCurrentUserData(response);
          setUserReturnStatus(UserReturnStatus.SUCCESS);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute, error]);

  useEffect(() => {
    if (error && apiError) {
      if (apiError.response.message === 'User not invited') {
        setUserReturnStatus(UserReturnStatus.NOT_INVITED);
      } else if (apiError.response.message.includes('Multiple sessions')) {
        setUserReturnStatus(UserReturnStatus.MULTIPLE_SESSIONS);
      } else {
        setUserReturnStatus(UserReturnStatus.UNAUTHORISED);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute, error]);

  return (
    <UserContext.Provider
      value={{
        currentUserData,
        setCurrentUserData,
        isLoading,
        userReturnStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
