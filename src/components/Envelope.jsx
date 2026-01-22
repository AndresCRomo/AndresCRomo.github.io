import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import Sello from "../assets/Sello.png"
import { useRef, useLayoutEffect } from "react";
import { InvitationPages } from "./InvitationPages";


export default function Envelope({
    color = "#F5F1EB",
    texture,
    onOpen
}) {
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
        className="relative w-[90vw] max-w-180 aspect-12/7" style={{ perspective: 1000 }}>
        {/* Envelope */}
        <div
            className="absolute bg-[#1F2A44] inset-0 rounded-lg shadow-lg overflow-hidden"
            
        />
            <div
            className="absolute bg-[#1F2A44] drop-shadow-4xl z-30  left-1/2 -translate-x-1/2
            -translate-y-1/2 w-[90vw] max-w-180 aspect-12/7  top-1/2   rounded-lg "
            style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 50%)" }}
        ></div>
        {isOpened && (
            <motion.div
            initial={{ opacity: 0, y: -70, scale:0.5 }}
            animate={{ opacity: 1, y:  -300 , scale:1,}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className=" 
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            z-20
            pointer-events-auto
            "
            >
            <InvitationPages />
            </motion.div>
        )}

        {/* Flap  */}
        <motion.div
            className="absolute top-0 bg-[#1F2A44] drop-shadow-4xl z-10 left-0 w-full h-1/2 origin-top rounded-lg"
            animate={{ 
                rotateX: isOpened ? -160 : 0,
                translateY: isOpened ? 3 : 0,
                backgroundColor: isOpened ? "#A7B9C8" : "#1F2A44E6",
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                
            }}
        />

        <div className="absolute top-0 bg-[#A7B9C8]  z-0 left-0 w-full h-1/2 origin-top rounded-lg"
            style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
            >

        </div>

        {!isOpened &&(
            <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: cutThreshold }}
            dragElastic={0}
            style={{ x }}
            onDragEnd={(e, info) => {
            if (info.offset.x >= cutThreshold) {
                if (navigator.vibrate) {
                navigator.vibrate([20, 10, 20]);
                }
                setIsOpened(true);
                onOpen?.()
            } else {
                x.set(0); // 👈 vuelve a su lugar
            }
            }}
            animate={
                isOpened
                ? { scale: 0, rotate: 20, opacity: 0 }
                : { scale: 1, rotate: 0, opacity: 1 }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 top-1/3 md:top-2/5 cursor-grab active:cursor-grabbing z-40 touch-none"
            >
                <div className="size-20 border-2 border-[#93c5fd] flex justify-center items-center rounded-full border-dashed shadow-sm ">
                    <img draggable={false} src={Sello} alt="Sello" />
                </div>
            </motion.div>
        )}


        </div>
    );
}
