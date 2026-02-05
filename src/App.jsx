import { useState, useEffect, useRef } from "react";
import Envelope from "./components/Envelope";
import { InvitationPages } from "./components/InvitationPages";
import { motion, useScroll , useMotionValueEvent} from "framer-motion";

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const { scrollYProgress } = useScroll();
  const [showPages, setShowPages] = useState(false);
  const pagesRef = useRef(null);
  const [showHint, setShowHint] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
    setShowHint(false);
    setTimeout(() => {
      setShowPages(true);
    }, 900); // solo espera al sobre
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpened) setShowHint(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpened]);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = isOpened ? "auto" : "hidden";

    
  }, [isOpened]);

  return (
    <div className="relative min-h-screen transition-all ease-in-out bg-[radial-gradient(circle_at_top,#eaf1ff_0%,#b7cdf2_45%,#8eade9_100%)]">
      <div className=" z-10">
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[320px] h-[520px] bg-white/40 blur-[80px] rounded-full mt-40" />
        </div>
        {/* PÁGINAS */}
        {showPages && (
          <motion.div
            ref={pagesRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <InvitationPages />
          </motion.div>
        )}

        {/* HINT */}
        {showHint && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[#1F2A44] text-lg whitespace-nowrap  md:text-2xl font-semibold mb-4 absolute top-56 left-1/2 -translate-x-1/2 z-50 pointer-events-none font-fanttor "
          >
            Toca el sobre para abrir
          </motion.p>
        )}

        {/* SOBRE */}
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ scale: isOpened ? "180%" : "100%", opacity: isOpened ? 0 : 1,  }}
          transition={{ duration: 1.5, ease: "easeInOut", }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            isOpened ? "pointer-events-none" : ""
          }`}
        >
          <Envelope onOpen={handleOpen} />
        </motion.div>

        {/* Barra de progreso */}
        {showPages && (
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="fixed left-1/2 -translate-x-1/2 right-0 bottom-10 h-1 bg-[#1F2A44] origin-left z-50 md:max-w-3xl max-w-4xs mx-auto rounded-full"
          />
        )}
      </div>
    </div>
  );
}

export default App;
