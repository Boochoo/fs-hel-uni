const apiUrl = 'http://localhost:3003/api'
const baseUrl = 'http://localhost:3000'

const user = {
  name: 'Ermi',
  username: 'Ermi',
  password: 'password',
}
const testBlog = {
  title: 'Test blog',
  author: 'Test blog author',
  url: 'Test blog url',
  likes: 78,
}

const credChecker = (username, loginMessage) => {
  cy.contains('login').click()
  cy.get('input[name=username]').type(username)
  cy.get('input[name=password]').type('password')
  cy.get('#login-button').click()
  cy.contains(loginMessage)
}

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${apiUrl}/testing/reset`)
      .request('POST', `${apiUrl}/users`, user)
      .visit(baseUrl)
  })

  it('Login form is shown', function () {
    cy.contains('Login to application')
    cy.contains('login').click()
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      credChecker('Ermi', 'Ermi logged in')
    })

    it('fails with wrong credentials', () => {
      credChecker('boochooo', 'invalid username or password')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: user.name, password: user.password })
    })

    it('a new blog can be created', () => {
      cy.get('#create-new-button').click()
      cy.get('input[name=title]').type('Test title')
      cy.get('input[name=author]').type('Test author')
      cy.get('input[name=url]').type('Test url')
      cy.get('#create-button').click()
    })

    it('a user can like a blog', () => {
      cy.createBlog(testBlog)

      cy.contains('view').click()
      cy.contains('78')
      cy.contains('like').click()
      cy.contains('79')
    })

    it('a user can delete a blog', () => {
      cy.createBlog(testBlog)

      cy.contains('view').click()
      cy.contains(testBlog.title)
      cy.contains('remove blog').click()

      cy.get('html').should('not.contain', testBlog.title)
    })

    it('blogs are arranged by likes in descending order', () => {
      cy.createBlog({ ...testBlog, likes: 33 })
      cy.createBlog({ ...testBlog, likes: 0 })
      cy.createBlog({ ...testBlog, likes: 333 })
      cy.createBlog({ ...testBlog, likes: 3 })

      cy.get('.view-button').each((button) => cy.wrap(button).click())

      cy.get('.blog-item').then((blog) => {
        cy.wrap(blog[0]).should('contain', '333')
        cy.wrap(blog[1]).should('contain', '33')
        cy.wrap(blog[2]).should('contain', '3')
        cy.wrap(blog[3]).should('contain', '0')
      })
    })
  })
})
