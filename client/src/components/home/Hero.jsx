import { motion } from "framer-motion";

import Button from "../ui/Button";
import Container from "../ui/Container";
import HeroBackground from "./HeroBackground";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-24">

      <HeroBackground />

      <Container>

        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-extrabold leading-tight lg:text-7xl"
            >
              Build.

              <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">

                Collaborate.

              </span>

              Grow.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .3 }}
              className="mt-6 max-w-lg text-lg text-gray-600 dark:text-gray-300"
            >
              Connect with developers,
              showcase projects,
              build together,
              and grow your career.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .5 }}
              className="mt-8 flex gap-4"
            >
              <Button>

                Get Started

              </Button>

              <Button variant="secondary">

                Explore

              </Button>

            </motion.div>

          </div>

          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="flex justify-center"
          >

            <img
              src="https://undraw.co/api/illustrations/developer.svg"
              alt="Developer"
              className="w-full max-w-md"
            />

          </motion.div>

        </div>

      </Container>

    </section>
  );
};

export default Hero;