import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { UserContext } from '../context/UserContext';
import { BrowserRouter } from 'react-router-dom';
import { dummyUser } from './data';
import { UserReturnStatus } from '../enum';

interface IExtendedRenderOptions extends RenderOptions {
  sample?: boolean;
}

export const contextedRender = (ui: ReactElement, options?: Omit<IExtendedRenderOptions, 'wrapper'>) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <UserContext.Provider
        value={{
          currentUserData: dummyUser,
          setCurrentUserData: () => {},
          isLoading: false,
          userReturnStatus: UserReturnStatus.SUCCESS
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </UserContext.Provider>
    );
  };
  return render(ui, { wrapper: Wrapper, ...options });
};
