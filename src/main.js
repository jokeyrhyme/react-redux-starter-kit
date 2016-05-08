import React from 'react'
import ReactDOM from 'react-dom'
import bootstrap from 'redux-bootstrap'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import createStore from './store/createStore'

const MOUNT_ELEMENT = document.getElementById('root')

const { history, root, store } = bootstrap({
  container: MOUNT_ELEMENT,
  createHistory: createBrowserHistory,
  historyOptions: {
    basename: __BASENAME__
  },
  initialState: window.__INITIAL_STATE__,
  routes
});

let render = (key = null) => {
  ReactDOM.render(root, MOUNT_ELEMENT)
}

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')

    ReactDOM.render(<RedBox error={error} />, MOUNT_ELEMENT)
  }
  render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['./routes/index'], () => render())
}

// Use Redux DevTools chrome extension
if (__DEBUG__) {
  if (window.devToolsExtension) window.devToolsExtension.open()
}

render()
