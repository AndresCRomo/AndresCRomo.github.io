    import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence,
    } from "framer-motion";
    import { useState } from "react";

    const pages = [
    "/src/assets/page2.jpeg",
    "/src/assets/page.jpeg",
    "/src/assets/page3.jpeg",
    ];


    export function InvitationPages() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const advance = (dir) => {
        setDirection(dir);
        setIndex((i) => (i + 1) % pages.length);
    };

    return (
        <div className="relative md:h-160 md:w-[40vw] w-72 h-96  max-w-md">
        {/* STACK */}
        {pages.slice(1).map((_, i) => {
            const pageIndex = (index + 1 + i) % pages.length;
            return (
            <img
                key={pageIndex}
                src={pages[pageIndex]}
                className="absolute inset-0 h-full w-full  rounded-lg shadow-md pointer-events-none"
                style={{
                transform: `
                    translateY(${(i + 1) * 8}px)
                    rotate(${[-6, 4, -3][i % 3]}deg)
                    scale(${1 - (i + 1) * 0.035})
                `,
                }}
                draggable={false}
            />
            );
        })}

        <AnimatePresence>
            <Page
            key={index}
            src={pages[index]}
            direction={direction}
            onSwipe={advance}
            />
        </AnimatePresence>
        </div>
    );
}


    function Page({ src, onSwipe, direction }) {
        const x = useMotionValue(0);

        const rotate = useTransform(x, [-200, 200], [-10, 10]);
        const opacity = useTransform(x, [-200, 0, 200], [0.4, 1, 0.4]);

        const handleDragEnd = (_, info) => {
            if (Math.abs(info.offset.x) > 120) {
            x.set(0);
            onSwipe(info.offset.x > 0 ? 1 : -1);
            } else {
            x.set(0);
            }
        };

        return (
            <motion.img
            src={src}
            className="absolute inset-0 h-full w-full rounded-lg shadow-xl touch-none z-10"
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
                opacity: 0,
                x: direction * -200,
                rotate: direction * -8,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            draggable={false}
            />
        );
    }

