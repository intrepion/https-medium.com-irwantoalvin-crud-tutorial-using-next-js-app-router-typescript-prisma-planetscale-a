describe("template spec", () => {
  it("passes", () => {
    cy.intercept("POST", "/api/notes", {}).as("createNote");

    cy.visit("localhost:3000/create");
    cy.get('[data-cy="textbox-title"]').type("test title");
    cy.get('[data-cy="textbox-content"]').type("test content");
    cy.get('[data-cy="button-submit"]').click();
  });
});
