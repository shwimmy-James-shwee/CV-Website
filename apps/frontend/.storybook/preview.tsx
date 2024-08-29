import type { Preview } from '@storybook/react'
import React from 'react'
import { withConsole } from '@storybook/addon-console'
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'
// import { UserContext } from '../src/context/UserContext'

import { BrowserRouter } from 'react-router-dom'

import '../src/App.css'
import '../src/styles/global-imports.scss'
import '../src/components/_variables.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
    },
  },
  decorators: [
    (Story) => (
      //   <UserContext.Provider
      //     value={{ currentUserData: dummyUser, setCurrentUserData: () => {}, isLoading: false }}
      //   >
      <BrowserRouter>
        <Story />
      </BrowserRouter>
      //   </UserContext.Provider>
    ),
    (storyFn, context) => withConsole()(storyFn)(context),
  ],
}

export default preview
