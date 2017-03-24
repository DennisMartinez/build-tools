import render from './bootstrap'

// See render method inside of ./bootstrap.js for information
// around how the render method works.
render('.slider', () => import(`./modules/Slider`))
render('.github', async () => {
  const { GitHub } = await import(`./modules/Github`)
  const github = new GitHub('DennisMartinez')

  github
    .getUserData()
    .then(data => github.render(data))
})

/**
 * Hot Module Replacement
 */
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept()
  }
}
