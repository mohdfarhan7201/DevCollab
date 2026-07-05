import {
  Users,
  GitBranch,
  Rocket,
  ShieldCheck,
  MessagesSquare,
  LayoutDashboard,
} from "lucide-react";

import Container from "../ui/Container";
import Reveal from "../animations/Reveal";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Users,
    title: "Developer Matching",
    description:
      "Find contributors with the right skills for your open-source or private projects.",
  },
  {
    icon: GitBranch,
    title: "Project Collaboration",
    description:
      "Manage repositories, tasks and pull requests from one collaborative workspace.",
  },
  {
    icon: MessagesSquare,
    title: "Real-time Discussions",
    description:
      "Keep conversations organized with project-based discussions and updates.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Workspace",
    description:
      "Authentication, authorization and protected collaboration built from the start.",
  },
  {
    icon: Rocket,
    title: "Faster Delivery",
    description:
      "Reduce friction between developers and ship features with confidence.",
  },
  {
    icon: LayoutDashboard,
    title: "Modern Dashboard",
    description:
      "Everything you need to manage contributors, repositories and activity in one place.",
  },
];

export default function Features() {
  return (
    <section className="py-28">
      <Container>
        <Reveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Features
            </span>

            <h2 className="mt-6 text-4xl font-bold md:text-5xl">
              Everything your developer team needs.
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              DevCollab combines project management, collaboration,
              communication and contributor discovery into one
              beautiful workspace.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal
              key={feature.title}
              delay={index * 0.08}
            >
              <FeatureCard {...feature} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}