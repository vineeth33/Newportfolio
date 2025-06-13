import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaTwitter,
  FaUser
} from "react-icons/fa";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const socialLinksRef = useRef([]);
  const formRef = useRef(null);
  const ctaButtonRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const socialLinks = socialLinksRef.current;
    const form = formRef.current;
    const ctaButton = ctaButtonRef.current;

    gsap.set([title, subtitle], { opacity: 0, y: 60 });
    gsap.set(form, { opacity: 0, y: 50 });
    gsap.set(socialLinks, { opacity: 0, scale: 0.9 });
    gsap.set(ctaButton, { opacity: 0, y: 20 });

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
            form,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.6"
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

    if (ctaButton) {
      ctaButton.addEventListener("mouseenter", () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          background: "linear-gradient(135deg, #e100ff, #7f00ff)",
          boxShadow: "0 12px 25px rgba(225, 0, 255, 0.5)",
          duration: 0.3,
          ease: "power3.out",
        });
      });
      ctaButton.addEventListener("mouseleave", () => {
        gsap.to(ctaButton, {
          scale: 1,
          background: "linear-gradient(135deg, #7f00ff, #e100ff)",
          boxShadow: "0 8px 20px rgba(225, 0, 255, 0.3)",
          duration: 0.3,
          ease: "power3.out",
        });
      });
    }
  }, []);

  const addToSocialRefs = (el) => {
    if (el && !socialLinksRef.current.includes(el)) {
      socialLinksRef.current.push(el);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:vineeth2210369@ssn.edu.in?subject=${encodeURIComponent(
      subject || "Contact from Portfolio"
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitStatus(""), 3000);
    }, 1000);
  };

  return (
    <section className={styles.contact} ref={containerRef}>
      <div className={styles.backgroundPattern}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title} ref={titleRef}>
            Let's Create Together
          </h2>
          <p className={styles.subtitle} ref={subtitleRef}>
            Ready to bring your ideas to life? I'm just a message away from
            making it happen.
          </p>
        </div>

        <div className={styles.content}>
          {/* Contact Form */}
          <div className={styles.formSection} ref={formRef}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Send Me a Message</h3>
              <p className={styles.formSubtitle}>
                Tell me about your project and let's make it amazing
              </p>
            </div>

            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <FaUser className={styles.inputIcon} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject (Optional)"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  name="message"
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={styles.formTextarea}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`${styles.submitButton} ${
                  isSubmitting ? styles.submitting : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className={styles.spinner}></div>
                    Opening Email...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className={styles.successMessage}>
                  ✓ Email client opened! Your message is ready to send.
                </div>
              )}
            </form>
          </div>

          {/* Social Links */}
          <div className={styles.socialSection}>
            <h3 className={styles.socialTitle}>Connect With Me</h3>
            <div className={styles.socialLinks}>
              <a
                href="https://x.com/Vineeth0101"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
                ref={addToSocialRefs}
                title="Follow me on Twitter"
              >
                <FaTwitter />
                <span>Twitter</span>
              </a>
              <a
                href="https://www.linkedin.com/in/vineeth-ummadisetty-4933511a6/"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
                ref={addToSocialRefs}
                title="Connect on LinkedIn"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/vineeth33"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
                ref={addToSocialRefs}
                title="Check out my GitHub"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
            </div>

            <div className={styles.directContact}>
              <button
                className={styles.ctaButton}
                ref={ctaButtonRef}
                onClick={() =>
                  (window.location.href = "mailto:vineeth2210369@ssn.edu.in")
                }
              >
                <FaEnvelope />
                Email Me Directly
              </button>
            </div>
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
