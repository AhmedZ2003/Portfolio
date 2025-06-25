import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import TitleHeader from '../components/TitleHeader';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      // Reset form and stop loading
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error); // Optional: show toast
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  };

  useGSAP(() => {
        const isMobile = window.innerWidth <= 768; // 🌟 Detect mobile inside GSAP
        const triggerStart = isMobile ? 'top 90%' : 'top 80%'; // Adjust trigger start point

        // Animate the form
        gsap.from('.contact-form', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: '.contact-form',
                start: triggerStart,
                toggleActions: 'play none none reset', // re-animate every time
            },
        });

        // Animate the image
        gsap.from('.contact-image', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: '.contact-image',
                start: triggerStart,
                toggleActions: 'play none none reset',
            },
        });

    }, []);

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10 h-full contact-form">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7">
            <div className="w-full h-full rounded-xl overflow-hidden contact-image">
              {/* <img src="/images/codingboy.jpeg" alt="contact" className="w-180"/> */}
            <img src="images/codingboy.png" alt="Hero Image of Me" className="heroImg w-full max-w-full h-auto object-contain"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;