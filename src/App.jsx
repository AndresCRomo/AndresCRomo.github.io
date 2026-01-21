import { useState, useEffect } from 'react'
import Envelope from './components/Envelope';
import { motion } from 'framer-motion';
import './App.css'
import { InvitationPages } from './components/InvitationPages';
import { BentoBackground } from './components/BentoBackground';
function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="min-h-screen bg-linear-to-b from-[#313b53] to-[#9da9c6e6] relative overflow-hidden ">
      {/* CONTENIDO */}

      <BentoBackground/>
      {isOpened && (
        <motion.div
          initial={{ opacity: 0, y: 200, scale: 0.2 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
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
      <motion.div
        initial={{ y: 320, opacity: 0 }}
        animate={{ y: isOpened ? 500 : 300, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
        className={
          isOpened
            ? "pointer-events-none flex justify-center items-center"
            : " flex justify-center items-center"
        }
      >
        <Envelope onOpen={() => setIsOpened(true)} />
      </motion.div>
    </div>
  );
}

export default App
