import { expect, test, describe, vi, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import LandingPage from '../LandingPage'
import { contextedRender } from '../../tests/contextRender'

const ToRender = () => {
  return <LandingPage />
}

describe('Test Landing page', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  test('LandingPage should have all elements', async () => {
    contextedRender(ToRender())

    expect(screen.getByTestId('header')).toBeDefined()
    expect(screen.getAllByTestId('landing-intro-header')).toHaveLength(2)
    expect(screen.getAllByTestId('landing-intro-text')).toHaveLength(2)
  })

  test('LandingPage should greet the user correctly', async () => {
    contextedRender(ToRender())
    expect(screen.getAllByText('Hi han,')).toHaveLength(1)
    expect(screen.getAllByText('Welcome to the template webapp')).toHaveLength(1)
  })
})
