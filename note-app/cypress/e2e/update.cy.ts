describe("update spec", () => {
  it("passes", () => {
    cy.intercept("GET", "/api/notes/1", {
      note: {
        content: "test content",
        title: "test title",
      },
    }).as("getSingleNote");
    cy.intercept("PUT", "/api/notes/1", {}).as("updateNote");
    cy.intercept("GET", "/api/notes", {
      notes: [
        {
          id: 1,
          title: "test title",
          content: "test content",
          published: true,
          createdAt: "2023-07-13T00:22:34.251Z",
          updatedAt: "2023-07-13T00:22:34.251Z",
        },
      ],
    }).as("getAllNotes");

    cy.visit("localhost:3000");
    cy.get('[data-cy="button-update-1"]').click();
    cy.get('[data-cy="textbox-title"]').type("{selectall}{del}new title");
    cy.get('[data-cy="textbox-content"]').type("{selectall}{del}new content");
    cy.get('[data-cy="button-submit"]').click();
  });
});
