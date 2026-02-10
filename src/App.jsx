import { useState, useEffect, useRef } from "react";
import Envelope from "./components/Envelope";
import { InvitationPages } from "./components/InvitationPages";
import { motion, useScroll , } from "framer-motion";
import {Volume2,VolumeOff} from "lucide-react"
import music from "./assets/4seasons.flac"
import img3 from "./assets/bgimg3.jpeg";
import img1 from  "./assets/bgimg3p.jpeg"
import img2 from "./assets/bgimg2p.jpeg"
import img6 from "./assets/bgimg6.jpeg";
import img7 from "./assets/bgimg7.jpeg";
import img8 from "./assets/bgimg8.jpeg";
import img11 from "./assets/bgimg11.jpeg";
import img13 from "./assets/bgimg14.jpeg";


import papel1 from "./assets/papel-01.png"
import papel2 from "./assets/papel-02.png"
import papel3 from "./assets/papel-04.png"


function App() {
  const audioRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const playMusic = () => {
  if (!audioRef.current) return;
  audioRef.current.volume = 0.5;
  audioRef.current.play();
  setMusicPlaying(true);
};

const toggleMusic = () => {
  if (!audioRef.current) return;

  if (musicPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }

  setMusicPlaying(!musicPlaying);
};

  const [isOpened, setIsOpened] = useState(false);
  const { scrollYProgress } = useScroll();
  const [showPages, setShowPages] = useState(false);
  const pagesRef = useRef(null);
  const [showHint, setShowHint] = useState(false);
  const images=[
      img3,
      img6,
      img7,
      img8,
      img11,
      img13,
      papel1,
      papel2,
      papel3,
      "/src/assets/inv1.png",
      "/src/assets/inv2.png",
      "/src/assets/inv3.png",
      "/src/assets/porfahjdtpm.png",
      "/src/assets/Sello.png",
      "/src/assets/sobre_boda-01.png",
      "/src/assets/sobre_boda-02.png",
      "/src/assets/sobre_boda-03.jpeg"
  ]
  const [loading, setLoading] = useState(true);
  const preloadImages = (srcs) => {
    return Promise.all(
      srcs.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          })
      )
    );
  };
  useEffect(() => {
  preloadImages(images).then(() => {
    setLoading(false);
  });
  }, []);

  const handleOpen = () => {
    setIsOpened(true);
    setShowHint(false);
    playMusic();
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
    
    document.body.style.overflowY = isOpened ? "hidden" : "hidden";
    
  }, [isOpened]);
  
  if (loading) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-[#1F2A44] text-3xl font-fanttor"
      >
        Cargando invitación...
      </motion.div>
    </div>
  );
}
  return (
    
      <div className="relative min-h-screen transition-all ease-in-out bg-black overflow-hidden">
      <audio ref={audioRef} src={music} loop />
      {showPages && (
        <button
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 size-12 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center text-xl"
        >
          {musicPlaying ? <Volume2/> : <VolumeOff/>}
        </button>
      )}
      <div>
        <img className="absolute bg-cover  -top-40  grayscale pointer-events-none md:w-full md:-top-70 lg:hidden" src={img1} alt="" />
        <img className="absolute bg-cover contrast-125 top-100 grayscale pointer-events-none md:w-full md:top-120 lg:hidden" src={img2} alt="" />
        <img className="absolute bg-cover top-260 grayscale pointer-events-none md:w-full md:top-400 lg:top-500" src={img3} alt="" />
        <img className="absolute bg-cover top-395 grayscale pointer-events-none md:w-full md:top-620 lg:hidden" src={img6} alt="" />
        <img className="absolute bg-cover top-530 grayscale pointer-events-none md:w-full md:top-860 lg:block lg:top-0" src={img11} alt="" />
        <img className="absolute bg-cover top-700 grayscale pointer-events-none md:w-full md:hidden  lg:hidden" src={img13} alt="" />
        <img className="absolute bg-cover top-97  md:w-full md:top-100 lg:hidden drop-shadow-lg" src={papel1} alt="" />
        <img className="absolute bg-cover top-245 md:w-full md:top-370 lg:hidden drop-shadow-lg" src={papel2} alt="" />
        <img className="absolute bg-cover top-380 md:w-full md:top-610 drop-shadow-lg" src={papel3} alt="" />
        <img className="absolute bg-cover top-520 md:w-full md:top-840 lg:hidden drop-shadow-lg" src={papel1} alt="" />
        <img className="absolute bg-cover top-690 md:w-full md:hidden lg:hidden drop-shadow-lg" src={papel3} alt="" />

      </div>

      <div className=" z-20">
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[320px] h-[520px] bg-white/80 blur-[80px] rounded-full mt-40" />
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
            initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: [10, 0, 10] }}
                transition={{
                    opacity: { duration: 0.6 },
                    y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                }}
            className="text-[#ffffff] backdrop-blur-xl p-2 rounded-lg text-xl whitespace-nowrap  md:text-2xl font-bold mb-4 absolute top-50 md:top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none font-fanttor "
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
