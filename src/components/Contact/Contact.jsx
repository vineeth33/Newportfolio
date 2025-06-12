import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contactCardsRef = useRef([]);
  const socialLinksRef = useRef([]);
  const ctaButtonRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const contactCards = contactCardsRef.current;
    const socialLinks = socialLinksRef.current;
    const ctaButton = ctaButtonRef.current;

    // Set initial states
    gsap.set([title, subtitle], { opacity: 0, y: 60 });
    gsap.set(contactCards, { opacity: 0, y: 40, scale: 0.95 });
    gsap.set(socialLinks, { opacity: 0, scale: 0.9 });
    gsap.set(ctaButton, { opacity: 0, y: 20 });

    // Scroll-triggered timeline
    ScrollTrigger.create({
      trigger: container,
      start: "top 75%",
      onEnter: () => {
        const tl = gsap.timeline();

        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
        })
          .to(
            subtitle,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.5"
          )
          .to(
            contactCards,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.2,
              duration: 0.8,
              ease: "back.out(1.5)",
            },
            "-=0.4"
          )
          .to(
            socialLinks,
            {
              opacity: 1,
              scale: 1,
              stagger: 0.15,
              duration: 0.6,
              ease: "elastic.out(1, 0.8)",
            },
            "-=0.5"
          )
          .to(
            ctaButton,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.3"
          );
      },
    });

    // Hover animations for cards
    contactCards.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -12,
            scale: 1.03,
            boxShadow: "0 15px 30px rgba(225, 0, 255, 0.3)",
            duration: 0.4,
            ease: "power3.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            duration: 0.4,
            ease: "power3.out",
          });
        });
      }
    });

    // Hover animations for social links
    socialLinks.forEach((link) => {
      if (link) {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, {
            scale: 1.3,
            rotation: 8,
            color: "#e100ff",
            duration: 0.3,
            ease: "back.out(1.5)",
          });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            scale: 1,
            rotation: 0,
            color: "#ffffff",
            duration: 0.3,
            ease: "power3.out",
          });
        });
      }
    });

    // Hover animation for CTA button
    if (ctaButton) {
      ctaButton.addEventListener("mouseenter", () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          background: "linear-gradient(135deg, #e100ff, #7f00ff)",
          boxShadow: "0 10px 20px rgba(225, 0, 255, 0.4)",
          duration: 0.3,
          ease: "power3.out",
        });
      });
      ctaButton.addEventListener("mouseleave", () => {
        gsap.to(ctaButton, {
          scale: 1,
          background: "linear-gradient(135deg, #7f00ff, #e100ff)",
          boxShadow: "0 5px 15px rgba(225, 0, 255, 0.2)",
          duration: 0.3,
          ease: "power3.out",
        });
      });
    }
  }, []);

  const addToContactRefs = (el) => {
    if (el && !contactCardsRef.current.includes(el)) {
      contactCardsRef.current.push(el);
    }
  };

  const addToSocialRefs = (el) => {
    if (el && !socialLinksRef.current.includes(el)) {
      socialLinksRef.current.push(el);
    }
  };

  return (
    <section className={styles.contact} ref={containerRef}>
      <div className={styles.backgroundPattern}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title} ref={titleRef}>
            Get in Touch
          </h2>
          <p className={styles.subtitle} ref={subtitleRef}>
            Let's create something extraordinary together.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard} ref={addToContactRefs}>
              <div className={styles.cardIcon}>
                <FaEnvelope />
              </div>
              <h3 className={styles.cardTitle}>Email</h3>
              <p className={styles.cardText}>Reach out anytime</p>
              <a href="mailto:vineeth2210369@ssn.edu.in" className={styles.cardLink}>
                vineeth2210369@ssn.edu.in
              </a>
            </div>

            <div className={styles.contactCard} ref={addToContactRefs}>
              <div className={styles.cardIcon}>
                <FaLinkedin />
              </div>
              <h3 className={styles.cardTitle}>LinkedIn</h3>
              <p className={styles.cardText}>Connect professionally</p>
              <a
                href="https://www.linkedin.com/in/vineeth-ummadisetty-4933511a6/"
                target="_blank"
                rel="noreferrer"
                className={styles.cardLink}
              >
                Visit Profile
              </a>
            </div>

            <div className={styles.contactCard} ref={addToContactRefs}>
              <div className={styles.cardIcon}>
                <FaGithub />
              </div>
              <h3 className={styles.cardTitle}>GitHub</h3>
              <p className={styles.cardText}>Explore my projects</p>
              <a
                href="https://github.com/vineeth33"
                target="_blank"
                rel="noreferrer"
                className={styles.cardLink}
              >
                View Repos
              </a>
            </div>
          </div>

          <div className={styles.socialSection}>
            <h3 className={styles.socialTitle}>Stay Connected</h3>
            <div className={styles.socialLinks}>
              <a
                href="https://x.com/Vineeth0101"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
                ref={addToSocialRefs}
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/vineeth-ummadisetty-4933511a6/"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
                ref={addToSocialRefs}
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/vineeth33"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
                ref={addToSocialRefs}
              >
                <FaGithub />
              </a>
            </div>
            <button className={styles.ctaButton} ref={ctaButtonRef}>
              <a href="mailto:vineeth2210369@ssn.edu.in">Send a Message</a>
            </button>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.copyright}>
            © 2025 Vineeth Ummadisetty.
          </p>
        </div>
      </div>
    </section>
  );
};