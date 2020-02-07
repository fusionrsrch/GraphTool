describe("Log In", () => {
  it("succesfully performs login action", () => {
    // visit 'baseUrl'
    cy.visit("/");
    // assert if we are in good place - search for a 'smarter world phrase
    cy.contains("smarter world");
  });
});
