import { it, expect, describe, vi } from "vitest";
import { POST } from "./route";
import prismaMock from "../../../lib/__mocks__/prisma";
import { NextRequest } from "next/server";

vi.mock("../../../lib/prisma");

describe("POST api/notes", () => {
  it("should return the generated note", async () => {
    const resolvedValue = {
      content: null,
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
    prismaMock.note.create.mockResolvedValue(resolvedValue);

    const request = new NextRequest("https://localhost:3000/api/notes/", {
      method: "POST",
      body: JSON.stringify(expected),
    });
    const res = await POST(request);
    const json = await res.json();
    const actual = json.note;

    expect(prismaMock.note.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.note.create).toHaveBeenCalledWith({
      data: { content: expected.content, title: expected.title },
    });
    expect(actual).toStrictEqual(expected);
  });
});
