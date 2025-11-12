import { getProject } from "./api/graphql";
import AboutList from "./components/AboutList";
import ProjectShowcase from "./components/ProjectShowcase/ProjectShowcase";


export default async function About() {
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
