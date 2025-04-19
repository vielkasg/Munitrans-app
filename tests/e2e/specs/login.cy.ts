describe('Login', () => {
    it('deberia iniciar sesion con un usuario valido', () => {
      cy.visit('/')
      cy.get('input[name="usuario"]').type('vsanchez')
      cy.get('input[name="clave"]').type('VSG0515')
      cy.get('button[type="submit"]').click()
      cy.contains('Bienvenido').should('be.visible')
    })
  })
  