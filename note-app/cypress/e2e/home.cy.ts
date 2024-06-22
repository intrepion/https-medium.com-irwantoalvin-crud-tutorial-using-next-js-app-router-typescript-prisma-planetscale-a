describe("home spec", () => {
  it("passes", () => {
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
    cy.intercept("DELETE", "/api/notes/1", {}).as("deleteNote");

    cy.visit("localhost:3000");
    cy.get('[data-cy="button-delete-1"]').click();
  });
});
