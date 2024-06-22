import { it, expect, describe, vi } from "vitest";
import { PUT } from "./route";
import prismaMock from "../../../../lib/__mocks__/prisma";
import { NextRequest } from "next/server";

vi.mock("../../../../lib/prisma");

describe("PUT api/notes/[id]", () => {
  it("should return the generated note", async () => {
    const updates = {
      content: "test content",
    };
    const resolvedValue = {
      ...updates,
      createdAt: new Date("2023-07-13T00:22:34.251Z"),
      id: 1,
      published: false,
      title: "test title",
      updatedAt: new Date("2023-07-13T00:22:34.251Z"),
    };
    const expected = {
      ...resolvedValue,
      createdAt: "2023-07-13T00:22:34.251Z",
      updatedAt: "2023-07-13T00:22:34.251Z",
    };
    prismaMock.note.update.mockResolvedValue(resolvedValue);

    const request = new NextRequest("https://localhost:3000/api/notes/1", {
      method: "PUT",
      body: JSON.stringify(updates),
    });
    const context = { params: { id: "1" } };
    const res = await PUT(request, context);
    const json = await res.json();
    const actual = json.note;

    expect(prismaMock.note.update).toHaveBeenCalledTimes(1);
    expect(prismaMock.note.update).toHaveBeenCalledWith({
      data: { content: expected.content, title: undefined },
      where: { id: 1 },
    });
    expect(actual).toStrictEqual(expected);
  });
});
