import { useEffect, useRef, useState } from 'react';
import { Share, Users, Mic, Gamepad2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingDelay, setTypingDelay] = useState(100);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === text) {
        setTypingDelay(2000);
        setIsDeleting(true);
      } else if (isDeleting && displayText === "") {
        setTypingDelay(500);
        setIsDeleting(false);
      } else {
        setTypingDelay(isDeleting ? 50 : 100);
        setDisplayText(text.substring(0, displayText.length + (isDeleting ? -1 : 1)));
      }
    }, typingDelay);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, text, typingDelay]);

  return (
    <span className="inline-block border-r-2 border-[#dbfcff] pr-1 animate-blink-cursor min-w-[2px]">
      {displayText}
    </span>
  );
}

export default function App() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${-x * 30}px, ${-y * 30}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0f] text-[#e5e2e3] overflow-x-hidden font-body-md selection:bg-[#00f0ff] selection:text-[#006970] relative">
      {/* Background Atmospheric Orbs */}
      <div 
        ref={orb1Ref}
        className="fixed w-[400px] h-[400px] rounded-full blur-[80px] -z-10 opacity-15 pointer-events-none animate-pulse-orb bg-[#00dbe9] top-[-100px] left-[-100px]"
      ></div>
      <div 
        ref={orb2Ref}
        className="fixed w-[400px] h-[400px] rounded-full blur-[80px] -z-10 opacity-15 pointer-events-none animate-pulse-orb bg-[#cf5cff] bottom-[-100px] right-[-100px] [animation-delay:-5s]"
      ></div>

      {/* Top Navigation Bar */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 max-w-2xl mx-auto bg-transparent left-1/2 -translate-x-1/2"
      >
        <div className="text-xl font-bold text-[#dbfcff] font-display">Creator Link</div>
        <button className="text-[#dbfcff] p-2 hover:bg-white/10 backdrop-blur-md transition-all rounded-full active:scale-95 duration-200">
          <Share size={20} />
        </button>
      </motion.header>

      <main className="relative z-10 pt-24 pb-8 px-6 max-w-2xl mx-auto flex flex-col items-center">
        {/* Profile Section */}
        <motion.section 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex flex-col items-center gap-4 mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#dbfcff] to-[#ecb2ff] opacity-50 blur-md"></div>
            <img 
              className="w-32 h-32 rounded-full object-cover border-[3px] border-[#dbfcff] relative z-10" 
              alt="Creator Profile" 
              src="https://i.ibb.co.com/Xx6FKmdR/IMG-20260721-WA0004.jpg" 
              onError={(e) => {
                 (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Creator&background=0D8ABC&color=fff&size=128'
              }}
            />
          </div>
          <div className="text-center">
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#dbfcff] drop-shadow-[0_0_8px_rgba(219,252,255,0.5)] tracking-tight">
              RIPKI SUKA PISANG GORENG
            </h1>
            <p className="text-[#b9cacb] max-w-[80%] mx-auto mt-2 text-lg h-8">
              <TypewriterText text="haii saya menggunakan WhatsApp" />
            </p>
          </div>
        </motion.section>

        {/* Link Stack */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.15, delayChildren: 0.5 } 
            }
          }}
          className="w-full flex flex-col gap-4"
        >
          <LinkCard 
            href="https://chat.whatsapp.com/H1QQ10evvnUAFpi8mi2KS3"
            icon={<Users size={24} className="text-[#dbfcff]" />}
            title="Grup WhatsApp"
          />
          <LinkCard 
            href="https://whatsapp.com/channel/0029VaiFhoz8kyyM2SsR6A0l"
            icon={<Mic size={24} className="text-[#dbfcff]" />}
            title="Saluran WhatsApp"
          />
          <LinkCard 
            href="https://discord.gg/Ygs5zWMCr"
            icon={<Gamepad2 size={24} className="text-[#dbfcff]" />}
            title="Discord Server"
          />
        </motion.div>

        {/* Skills / Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full mt-8 flex flex-wrap justify-center gap-2"
        >
          <Tag color="primary">UI DESIGN</Tag>
          <Tag color="secondary">WEB3</Tag>
          <Tag color="primary">CONTENT</Tag>
          <Tag color="secondary">TECH</Tag>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="w-full py-8 flex flex-col items-center gap-4 bg-transparent relative z-10"
      >
        <div className="text-[12px] font-medium tracking-widest text-[#b9cacb] opacity-60">© 2024 DIGITAL CREATOR</div>
        <div className="flex gap-4">
          <a className="text-[12px] font-medium tracking-widest text-[#ecb2ff] hover:text-[#dbfcff] transition-colors" href="#">Privacy</a>
          <a className="text-[12px] font-medium tracking-widest text-[#ecb2ff] hover:text-[#dbfcff] transition-colors" href="#">Terms</a>
        </div>
      </motion.footer>
    </div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

function LinkCard({ href, icon, title }: { href: string; icon: React.ReactNode; title: string }) {
  return (
    <motion.a 
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -2, boxShadow: "0 0 20px rgba(0,219,233,0.15)" }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/5 backdrop-blur-[20px] border border-[#dbfcff]/10 p-5 rounded-xl flex items-center justify-between group transition-colors duration-300 hover:bg-white/10 hover:border-[#dbfcff]/40 block" 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center bg-[#201f20] rounded-lg border border-[#3b494b] group-hover:border-[#dbfcff] transition-colors">
          {icon}
        </div>
        <span className="text-xl font-semibold text-[#e5e2e3] font-display">{title}</span>
      </div>
      <div className="text-[#b9cacb] opacity-40 group-hover:opacity-100 transition-opacity">
        <ArrowRight size={24} />
      </div>
    </motion.a>
  );
}

function Tag({ children, color }: { children: React.ReactNode, color: 'primary' | 'secondary' }) {
  const textColor = color === 'primary' ? 'text-[#dbfcff]' : 'text-[#ecb2ff]';
  return (
    <span className={`px-3 py-1 bg-[#2a2a2b] border border-[#3b494b] rounded-full text-[12px] font-medium tracking-widest ${textColor}`}>
      {children}
    </span>
  );
}
