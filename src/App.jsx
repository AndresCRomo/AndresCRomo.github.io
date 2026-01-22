import { useState, useEffect } from "react";
import Envelope from "./components/Envelope";
import { motion } from "framer-motion";
import { BentoBackground } from "./components/BentoBackground";

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [envelopeY, setEnvelopeY] = useState(600);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const media = window.matchMedia("(max-width: 768px)");

    const handleResize = () => {
      setEnvelopeY(media.matches ? 500 : 600);
    };

    handleResize(); // 👈 inicial
    media.addEventListener("change", handleResize);

    return () => {
      document.body.style.overflow = "auto";
      media.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BentoBackground />

      <motion.div
        initial={{ y: 320, opacity: 0 }}
        animate={{ y: isOpened ? envelopeY : 300, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
        className={`flex justify-center items-center ${
          isOpened ? "pointer-events-none" : ""
        }`}
      >
        <Envelope onOpen={() => setIsOpened(true)} />
      </motion.div>
    </div>
  );
}

export default App;
