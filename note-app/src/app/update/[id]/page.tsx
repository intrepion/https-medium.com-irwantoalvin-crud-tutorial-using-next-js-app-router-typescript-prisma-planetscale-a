"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());

const Page = ({ params }: { params: { id: string } }) => {
  // The update page will need an id in a url
  const id = params.id;
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const router = useRouter();
  const { data, error, isLoading } = useSWR("/api/notes/" + id, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    setNewContent(data?.note.content);
    setNewTitle(data?.note.title);
  }, [data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsSubmitLoading(true);

    // Because this is a client side (because we use 'use client on top'), so we don't have to add http in the api
    await fetch("/api/notes/" + id, {
      method: "PUT", // Method put is to update
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newContent,
        id,
        title: newTitle,
      }),
    })
      .then((res) => {
        console.info(res);
      })
      .catch((e) => {
        console.info(e);
      });

    setIsSubmitLoading(false);

    router.push("/");
  };

  if (error) {
    return <p>Failed to fetch</p>;
  }

  if (isLoading) {
    return <p>Loading note...</p>;
  }

  return (
    <form
      className="w-[500px] mx-auto pt-20 flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full border p-2 rounded-md"
        data-cy="textbox-title"
        defaultValue={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Input your title"
        type="text"
      />
      <textarea
        className="w-full border p-2 rounded-md"
        data-cy="textbox-content"
        defaultValue={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="Input your content"
        rows={10}
      />
      <button data-cy="button-submit" disabled={isSubmitLoading}>
        {isSubmitLoading ? "Loading ..." : "Update"}
      </button>
    </form>
  );
};

export default Page;
