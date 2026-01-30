import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

const pages = [
"/src/assets/InvitacioinBoda_1.jpeg",
"/src/assets/InvitacioinBoda_2.png",
"/src/assets/InvitacioinBoda_3.jpeg",
"/src/assets/InvitacioinBoda_4.jpeg",
];

function PageSection({ src, index }) {
const ref = useRef(null);

const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
});

// parallax tipo demo
const y = useTransform(scrollYProgress, [0, 1], [-200, 200]);
const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

return (
    <section
    ref={ref}
    className="scroll-section flex justify-center items-center relative"
    >
    <motion.div style={{ y, scale, opacity }} className="relative">
        <img
        src={src}
        draggable={false}
        className="w-87.5 md:w-[40vw] max-w-md rounded-xl "
        />

    </motion.div>
    </section>
);
}

export function InvitationPages() {
    const { scrollY } = useScroll();
    const [hideHint, setHideHint] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 80) setHideHint(true);
    });

return (
    <div className="relative">
        {!hideHint && (
            <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [10, 0, 10] }}
            transition={{
                opacity: { duration: 0.6 },
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            }}
            className="
                sticky
                top-16
                md:top-20
                z-40
                text-center
                text-[#1F2A44]
                text-xl
                font-semibold
                md:text-2xl
                pointer-events-none
            "
            style={{ fontFamily: "'Great Vibes', cursive" }}
            >
            Descubre la invitación ↓
            </motion.p>
        )}
    {pages.map((src, i) => (
        <PageSection key={i} src={src} index={i} />
    ))}
    </div>
);
}
