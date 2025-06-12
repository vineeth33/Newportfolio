import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    document.addEventListener('scroll', handleScroll);

    // GSAP entrance animations
    gsap.set(navbarRef.current, { y: -100, opacity: 0 });
    gsap.set(logoRef.current, { opacity: 0, x: -30 });
    gsap.set(menuItemsRef.current, { opacity: 0, y: -20 });

    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(navbarRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    })
      .to(logoRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(menuItemsRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.3");

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  const addToRefs = (el) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  // Handles smooth scrolling + closing menu
  const handleClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} ref={navbarRef}>
      <div className={styles.container}>
        <a className={styles.logo} href="/" ref={logoRef}>
          <span className={styles.logoText}>VINEETH</span>
          <span className={styles.logoDot}>.</span>
        </a>

        <div className={styles.menu}>
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <ul className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ''}`}>
            <li ref={addToRefs}>
              <a href="#about" onClick={(e) => handleClick(e, "about")}>About</a>
            </li>
            <li ref={addToRefs}>
              <a href="#experience" onClick={(e) => handleClick(e, "experience")}>Experience</a>
            </li>
            <li ref={addToRefs}>
              <a href="#projects" onClick={(e) => handleClick(e, "projects")}>Projects</a>
            </li>
            <li ref={addToRefs}>
              <a href="#contact" onClick={(e) => handleClick(e, "contact")}>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
