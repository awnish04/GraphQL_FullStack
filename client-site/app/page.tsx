import AboutList from "@/pages/AboutPage";

import ProjectShowcase from "./components/ProjectShowcase/ProjectShowcase";
import { getProject } from "@/api/graphql";

export default async function Home() {
  const projects = await getProject();
  return (
    <div className="flex flex-col gap-8 p-6 max-w-6xl mx-auto">
      <section>
        <h1 className="text-2xl font-bold mb-4">About</h1>
        <AboutList />
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <ProjectShowcase project={projects} />
      </section>
    </div>
  );
}
