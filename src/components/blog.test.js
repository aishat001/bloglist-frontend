/* eslint-disable linebreak-style */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'my first blog',
    author: 'Waheed aishat',
    url: 'none',
    likes: 7,
    id: '60e270a8805ad11fa81e2121',
    user: [
      {
        username: 'Aeeshah',
        name: 'Waheed Aishat',
        id: '60dc478db314a92ae8b4a375'
      }
    ],
  }

  const component = render(
    <Blog blog={blog} />
  )
  component.debug()

  expect(component.container).toHaveTextContent('my first blog')
})
