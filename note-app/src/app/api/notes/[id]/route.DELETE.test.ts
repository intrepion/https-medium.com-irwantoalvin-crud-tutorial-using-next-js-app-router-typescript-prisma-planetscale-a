import { it, expect, describe, vi } from "vitest";
import { DELETE } from "./route";
import prismaMock from "../../../../lib/__mocks__/prisma";
import { NextRequest } from "next/server";

vi.mock("../../../../lib/prisma");

describe("DELETE api/notes/[id]", () => {
  it("should return the generated note", async () => {
    const resolvedValue = {
      content: null,
      createdAt: new Date("2023-07-13T00:22:34.251Z"),
      id: 1,
      published: false,
      title: "test title",
      updatedAt: new Date("2023-07-13T00:22:34.251Z"),
    };
    const expected = undefined;
    prismaMock.note.delete.mockResolvedValue(resolvedValue);

    const request = new NextRequest("https://localhost:3000/api/notes/1", {
      method: "DELETE",
    });
    const context = { params: { id: "1" } };
    const res = await DELETE(request, context);
    const json = await res.json();
    const actual = json.note;

    expect(prismaMock.note.delete).toHaveBeenCalledTimes(1);
    expect(prismaMock.note.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(actual).toStrictEqual(expected);
  });
});
