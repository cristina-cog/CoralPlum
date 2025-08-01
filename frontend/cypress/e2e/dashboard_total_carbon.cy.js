// Cypress E2E test for Dashboard total carbon footprint per user
// Assumes backend and frontend are running and DB is seeded with known data

describe('Dashboard Page', () => {
  it('shows correct total carbon footprint for the user', () => {
    // Visit the dashboard page
    cy.visit('/');

    // Wait for dashboard to load
    cy.contains('Total Carbon Footprint').should('be.visible');

    // Get the value displayed in the dashboard
    cy.get('.summary-card.total-carbon .value').invoke('text').then((displayedValue) => {
      // Fetch the expected value from backend API
      cy.request('http://localhost:8080/api/carbon/total/user/demo-user').then((response) => {
        // If response.body is an object, get the value property
        const value = typeof response.body === 'number'
          ? response.body
          : response.body.value || response.body.data || 0;

        const expectedValue = Number(value).toFixed(4);
        expect(displayedValue).to.eq(expectedValue);
      });
    });
  });
});
