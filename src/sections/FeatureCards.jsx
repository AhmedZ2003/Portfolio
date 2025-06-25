import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { abilities } from '../constants';
import TitleHeader from '../components/TitleHeader';

gsap.registerPlugin(ScrollTrigger);

const FeatureCards = () => {
    const cardsRef = useRef([]);

    useEffect(() => {
        const animate = () => {
            cardsRef.current.forEach((card, i) => {
                if (!card) return;

                gsap.fromTo(
                    card,
                    { opacity: 0, y: 40, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.9,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                        delay: i * 0.15,
                    }
                );
            });
        };

        if ('requestIdleCallback' in window) {
            requestIdleCallback(animate);
        } else {
            setTimeout(animate, 200);
        }
    }, []);

    return (
        <div className="w-full padding-x-lg md:mt-20 mt-10">
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader
                    title="Built on Principles That Deliver"
                    sub="💎 Core values that shape every project."
                />
                <div className="mx-auto grid-3-cols mt-16 relative">
                    {abilities.map(({ imgPath, title, desc }, i) => (
                        <div
                            key={title}
                            ref={(el) => (cardsRef.current[i] = el)}
                            className="card-border rounded-xl p-8 flex flex-col gap-4"
                            style={{ willChange: 'transform, opacity' }}
                        >
                            <div className="size-14 flex items-center justify-center rounded-full">
                                <img
                                    src={imgPath}
                                    alt={title}
                                    width="56"
                                    height="56"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="text-white text-2xl font-semibold mt-2">
                                {title}
                            </h3>
                            <p className="text-red-200 text-lg">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureCards;