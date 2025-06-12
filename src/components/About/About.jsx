import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { FaCode, FaGraduationCap, FaLaptopCode, FaMobileAlt } from 'react-icons/fa';
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;

    gsap.set(cards, { opacity: 0, y: 100, scale: 0.8 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)"
        });
      }
    });

    // Hover animations
    cards.forEach(card => {
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });

  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section className={styles.about} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.bentoGrid}>
          
          <div className={`${styles.card} ${styles.cardLarge}`} ref={addToRefs}>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>About Me</h2>
              <p className={styles.cardText}>
                Hey, I’m Vineeth. I’m into computer science, and I really enjoy building things — especially apps that are simple, useful, and feel good to use.
                Lately, I’ve been exploring how AI can fit into everyday tools to make them a bit smarter and more helpful. I like working on projects that actually solve problems or just make life a little easier.</p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.cardMedium}`} ref={addToRefs}>
            <div className={styles.cardIcon}>
              <FaGraduationCap />
            </div>
            <h3 className={styles.cardSubtitle}>Education</h3>
            <p className={styles.cardSmallText}>
              CS undergrad at SSN with an interest in scalable systems, clean architecture, and modern development pipelines.
            </p>
          </div>

          <div className={`${styles.card} ${styles.cardSmall}`} ref={addToRefs}>
            <div className={styles.cardIcon}>
              <FaCode />
            </div>
            <h3 className={styles.cardSubtitle}>Full-Stack</h3>
          </div>

          <div className={`${styles.card} ${styles.cardSmall}`} ref={addToRefs}>
            <div className={styles.cardIcon}>
              <FaMobileAlt />
            </div>
            <h3 className={styles.cardSubtitle}>Mobile App Developer</h3>
          </div>

          <div className={`${styles.card} ${styles.cardMedium}`} ref={addToRefs}>
            <div className={styles.cardIcon}>
              <FaLaptopCode />
            </div>
            <h3 className={styles.cardSubtitle}>Software Developer</h3>
            <p className={styles.cardSmallText}>
              Passionate about building scalable software systems that bridge ideas with execution using modern development tools.
            </p>
          </div>

          <div className={`${styles.card} ${styles.cardWide}`} ref={addToRefs}>
            <div className={styles.statsGrid}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>3+</span>
                <span className={styles.statLabel}>Years Learning</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Technologies</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};