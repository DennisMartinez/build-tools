import 'babel-polyfill'
import $ from 'jquery'
import 'jasmine-jquery'
import 'jasmine-ajax'
import GithubResponse from './__helpers__/GithubResponse'
import { GitHub } from '../src/js/modules/Github'

jasmine.getFixtures().fixturesPath = 'base/src/modules'

describe('Github.js - instantiation', () => {
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

describe('Github.js - ajax', () => {
  const github = new GitHub('DennisMartinez')

  let request

  beforeEach(done => {
    jasmine.Ajax.install()

    github.getUserData()

    request = jasmine.Ajax.requests.mostRecent()
    request.respondWith(GithubResponse)

    done()
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  })

  it('sends the request to the right end point', () => {
    expect(request.url).toBe('https://api.github.com/users/DennisMartinez')
  });

  it('uses the correct method', () => {
    expect(request.method).toBe('GET')
  });

  it('should return the correct data', () => {
    const data = JSON.parse(request.responseText)

    expect(typeof data).toBe('object')
    expect(data.name).toBe('Dennis Martinez')
  })
})
