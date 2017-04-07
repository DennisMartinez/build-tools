import 'babel-polyfill'
import $ from 'jquery'
import 'jasmine-jquery'
import 'jasmine-ajax'
import { ok200, notFound404 } from './__helpers__/GithubResponses'
import { GitHub } from '../src/js/modules/Github'

jasmine.getFixtures().fixturesPath = 'base/src/modules'

describe('Github.js - instantiation', () => {
  let github = null

  beforeEach(() => {
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
    request.respondWith(ok200)

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
    expect(request.status).toBe(200)
    expect(data.name).toBe('Dennis Martinez')
    expect(data.company).toBe('Verndale')
  })
})

describe('Github.js - render', () => {
  let github = null,
    gitHubAvatar,
    gitHubInfo

  const data = JSON.parse(ok200.responseText)

  beforeEach(() => {
    loadFixtures('github.html')

    github = new GitHub('DennisMartinez')
    github.render(data)

    gitHubAvatar = $('.github-avatar')
    gitHubInfo = $('.github-info')
  })

  afterEach(() => {
    github = null
    gitHubAvatar = null
    gitHubInfo = null
  })

  describe('avatar', () => {
    it('should exist', () => {
      expect(gitHubAvatar).toBeInDOM()
    })

    it('should render avatar attributes', () => {
      const $avatar = gitHubAvatar.find('img')

      expect($avatar.attr('src')).toBe(data.avatar_url)
      expect($avatar.attr('alt')).toBe(data.name)
    })
  })

  describe('info', () => {
    it('should exist', () => {
      expect(gitHubInfo).toBeInDOM()
    })

    it('should render user info', () => {
      const $gitHubLink = gitHubInfo.find('a')
      const $company = gitHubInfo.find('li:nth-child(2)')
      const $email = gitHubInfo.find('li:nth-child(3)')
      const $bio = gitHubInfo.find('p')

      expect($gitHubLink.attr('href')).toBe(data.html_url)
      expect($gitHubLink.text()).toBe(data.html_url)

      expect($company.text()).toBe(`Company: ${data.company}`)
      expect($email.text()).toBe(`Email: ${data.email}`)
      expect($bio.text()).toBe(data.bio)
    })
  })
})
