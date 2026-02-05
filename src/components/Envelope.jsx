import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import Sello from "../assets/Sello.png"
import { useRef, useLayoutEffect } from "react";
import sobreFlap2 from "../assets/porfahjdtpm.png"
import sobreFront from "../assets/sobre_boda-02.png"
import sobreFlap from "../assets/sobre_boda-01.png"
import sobreBack from "../assets/sobre_boda-03.jpeg"

export default function Envelope({
    color = "#F5F1EB",
    texture,
    onOpen
}) {
    const openEnvelope = () => {
    if (isOpened) return;

    if (navigator.vibrate) {
        navigator.vibrate([20, 10, 20]);
    }

    setIsOpened(true);
    onOpen?.();
    };

    const backgroundStyle = texture
        ? {
            backgroundImage: `url(${texture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }
        : {
            backgroundColor: color,
        };
    // 🔹 progreso del sello
    const x = useMotionValue(0);
    const [isOpened, setIsOpened] = useState(false);

    const containerRef = useRef(null);
    const [cutThreshold, setCutThreshold] = useState(0);

    useLayoutEffect(() => {
        if (containerRef.current) {
            setCutThreshold(containerRef.current.offsetWidth * 0.25);
        }
        }, []);
    return (
        <div 
        ref={containerRef}
        onClick={openEnvelope}
        className="relative w-[90vw] max-w-180 aspect-12/7" style={{ perspective: 1000 }}>
        {/* Envelope */}
        <div
            className="absolute inset-0 rounded-lg shadow-lg overflow-hidden" 
        >
            <img src={sobreBack} alt="Sobre Back" />
        </div>
            
            

            

            <div
            className="absolute  drop-shadow-4xl z-30  left-1/2 -translate-x-1/2
            -translate-y-1/2 w-[90vw] max-w-180 aspect-12/7  top-1/2   rounded-lg "
            >
                <img className="w-full h-full object-fit" src={sobreFront} alt="Sobre Front" />
            </div>
            

        {/* Flap  */}
        <motion.div
            className="absolute top-0  drop-shadow-4xl z-40 left-0 w-full h-full origin-top rounded-lg"
            animate={{ 
                rotateX: isOpened ? -160 : 0,
                translateY: isOpened ? 3 : 0,
                backgroundImage: isOpened ? `url(${sobreFlap2})` : `url(${sobreFlap})`,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{
                
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundSize: "105% 100%",
                backgroundPosition: "center top",
                
            }}
        />

        

        {!isOpened &&(
        <motion.div
            onClick={(e) => {
            e.stopPropagation(); // 👈 evita doble trigger
            openEnvelope();
            }}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="
            absolute left-1/2 -translate-x-1/2
            top-1/3 md:top-1/2
            z-40 cursor-pointer
            "
        >
            <div className="size-20 flex justify-center items-center rounded-full shadow-sm">
            <img draggable={false} src={Sello} alt="Sello" />
            </div>
        </motion.div>
        )}


        </div>
    );
}
