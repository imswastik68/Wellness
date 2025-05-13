"use client";

import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import Experts from "@/components/home/Experts";
import HealthTips from "@/components/home/HealthTips";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/home/Footer";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

const AnimatedSection = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: delay * 0.2
          }
        }
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      <Hero />

      <AnimatedSection>
        <Features />
      </AnimatedSection>

      <AnimatedSection delay={1}>
        <Testimonials />
      </AnimatedSection>

      <AnimatedSection delay={2}>
        <Experts />
      </AnimatedSection>

      <AnimatedSection delay={3}>
        <HealthTips />
      </AnimatedSection>

      <AnimatedSection delay={4}>
        <Newsletter />
      </AnimatedSection>

      <AnimatedSection delay={5}>
        <Footer />
      </AnimatedSection>
    </main>
  );
}