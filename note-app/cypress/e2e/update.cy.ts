describe("update spec", () => {
  it("passes", () => {
    cy.intercept("GET", "/api/notes/1", {
      note: {
        content: "test content",
        title: "test title",
      },
    }).as("getSingleNote");
    cy.intercept("PUT", "/api/notes/1", {}).as("updateNote");

    cy.visit("localhost:3000/update/1");
    cy.get('[data-cy="textbox-title"]').type("{selectall}{del}new title");
    cy.get('[data-cy="textbox-content"]').type("{selectall}{del}new content");
    cy.get('[data-cy="button-submit"]').click();
  });
});
