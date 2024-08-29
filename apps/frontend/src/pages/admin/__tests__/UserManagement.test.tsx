import { expect, test, describe, vi, afterEach } from 'vitest'

import { act, fireEvent, render, screen } from '@testing-library/react'

import UserManagement from '../UserManagement'
import { FakeResponsiveContainer, mockUseFetchWithMsal } from '../../../tests/utils'
import { UserTestData } from '../../TestData'
import { API } from '../../../shared/endpoints'

FakeResponsiveContainer()

const ToRender = () => {
  return <UserManagement />
}

describe('Test UserManagement', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  test('UserManagement should render user list', async () => {
    const executeMock = vi.fn((method, endpoint) => {
      if (method && endpoint.includes(API.admin.user.root)) {
        return Promise.resolve(UserTestData)
      } else {
        return Promise.resolve(UserTestData[0])
      }
    })
    mockUseFetchWithMsal({ execute: executeMock })

    render(ToRender())

    expect(await screen.findAllByTestId('user-list-item')).toHaveLength(4)
  })

  test("UserManagement should show each user's details and they are editable", async () => {
    const executeMock = vi.fn((method, endpoint) => {
      if (method && endpoint.includes(API.admin.user.root)) {
        return Promise.resolve(UserTestData)
      } else {
        return Promise.resolve(UserTestData[0])
      }
    })
    mockUseFetchWithMsal({ execute: executeMock })

    render(ToRender())

    const userList = await screen.findAllByTestId('user-list-item')
    expect(userList).toHaveLength(4)

    const userListItem = userList[0]

    await act(async () => {
      fireEvent.click(userListItem)
    })

    const firstNameField = await screen.findByTestId('first-name-field')
    expect(firstNameField).toBeDefined()
    await act(async () => {
      fireEvent.change(firstNameField, { target: { value: 'New First Name' } })
    })

    const lastNameField = await screen.findByTestId('last-name-field')
    expect(lastNameField).toBeDefined()
    await act(async () => {
      fireEvent.change(lastNameField, { target: { value: 'New Last Name' } })
    })

    const saveButton = screen.getByTestId('save-button')
    await act(async () => {
      fireEvent.click(saveButton)
    })
  })

  test('UserManagement should validate the changes to user details', async () => {
    const executeMock = vi.fn((method, endpoint) => {
      if (method && endpoint.includes(API.admin.user.root)) {
        return Promise.resolve(UserTestData)
      } else {
        return Promise.resolve(UserTestData[0])
      }
    })
    mockUseFetchWithMsal({ execute: executeMock })

    render(ToRender())

    const userList = await screen.findAllByTestId('user-list-item')
    expect(userList).toHaveLength(4)

    const userListItem = userList[0]

    await act(async () => {
      fireEvent.click(userListItem)
    })

    const firstNameField = await screen.findByTestId('first-name-field')
    expect(firstNameField).toBeDefined()
    await act(async () => {
      fireEvent.change(firstNameField, { target: { value: '' } })
    })

    const lastNameField = await screen.findByTestId('last-name-field')
    expect(lastNameField).toBeDefined()
    await act(async () => {
      fireEvent.change(lastNameField, { target: { value: '' } })
    })

    const saveButton = screen.getByTestId('save-button')
    await act(async () => {
      fireEvent.click(saveButton)
    })

    expect(screen.getAllByTestId('invalid-feedback')).toBeDefined()
  })
})
