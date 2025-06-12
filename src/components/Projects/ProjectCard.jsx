import { gsap } from "gsap";
import { useRef, useState } from "react";
import { getImageUrl } from "../../utils";
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({ project: { title, imageSrc, description, skills, demo, source } }) => {
  const cardRef = useRef();
  const imageRef = useRef();
  const contentRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    const tl = gsap.timeline();
    
    tl.to(cardRef.current, {
      y: -15,
      rotationY: 5,
      rotationX: 2,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out"
    })
    .to(imageRef.current, {
      scale: 1.1,
      duration: 0.6,
      ease: "power2.out"
    }, 0)
    .to(contentRef.current, {
      y: -5,
      duration: 0.3,
      ease: "power2.out"
    }, 0.1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    gsap.to(cardRef.current, {
      y: 0,
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    
    gsap.to(contentRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div 
      className={`${styles.card} ${isHovered ? styles.hovered : ''}`}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.cardGlow}></div>
      
      <div className={styles.imageContainer}>
        <img
          ref={imageRef}
          src={getImageUrl(imageSrc) || "/placeholder.svg"}
          alt={`${title} project screenshot`}
          className={styles.image}
        />
        <div className={styles.imageOverlay}>
          <div className={styles.quickActions}>
            <a href={demo} className={styles.quickAction} target="_blank" rel="noreferrer">
              <div className={styles.actionRipple}></div>
              <svg viewBox="0 0 24 24" fill="none" className={styles.actionIcon}>
                <path
                  d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="15,3 21,3 21,9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="10"
                  y1="14"
                  x2="21"
                  y2="3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href={source} className={styles.quickAction} target="_blank" rel="noreferrer">
              <div className={styles.actionRipple}></div>
              <svg viewBox="0 0 24 24" fill="none" className={styles.actionIcon}>
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.content} ref={contentRef}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.titleGlow}></div>
        </div>
        
        <p className={styles.description}>{description}</p>

        <div className={styles.skills}>
          {skills.slice(0, 4).map((skill, id) => (
            <span key={id} className={styles.skill}>
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className={styles.skillMore}>+{skills.length - 4} more</span>
          )}
        </div>

        <div className={styles.actions}>
          <a href={demo} className={styles.primaryBtn} target="_blank" rel="noreferrer">
            <span className={styles.btnText}>Live Demo</span>
            <div className={styles.btnShine}></div>
          </a>
          <a href={source} className={styles.secondaryBtn} target="_blank" rel="noreferrer">
            <span className={styles.btnText}>View Code</span>
            <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none">
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};