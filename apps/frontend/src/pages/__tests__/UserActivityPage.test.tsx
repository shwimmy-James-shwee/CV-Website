import { expect, test, describe, vi, afterEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import UserActivityPage from '../UserActivityPage'
import { FakeResponsiveContainer, mockUseFetchWithMsal } from '../../tests/utils'
import { contextedRender } from '../../tests/contextRender'
import userEvent from '@testing-library/user-event'

FakeResponsiveContainer()

const ToRender = () => {
  return <UserActivityPage />
}
describe('Test UserActivity', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  test('UserActivity should have all elements', async () => {
    await waitFor(async () => {
      contextedRender(ToRender())
    })
    expect(screen.getByTestId('useractivity-refresh')).toBeDefined()
    expect(screen.getByTestId('useractivity-options')).toBeDefined()
    expect(screen.getByTestId('useractivity-chart')).toBeDefined()
    expect(screen.getByTestId('useractivity-table')).toBeDefined()
    expect(screen.getByTestId('useractivity-chart').firstChild?.firstChild?.nodeName).toBe('DIV')
  })

  test('UserActivity should update data', async () => {
    const executeMock = vi.fn(() => {
      return Promise.resolve(dummyActivityData)
    })
    mockUseFetchWithMsal({ execute: executeMock })

    contextedRender(ToRender())
    expect(executeMock).toHaveBeenCalledTimes(2)

    await userEvent.click(screen.getByTestId('useractivity-refresh'))
    expect(executeMock).toHaveBeenCalledTimes(4)

    await userEvent.selectOptions(screen.getByTestId('useractivity-options'), 'userId')
    expect(executeMock).toHaveBeenCalledTimes(6)
  })

  test('UserActivity should update data', async () => {
    const executeMock = vi.fn(() => {
      return Promise.resolve(dummyActivityData)
    })
    mockUseFetchWithMsal({ error: new Error(), execute: executeMock })

    contextedRender(ToRender())
  })
})

const dummyActivityData = {
  data: [
    {
      id: 60,
      userId: '6685c6c8-23d3-4e6b-a36e-c234065b411b',
      sessionIdentifier: '3e5d56df5032f9c173a64ee97bd15de5',
      eventStartTime: '2024-04-11T00:36:08.200Z',
      eventEndTime: '2024-04-11T00:36:40.723Z',
      eventDuration: 2658,
      eventParams: null,
      eventUrl: '/',
      createdAt: '2024-04-11T00:36:09.933Z',
      updatedAt: '2024-04-11T00:36:40.724Z',
    },
    {
      id: 59,
      userId: '6685c6c8-23d3-4e6b-a36e-c234065b411b',
      sessionIdentifier: 'e0a81321d20be6dedc9eeea2e26d6d1f',
      eventStartTime: '2024-04-10T04:30:22.349Z',
      eventEndTime: '2024-04-10T04:36:27.579Z',
      eventDuration: 5296,
      eventParams: null,
      eventUrl: '/',
      createdAt: '2024-04-10T04:30:27.838Z',
      updatedAt: '2024-04-10T04:36:27.581Z',
    },
  ],
  attributes: {
    users: [
      {
        id: '6685c6c8-23d3-4e6b-a36e-c234065b411b',
        loginEmail: 'hanli@kpmg.co.nz',
      },
    ],
  },
}
