"use client";

import React, { useEffect, useState } from "react";
import { getAbout } from "../api/graphql";
import type { About } from "../../shared/types/about";
import Image from "next/image";

export default function AboutList() {
  const [abouts, setAbouts] = useState<About[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAbout()
      .then(setAbouts)
      .catch((err) => console.error("Failed to fetch About:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {abouts.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border p-4 shadow bg-white dark:bg-neutral-900"
        >
          <h3 className="text-lg font-bold">{item.heading}</h3>
          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
            {item.paragraph}
          </p>
          {item.imageUrl && (
            <div className="relative w-full h-48 mt-4">
              <Image
                src={item.imageUrl}
                alt="About"
                fill
                className="rounded-md object-cover"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
