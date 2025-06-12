import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import history from "../../data/history.json";
import skills from "../../data/skills.json";
import { getImageUrl } from "../../utils";
import styles from "./Experience.module.css";

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const skillsRef = useRef([]);
  const timelineRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const skillElements = skillsRef.current;
    const timelineElements = timelineRef.current;

    // Set initial states
    gsap.set(title, { opacity: 0, y: 50 });
    gsap.set(skillElements, { opacity: 0, scale: 0.8, y: 30 });
    gsap.set(timelineElements, { opacity: 0, x: -50 });

    // Main timeline
    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        const tl = gsap.timeline();
        
        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        })
        .to(skillElements, {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.4")
        .to(timelineElements, {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6");
      }
    });

    // Skill hover animations
    skillElements.forEach(skill => {
      if (skill) {
        skill.addEventListener('mouseenter', () => {
          gsap.to(skill, {
            y: -10,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        skill.addEventListener('mouseleave', () => {
          gsap.to(skill, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });

  }, []);

  const addToSkillRefs = (el) => {
    if (el && !skillsRef.current.includes(el)) {
      skillsRef.current.push(el);
    }
  };

  const addToTimelineRefs = (el) => {
    if (el && !timelineRef.current.includes(el)) {
      timelineRef.current.push(el);
    }
  };

  return (
    <section className={styles.experience} ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.title} ref={titleRef}>Experience & Skills</h2>
        
        <div className={styles.content}>
          <div className={styles.skillsSection}>
            <h3 className={styles.sectionTitle}>Technical Skills</h3>
            <div className={styles.skillsGrid}>
              {skills.map((skill, id) => (
                <div key={id} className={styles.skillCard} ref={addToSkillRefs}>
                  <div className={styles.skillIcon}>
                    <img 
                      src={getImageUrl(skill.imageSrc) || "/placeholder.svg"} 
                      alt={skill.title}
                    />
                  </div>
                  <span className={styles.skillName}>{skill.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.timelineSection}>
            <h3 className={styles.sectionTitle}>Work Experience</h3>
            <div className={styles.timeline}>
              {history.map((item, id) => (
                <div key={id} className={styles.timelineItem} ref={addToTimelineRefs}>
                  <div className={styles.timelineMarker}></div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <img 
                        src={getImageUrl(item.imageSrc) || "/placeholder.svg"} 
                        alt={item.organisation}
                        className={styles.companyLogo}
                      />
                      <div className={styles.timelineInfo}>
                        <h4 className={styles.role}>{item.role}</h4>
                        <p className={styles.company}>{item.organisation}</p>
                        <span className={styles.duration}>
                          {item.startDate} - {item.endDate}
                        </span>
                      </div>
                    </div>
                    <ul className={styles.achievements}>
                      {item.experiences.map((exp, expId) => (
                        <li key={expId}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};