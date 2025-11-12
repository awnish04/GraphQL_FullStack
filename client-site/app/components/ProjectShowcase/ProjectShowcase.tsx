/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import styles from "./ProjectShowcase.module.css";
import gsap from "gsap";
import { Project } from "../../../../shared/types/project";
import { getProject } from "@/app/api/graphql";
import { extractAverageColor } from "@/utils/colors";
import Link from "next/link";

type Props = {
  project: Project[];
};

export default function ProjectShowcase({ project }: Props) {
  // Add this inside the component:
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState<string[]>([]);
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;

  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  const scaleAnimation: Variants = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const },
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as const },
    },
  };

  const cursorAnimation: Variants = {
    initial: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      background: "linear-gradient(140deg, #000 20%, #000000 60%)",
    },
    enter: (i: number) => ({
      scale: 1,
      x: "-50%",
      y: "-50%",
      background: `linear-gradient(140deg, ${
        colors[i] || "#000"
      } 20%, #000000 60%)`,
      transition: {
        background: { duration: 0.5, ease: "easeInOut" },
        scale: { duration: 0.3, ease: "easeOut" },
      },
    }),
    closed: {
      scale: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  useEffect(() => {
    getProject()
      .then((data) => {
        setProjects(data);
        setLoading(false);

        // Extract colors for the first 4 projects safely
        const promises = data.slice(0, 4).map(async (project) => {
          // Defensive check in case imageUrls is missing or empty
          const imageUrl = project.imageUrls?.[0];
          if (!imageUrl) return "#000"; // fallback black

          try {
            return await extractAverageColor(imageUrl);
          } catch {
            return "#000";
          }
        });

        Promise.all(promises).then(setColors);
      })
      .catch((err) => {
        console.error("Failed to fetch Projects:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-[#3d0b0b] text-white">
      <div>
        {projects.slice(0, 4).map((project, i) => (
          <Link
            key={i}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div
              key={i}
              onMouseEnter={() => setModal({ active: true, index: i })}
              onMouseLeave={() => setModal({ active: false, index: i })}
              className={styles.project}
            >
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* MODAL DISPLAY */}
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className={styles.modalContainer}
      >
        <div
          style={{
            top: `${index * -100}%`,
            height: `${projects.length * 100}%`,
          }}
          className={styles.modalSlider}
        >
          {projects.slice(0, 4).map((project, i) => (
            <div
              key={`modal_${i}`}
              className={styles.modal}
              style={{
                background: `linear-gradient(140deg, ${
                  colors[i] || "#000"
                } 20%, #000000 60%)`,
                height: `${100 / projects.length}%`,
              }}
            >
              <Image
                className="p-10 object-contain"
                src={project.imageUrls[0]}
                alt={project.title}
                fill
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={cursor}
        className="w-20 h-20 rounded-full text-white absolute z-20 flex items-center justify-center text-sm font-light pointer-events-none"
        custom={index}
        variants={cursorAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        style={{
          background: `linear-gradient(140deg, ${
            colors[index] || "#000"
          } 20%, #000000 60%)`,
          transition: "background 0.5s ease-in-out",
        }}
      />

      <motion.div
        ref={cursorLabel}
        className="w-20 h-20 rounded-full bg-transparent text-white font-semibold absolute z-20 flex items-center justify-center text-sm pointer-events-none"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      >
        View
      </motion.div>
    </div>
  );
}
