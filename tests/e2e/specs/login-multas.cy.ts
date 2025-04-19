/// <reference types="cypress" />

describe('Login y navegación a Multas', () => {
    it('deberia iniciar sesion e ir al modulo de multas', () => {
      // 1. Ir al login
      cy.visit('/');
  
      // 2. Ingresar credenciales
      cy.get('input[name="usuario"]').type('vsanchez');
      cy.get('input[name="clave"]').type('VSG0515');
      cy.get('button[type="submit"]').click();
  
      // 3. Verificar que entró a la página de inicio
      cy.contains('Munitrans').should('be.visible');
  
      // 4. Hacer clic en el módulo de multas
      cy.contains('Multas').click();
  
      // 5. Verificar que el módulo de multas cargó correctamente
      cy.url().should('include', '/multas');
      cy.contains('Estado').should('be.visible'); // Ej: el filtro de estado
    });
  });
  