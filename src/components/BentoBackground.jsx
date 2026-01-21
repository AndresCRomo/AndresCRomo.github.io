
import { motion } from "framer-motion";

const images = [
"/src/assets/bento/1.jpeg",
"/src/assets/bento/2.jpeg",
"/src/assets/bento/3.jpeg",
"/src/assets/bento/4.jpeg",
"/src/assets/bento/5.jpeg",
];

export function BentoBackground() {
return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="grid grid-cols-4 grid-rows-4 gap-4 p-6 h-full w-full">
        {images.map((src, i) => (
        <motion.img
            key={i}
            src={src}
            className="h-full w-full object-cover rounded-3xl  "
            style={{
            gridColumn: i === 0 ? "span 2" : undefined,
            gridRow: i === 2 ? "span 2" : undefined,
            }}
            animate={{
            y: [0, 6, 0],
            }}
            transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            }}
            draggable={false}
        />
        ))}
    </div>

    {/* Overlay suave para lectura */}
    <div className="absolute inset-0 bg-neutral-100/80 backdrop-blur-sm" />
    </div>
);
}
