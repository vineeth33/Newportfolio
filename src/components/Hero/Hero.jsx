import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef } from "react";
import { FaArrowDown, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import styles from "./Hero.module.css";

gsap.registerPlugin(TextPlugin);

export const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Set initial states
    gsap.set([textRef.current, nameRef.current, roleRef.current, ctaRef.current], {
      opacity: 0,
      y: 100
    });
    gsap.set(scrollIndicatorRef.current, { opacity: 0 });

    // Main timeline
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(nameRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.7")
    .to(roleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .to(scrollIndicatorRef.current, {
      opacity: 1,
      duration: 0.5
    }, "-=0.3");

    // Continuous animations
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Background animation
    gsap.to(backgroundRef.current, {
      rotation: 360,
      duration: 100,
      ease: "none",
      repeat: -1
    });

    // Typewriter effect for name
    setTimeout(() => {
      gsap.to(nameRef.current, {
        text: "VINEETH UMMADISETTY",
        duration: 1.5,
        ease: "none"
      });
    }, 1500);

  }, []);

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.backgroundPattern} ref={backgroundRef}></div>
      
      <div className={styles.content}>
        <div className={styles.textSection}>
          <p className={styles.greeting} ref={textRef}>
            Hello, I'm
          </p>
          <h1 className={styles.name} ref={nameRef}></h1>
          <h2 className={styles.role} ref={roleRef}>
            Computer Science Student & <br />
            <span className={styles.highlight}>Full-Stack Developer</span>
          </h2>
        </div>
       <div className={styles.cta} ref={ctaRef}>
          <div className={styles.socialLinks}>
            <a href="mailto:vineeth2210369@ssn.edu.in" className={styles.socialLink}>
              <FaEnvelope  />
            </a>
            <a href="https://www.linkedin.com/in/vineeth-ummadisetty-4933511a6/" className={styles.socialLink}>
              <FaLinkedin />
            </a>
            <a href="https://github.com/vineeth33" className={styles.socialLink}>
              <FaGithub />
            </a>
          </div>
          <button className={styles.primaryBtn}>
            Let's Work Together
          </button>
          <a
            href="/assets/hero/vineeth-04.pdf"
            className={styles.secondaryBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        </div>
      </div>

      <div className={styles.scrollIndicator} ref={scrollIndicatorRef}>
        <FaArrowDown />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};