import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import NotFoundPage from '../NotFoundPage'

test('Notfound should have title and subtitle', async () => {
  render(
    <Router>
      <NotFoundPage />
    </Router>,
  )
  // test the titles
  expect(screen.getByTestId('title')).toBeDefined()
  expect(screen.getByTestId('subtitle')).toBeDefined()

  //   screen.debug()
})
