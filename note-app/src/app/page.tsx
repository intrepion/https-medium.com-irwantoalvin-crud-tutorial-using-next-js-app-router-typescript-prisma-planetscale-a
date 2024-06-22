"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import NotePage from "./note";
import { Note } from "@prisma/client";

const Page = () => {
  const [notes, setNotes] = useState<Array<Note>>([]);

  useEffect(() => {
    fetch("/api/notes", {
      next: { revalidate: 0 },
    })
      .then((res) => res.json())
      .then((json) => {
        setNotes(json.notes);
      });
  });

  return (
    <div className="w-[1200px] mx-auto py-20">
      {/* This will link to the create page */}
      <Link
        href={"/create"}
        className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-md text-white"
      >
        Create
      </Link>
      <div className="grid grid-cols-3 gap-5 mt-8">
        {notes
          ?.map((note: any, i: number) => <NotePage key={i} note={note} />)
          .sort()
          .reverse()}
      </div>
    </div>
  );
};

export default Page;
