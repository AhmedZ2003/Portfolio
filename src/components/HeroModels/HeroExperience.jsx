import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { Room } from './Room';
import HeroLights from './HeroLights';
import Particles from './Particles';
import { Suspense, useEffect, useRef, useState } from 'react';

// 🔁 Oscillating room component (safe useFrame usage)
const OscillatingRoom = ({ isMobile }) => {
    const groupRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        const baseRotation = -Math.PI / 4;
        const amplitude = Math.PI / 6;
        if (groupRef.current) {
            groupRef.current.rotation.y =
                baseRotation + Math.sin(t * 0.25) * amplitude;
        }
    });

    return (
        <group
            ref={groupRef}
            scale={isMobile ? 0.7 : 1}
            position={[0, -3.5, 0]}
        >
            <Room />
        </group>
    );
};

const HeroExperience = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const controlsRef = useRef();
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        let scrollTimeout;

        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (controlsRef.current) {
            controlsRef.current.enableRotate = !isScrolling;
            controlsRef.current.enableZoom = false;
            controlsRef.current.enablePan = false;
        }
    }, [isScrolling, isTablet]);

    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }} eventPrefix="client">
            <ambientLight intensity={0.2} color="#1a1a40" />
            <Suspense fallback={null}>
                <HeroLights />
                <Particles count={100} />
                <OscillatingRoom isMobile={isMobile} />
            </Suspense>

            <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableZoom={false}
                maxDistance={20}
                minDistance={5}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
                enableDamping
                dampingFactor={0.05}
                makeDefault
            />
        </Canvas>
    );
};

export default HeroExperience;