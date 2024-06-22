import { it, expect, describe, vi } from "vitest";
import { GET } from "./route";
import prismaMock from "../../../lib/__mocks__/prisma";

vi.mock("../../../lib/prisma");

describe("GET api/notes", () => {
  it("should return the generated note", async () => {
    const resolvedValue = [
      {
        content: null,
        createdAt: new Date("2023-07-13T00:22:34.251Z"),
        id: 1,
        published: false,
        title: "test title",
        updatedAt: new Date("2023-07-13T00:22:34.251Z"),
      },
    ];
    const expected = [
      {
        ...resolvedValue[0],
        createdAt: "2023-07-13T00:22:34.251Z",
        updatedAt: "2023-07-13T00:22:34.251Z",
      },
    ];
    prismaMock.note.findMany.mockResolvedValue(resolvedValue);

    const res = await GET();
    const json = await res.json();
    const actual = json.notes;

    expect(prismaMock.note.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.note.findMany).toHaveBeenCalledWith({});
    expect(actual).toStrictEqual(expected);
  });
});
