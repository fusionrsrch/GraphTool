describe("Visual regression tests", () => {
  it('Should match previous screenshot "about Page"', () => {
    cy.visit("/#about");
    cy.matchImageSnapshot();
  });
  it('Should match previous screenshot "skills Page"', () => {
    cy.visit("/#skills");
    cy.matchImageSnapshot();
  });
});
