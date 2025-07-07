"use client";

import React, { useEffect, useState } from "react";
import { getAbout } from "../api/graphql";
import type { About } from "../../shared/types/about";

export default function AboutList() {
  const [abouts, setAbouts] = useState<About[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAbout = async () => {
    try {
      const data = await getAbout();
      setAbouts(data);
    } catch (err) {
      console.error("Failed to fetch About data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="mt-8 space-y-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold">About Entries</h2>
      {abouts.map((item) => (
        <div
          key={item.id}
          className="rounded-md border p-4 shadow-sm bg-gray-50 dark:bg-zinc-900"
        >
          <h3 className="text-lg font-bold">{item.heading}</h3>
          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
            {item.paragraph}
          </p>
          <img
            width={100}
            height={100}
            src={item.imageUrl}
            alt="About"
            className="mt-4 w-full h-auto rounded-md object-cover"
          />
        </div>
      ))}
    </div>
  );
}
