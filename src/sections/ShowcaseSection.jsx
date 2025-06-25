import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const popwatch = useRef(null);
  const chatbot = useRef(null);
  const owlhunt = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [popwatch.current, chatbot.current, owlhunt.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: 'play none none reset'
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
      <TitleHeader
          title="Projects I've Built"
          sub="💻 Turning imagination into reality"
        />
        <div className="showcaselayout mt-15">
            {/* LEFT */}
          <div ref={popwatch} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/popwatch4.png" alt="popwatch" />
            </div>
            <div className="text-content">
              <h2>
                PopWatch - Movie Ticket Booking Website
              </h2>
              <p className="text-red-200 md:text-xl">
                PopWatch is an online platform for booking movie tickets with ease where you can explore the latest blockbusters and timeless classics, check showtimes, and book your favorite seats in just a few clicks.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={chatbot}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <img
                  src="/images/chatbot.png"
                  alt="Chatbot"
                />
              </div>
              <h2>Chat-Bot & Web Scraping for Daraz mobile products</h2>
            </div>

            <div className="project" ref={owlhunt}>
              <div className="image-wrapper bg-[#6892e0]">
                <img src="/images/owl2.png" alt="Owl"/>
              </div>
              <h2>Night Hunt (A duck shoot clone game)</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;