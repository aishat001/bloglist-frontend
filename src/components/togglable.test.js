/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import Togglable from './Togglable'


describe('<Togglable />', () => {
  let component
  const updateMockHandler = jest.fn()
  const removeMockHandler = jest.fn()

  beforeEach(() => {
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
    component = render(
      <Blog className="testDiv" blog={blog} updateLikes={updateMockHandler} removeBlog={removeMockHandler}>
        <Togglable buttonLabel="view" >
          <div className="testDiv">
            <button className="likebtn"></button>
          </div>
        </Togglable>

      </Blog>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('fires event handler received as props twice when like button is clicked twice', () => {
    fireEvent.click(component.container.querySelector('.togglableContent'))
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(updateMockHandler.mock.calls.length).toBe(2)
  })
})