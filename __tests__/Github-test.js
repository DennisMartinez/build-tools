import 'babel-polyfill'
import $ from 'jquery'
import 'jasmine-jquery'
import 'jasmine-ajax'
import GithubResponse from './__helpers__/GithubResponse'
import { GitHub } from '../src/js/modules/Github'

jasmine.getFixtures().fixturesPath = 'base/src/modules'

describe('Github.js', () => {
  let github = null

  beforeEach(() => {
    // In case we want to sandbox any module, we can use this
    /*
    github = sandbox({
      class: 'github'
    })
     */

    // OR

    // We don't need the github variable if we setFixtures :)
    /*
    setFixtures(sandbox({
      class: 'github'
    }))
    */

    github = new GitHub('jfusco')
  })

  afterEach(() => {
    github = null
  })

  it('exists in DOM', () => {
    loadFixtures('github.html')

    expect($('.github')).toBeInDOM()
  })

  it('should error if no username is passed in', () => {
    // Test undefined
    expect((() => {
        new GitHub()
      })
    ).toThrowError(Error)

    // Test empty string
    expect((() => {
        new GitHub('')
      })
    ).toThrowError(Error)
  })

  it('should set this.el to jQuery object', () => {
    expect(github.el instanceof $).toBe(true)
  })

  it('should set a username', () => {
    expect(github.username).toBe('jfusco')
  })
})

describe('Github - render', () => {
  beforeEach(() => {
    loadFixtures('github.html')

    jasmine.Ajax.install();
  })

  afterEach(() => {
    jasmine.Ajax.uninstall();
  })

  it('should make a call to get user info', () => {
    const github = new GitHub('DennisMartinez')

    const spy = spyOn($, 'getJSON')

    jasmine.Ajax.stubRequest(`https://api.github.com/users/${github.username}`)
      .andReturn(GithubResponse)

    github.getUserData()

    expect(spy).toHaveBeenCalled()
  })
})
