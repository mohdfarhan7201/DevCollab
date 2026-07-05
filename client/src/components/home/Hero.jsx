import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroPreview from "./HeroPreview";
import Button from "../ui/Button";
import Container from "../ui/Container";
import AnimatedBackground from "../background/AnimatedBackground";

export default function Hero() {
    return (
        <section className="relative overflow-hidden py-28"
            style={{
                perspective: "1600px",
            }}>
            <AnimatedBackground />

            <Container>
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 backdrop-blur">
                            <Sparkles className="h-4 w-4 text-primary" />

                            <span className="text-sm">
                                Build open-source projects together
                            </span>
                        </div>

                        <h1 className="text-5xl font-black leading-tight tracking-tight lg:text-7xl">
                            Build.
                            <br />
                            Collaborate.
                            <br />
                            <span className="bg-gradient-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent">
                                Ship Faster.
                            </span>
                        </h1>

                        <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                            DevCollab helps developers discover projects, collaborate with
                            teams, manage contributions, and ship faster—all from one
                            beautifully designed workspace.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg">
                                Get Started
                            </Button>

                            <Button variant="outline" size="lg">
                                Explore Projects

                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex gap-8 pt-6">
                            <div>
                                <h3 className="text-3xl font-bold">15K+</h3>
                                <p className="text-sm text-muted-foreground">
                                    Developers
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold">2.5K+</h3>
                                <p className="text-sm text-muted-foreground">
                                    Projects
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold">98%</h3>
                                <p className="text-sm text-muted-foreground">
                                    Success Rate
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right */}

                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                        }}
                        className="absolute -left-6 top-10 h-4 w-4 rounded-full bg-primary shadow-xl"
                    />

                    <motion.div
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 5,
                        }}
                        className="absolute -right-4 bottom-12 h-6 w-6 rounded-full bg-violet-500 shadow-xl"
                    />

                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 6,
                        }}
                        className="absolute right-24 top-0 h-3 w-3 rounded-full bg-sky-500"
                    />
                    <HeroPreview />
                </div>
            </Container>
        </section>
    );
}