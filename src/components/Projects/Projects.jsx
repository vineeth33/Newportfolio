import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const scrollRef = useRef();
  const glowRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cards = cardsRef.current;
    const glow = glowRef.current;

    // Set initial states
    gsap.set(title, { opacity: 0, y: 80, rotationX: 30 });
    gsap.set(subtitle, { opacity: 0, y: 40 });
    gsap.set(cards, { opacity: 0, y: 120, rotationY: 15, scale: 0.7 });
    gsap.set(glow, { opacity: 0, scale: 0.5 });

    // Floating glow animation
    gsap.to(glow, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Main timeline
    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        const tl = gsap.timeline();
        
        tl.to(glow, {
          opacity: 0.6,
          scale: 1,
          duration: 1.5,
          ease: "power2.out"
        })
        .to(title, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        }, "-=1")
        .to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.8")
        .to(cards, {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          stagger: {
            amount: 0.8,
            from: "start"
          },
          duration: 1,
          ease: "back.out(1.4)"
        }, "-=0.4");
      }
    });

    // Parallax effect for glow
    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(glow, {
          y: self.progress * -100,
          duration: 0.3
        });
      }
    });

  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const scroll = (direction) => {
    const scrollAmount = 420;
    if (direction === "left") {
      scrollRef.current.scrollLeft -= scrollAmount;
    } else {
      scrollRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <section className={styles.projects} ref={containerRef}>
      <div className={styles.floatingGlow} ref={glowRef}></div>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title} ref={titleRef}>
              Featured <span className={styles.highlight}>Projects</span>
            </h2>
          </div>
        </div>

        <div className={styles.carouselContainer}>
          <button
            className={`${styles.navButton} ${styles.navLeft}`}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <div className={styles.navIcon}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          <div className={styles.carousel} ref={scrollRef}>
            {projects.map((project, id) => (
              <div key={id} className={styles.cardWrapper} ref={addToRefs}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <button
            className={`${styles.navButton} ${styles.navRight}`}
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <div className={styles.navIcon}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};