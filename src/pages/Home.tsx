import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, ChevronLeft, ChevronDown, Shield, Swords, 
  Target, Flame, MapPin, Phone, Mail, Instagram, Facebook, Menu as MenuIcon, MessageCircle, Brain
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQS = [
  {
    question: "Non ho mai fatto sport da combattimento devo per forza aver fatto qualcosa prima di iniziare il corso?",
    answer: "No, non devi avere per forza un background, le MMA sono una disciplia a se, da noi cominci da zero."
  },
  {
    question: "Quali sono gli orari degli allenamenti e dei corsi?",
    answer: "Tutti i nostri corsi si tengono presso la struttura Freedom ad Avellino. Per i dettagli completi su giorni e fasce orarie dei vari corsi (MMA, Grappling, Striking) puoi consultare la sezione 'Orari' del sito."
  },
  {
    question: "Cosa devo portare per il primo allenamento di prova?",
    answer: "Per iniziare è sufficiente un abbigliamento sportivo comodo (pantaloncini senza cerniere o parti metalliche e maglietta), un asciugamano e dell'acqua. Ci si allena rigorosamente scalzi sul tatami. Se possiedi già dei guantoni portali pure."
  },
  {
    question: "C'è un limite di età per partecipare ai corsi?",
    answer: "I corsi sono rivolti principalmente a ragazzi e adulti in grado di sostenere un allenamento fisico impegnativo. Non c'è un limite d'età massimo, ma è richiesta una buona condizione di salute generale e la voglia di mettersi in gioco."
  }
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    contatto: '',
    livello: 'Principiante assoluto'
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Richiesta Lezione di Prova - ${formData.nome}`);
    const body = encodeURIComponent(`Nome: ${formData.nome}\nContatto: ${formData.contatto}\nLivello: ${formData.livello}\n\nVorrei prenotare una lezione di prova gratuita e ricevere maggiori informazioni.`);
    window.location.href = `mailto:info@lamanoneramma.it?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-red-600 selection:text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#050505]/95 backdrop-blur-md border-b border-zinc-800/50 py-4 shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-8 lg:gap-12">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              {/* Custom Logo Replacement: The uploaded logo */}
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 logo-hover-effect">
                <img src="/logo.jpg" alt="La Mano Nera Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl tracking-widest uppercase leading-none">La Mano Nera</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-red-500 font-bold mt-1">MMA \ Avellino</span>
              </div>
            </div>

            {/* NEW: Quick navigation items next to logo */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              <button onClick={() => scrollTo('storia')} className="hover:text-white transition-colors hover:-translate-y-0.5 transform">Storia</button>
              <button onClick={() => scrollTo('discipline')} className="hover:text-white transition-colors hover:-translate-y-0.5 transform">Discipline</button>
              <button onClick={() => scrollTo('orari')} className="hover:text-white transition-colors hover:-translate-y-0.5 transform">Orari</button>
              <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors hover:-translate-y-0.5 transform">FAQ</button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            <button onClick={() => scrollTo('contatti')} className="bg-red-600 text-white px-5 py-2.5 rounded hover:bg-red-700 transition-colors transform hover:scale-105 shadow-[0_0_15px_rgba(220,38,38,0.4)] mr-2">
              Prenota Lezione Gratuita
            </button>
            <div className="flex items-center gap-4 border-l border-zinc-800 pl-6">
              <a href="https://www.instagram.com/explore/locations/405756886279608/la-mano-nera-mma-avellino/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors"><Instagram size={18} /></a>
              <a href="https://www.facebook.com/LaManoNeraMMA/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors"><Facebook size={18} /></a>
              <a href="https://www.tiktok.com/@lamanoneramma" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
              </a>
            </div>
          </div>

          <button 
            className="lg:hidden text-zinc-100 hover:text-red-500 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#050505]/60 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 left-4 right-4 bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-end mb-6">
                <button onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white p-2 bg-zinc-900 rounded-full">
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={() => scrollTo('storia')} className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-sm font-bold uppercase tracking-wider transition-colors border border-zinc-800 text-center">Storia</button>
                <button onClick={() => scrollTo('discipline')} className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-sm font-bold uppercase tracking-wider transition-colors border border-zinc-800 text-center">Discipline</button>
                <button onClick={() => scrollTo('orari')} className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-sm font-bold uppercase tracking-wider transition-colors border border-zinc-800 text-center">Orari</button>
                <button onClick={() => scrollTo('faq')} className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-sm font-bold uppercase tracking-wider transition-colors border border-zinc-800 text-center">FAQ</button>
                <button onClick={() => scrollTo('contatti')} className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold uppercase tracking-wider transition-colors shadow-lg shadow-red-600/20 text-center mt-2">Prenota Lezione Gratuita</button>
              </div>
              
              <div className="flex gap-4 mt-6 justify-center">
                <a href="https://www.instagram.com/explore/locations/405756886279608/la-mano-nera-mma-avellino/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-500 transition-colors bg-zinc-900 p-3 rounded-full"><Instagram size={20} /></a>
                <a href="https://www.facebook.com/LaManoNeraMMA/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-500 transition-colors bg-zinc-900 p-3 rounded-full"><Facebook size={20} /></a>
                <a href="https://www.tiktok.com/@lamanoneramma" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-500 transition-colors bg-zinc-900 p-3 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" fill="currentColor">
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Gradients/Images */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#110505] to-[#050505] z-0"></div>
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('/homepage.png')] bg-cover bg-center bg-no-repeat mix-blend-luminosity z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent z-0"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-5xl mx-auto flex flex-col items-center text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center overflow-hidden mb-8 shadow-[0_0_50px_rgba(255,255,255,0.15)] logo-hover-effect"
            >
              <img src="/logo.jpg" alt="La Mano Nera Logo" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-zinc-800 text-red-500 text-xs md:text-sm font-bold uppercase tracking-widest mb-6 shadow-xl"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Avellino
            </motion.div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.1] uppercase tracking-tighter mb-8 text-white drop-shadow-2xl">
              M.M.A. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-white">Arti Marziali Miste</span> <br/>
            </h1>
            
            <p className="text-lg md:text-2xl text-zinc-300 mb-10 max-w-2xl leading-relaxed font-light">
              L'apice delle Arti Marziali Miste ad Avellino. 
              Cultura della mente e forza del corpo. Forgia la tua tecnica, eleva la tua performance sportiva sul tatami.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <button 
                onClick={() => scrollTo('contatti')}
                className="group relative px-8 py-5 bg-red-600 text-white font-bold uppercase tracking-widest overflow-hidden shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-shadow duration-300"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out skew-x-12"></div>
                <div className="relative flex items-center justify-center gap-3">
                  Inizia ora <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </button>
              <button 
                onClick={() => scrollTo('discipline')}
                className="px-8 py-5 bg-transparent border border-zinc-700 text-white font-bold uppercase tracking-widest hover:bg-zinc-900 hover:border-zinc-500 transition-all duration-300"
              >
                Scopri la via
              </button>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center gap-6"
            >
              <a href="https://www.instagram.com/explore/locations/405756886279608/la-mano-nera-mma-avellino/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 transform hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                <Instagram size={24} />
              </a>
              <a href="https://www.facebook.com/LaManoNeraMMA/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 transform hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                <Facebook size={24} />
              </a>
              <a href="https://www.tiktok.com/@lamanoneramma" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 transform hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <motion.section 
        id="storia" 
        className="py-32 md:py-48 relative bg-[#050505] overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-[url('/gruppo1.png')] bg-cover bg-center bg-no-repeat opacity-20 filter grayscale mix-blend-luminosity z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-0"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div variants={fadeInUp} className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-red-600"></div>
              <span className="uppercase tracking-widest text-red-500 font-bold text-sm">Le Origini</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-wider mb-8 text-white leading-none">
              Mente <br/>
              <span className="text-zinc-500">e Corpo</span>
            </h2>
            <div className="space-y-6 text-lg text-zinc-300 font-light leading-relaxed border-l border-red-600/50 pl-6 backdrop-blur-sm bg-black/20 p-6 rounded-r-2xl">
              <p>
                <strong className="text-white font-medium">La Mano Nera MMA</strong> nasce con una visione chiara: concepire il combattimento non come semplice istinto, ma come massima espressione della <strong className="text-white font-medium">performance sportiva</strong>.
              </p>
              <p>
                Nel nostro Dojo promuoviamo la cultura della mente e del corpo. Il combattente moderno è un atleta completo, dove preparazione atletica, lucidità mentale e tecnica impeccabile si fondono in un'unica entità inarrestabile.
              </p>
              <p>
                Allenati con metodo. Supera i tuoi limiti fisici e forgiati mentalmente. Ad Avellino, portiamo le MMA ad un livello superiore di eccellenza.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Disciplines Section */}
      <motion.section 
        id="discipline" 
        className="py-24 md:py-40 relative bg-[#050505] overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-[url('/mentecorpo.png')] bg-cover bg-center bg-no-repeat opacity-20 filter grayscale mix-blend-luminosity z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-[#050505] z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent z-0"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[2px] bg-red-600"></div>
                <span className="uppercase tracking-widest text-red-500 font-bold text-sm">Le Armi</span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl uppercase tracking-wider mb-6 text-white">I Pilastri<br/>Delle Performance</h2>
              <p className="text-zinc-400 max-w-xl text-lg font-light leading-relaxed">
                La nostra metodologia unisce Tecnica, Potenza e Filosofia. Partiamo dal concetto che la mente dell'atleta è fondamentale: un fighter completo è fatto da questi tre elementi in perfetto equilibrio (3/3).
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 w-full mx-auto">
            {[
              {
                title: 'Tecnica (MMA)',
                desc: 'L\'arte suprema. Integrazione totale di striking, clinch e lotta a terra. Riflessi affilati per leggere e dominare l\'avversario in ogni distanza. Il corpo agisce d\'istinto.',
                icon: <Swords size={48} strokeWidth={1.5} />,
                onClick: () => navigate('/tecnica'),
              },
              {
                title: 'Potenza (S&C)',
                desc: 'Pesistica mirata e performance atletica. Costruisci la potenza esplosiva, la resistenza e la corazza muscolare necessarie per superare i lunghi ritmi del combattimento.',
                icon: <Target size={48} strokeWidth={1.5} />,
                onClick: () => navigate('/potenza'),
              },
              {
                title: 'Filosofia e Mente',
                desc: 'L\'arma che non si vede. Costruiamo disciplina e resilienza mentale incrollabile. Un atleta padrone della propria mente affronta la stanchezza non come un ostacolo, ma come un\'opportunità.',
                icon: <Brain size={48} strokeWidth={1.5} />,
                onClick: () => navigate('/filosofia'),
              }
            ].map((d, i) => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }
                }}
                onClick={d.onClick}
                className={`bg-[#0a0a0a] p-10 border border-zinc-800 hover:border-red-600/80 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all duration-500 group flex flex-col h-full relative overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02] ${d.onClick ? 'cursor-pointer' : ''}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl group-hover:bg-red-600/20 transition-colors duration-500"></div>
                <div className="w-16 h-16 bg-black border border-zinc-800 flex items-center justify-center text-red-500 mb-8 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all duration-300 -skew-x-12">
                  <div className="skew-x-12">{d.icon}</div>
                </div>
                <h3 className="font-display text-3xl uppercase tracking-wider mb-4 text-white group-hover:text-red-500 transition-colors">{d.title}</h3>
                <p className="text-zinc-400 font-light leading-relaxed flex-grow">{d.desc}</p>
                
                {d.onClick && (
                  <div className="mt-8 flex items-center text-sm uppercase tracking-widest font-bold text-zinc-500 group-hover:text-red-500 transition-colors">
                    <span className="transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">Scopri</span>
                    <ChevronRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 delay-75" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Schedule Section */}
      <motion.section 
        id="orari" 
        className="py-24 md:py-40 border-t border-zinc-900 bg-[#050505] relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-[url('/sfondoorari.png')] bg-cover bg-center bg-no-repeat opacity-20 filter grayscale mix-blend-luminosity z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-[#050505] z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent z-0"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-red-600"></div>
              <span className="uppercase tracking-widest text-red-500 font-bold text-sm">Disciplina</span>
              <div className="w-8 h-[2px] bg-red-600"></div>
            </div>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-wider mb-6 text-white">Orari Corsi</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light">
              Costanza e programmazione. I nostri allenamenti sono strutturati per ottimizzare il recupero e le prestazioni degli atleti.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-black to-zinc-950 border border-zinc-800 p-8 md:p-14 shadow-2xl rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/sfondoorari.png')] bg-cover bg-center bg-no-repeat opacity-10 filter grayscale mix-blend-luminosity z-0"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
                <div className="flex flex-col gap-8 text-center">
                  <div>
                    <h3 className="font-display text-4xl text-white uppercase tracking-wider mb-2">Martedì</h3>
                    <p className="text-red-500 font-bold tracking-widest uppercase mb-4">MMA & Preparazione</p>
                    <div className="inline-block border border-zinc-700 bg-zinc-900/50 px-6 py-3 rounded-xl text-3xl font-display text-white shadow-inner">
                      20:30 <span className="text-zinc-500 mx-2">-</span> 22:00
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-8 text-center relative">
                  <div className="hidden lg:block absolute top-0 bottom-0 left-0 -ml-6 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-transparent"></div>
                  <div className="hidden lg:block absolute top-0 bottom-0 right-0 -mr-6 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-transparent"></div>
                  <div>
                    <h3 className="font-display text-4xl text-white uppercase tracking-wider mb-2">Giovedì</h3>
                    <p className="text-red-500 font-bold tracking-widest uppercase mb-4">MMA & Sparring</p>
                    <div className="inline-block border border-zinc-700 bg-zinc-900/50 px-6 py-3 rounded-xl text-3xl font-display text-white shadow-inner">
                      20:30 <span className="text-zinc-500 mx-2">-</span> 22:00
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-8 text-center">
                  <div>
                    <h3 className="font-display text-4xl text-white uppercase tracking-wider mb-2">Sabato</h3>
                    <p className="text-red-500 font-bold tracking-widest uppercase mb-4">Open Mat</p>
                    <div className="inline-block border border-zinc-700 bg-zinc-900/50 px-6 py-3 rounded-xl text-3xl font-display text-white shadow-inner">
                      17:00 <span className="text-zinc-500 mx-2">-</span> 19:00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA / Contact Section */}
      <motion.section 
        id="contatti" 
        className="py-32 bg-red-600 text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599058917212-97d23f698c1e?q=80&w=2669&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat mix-blend-overlay opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div variants={fadeInUp} className="w-full lg:w-5/12 text-center lg:text-left">
            <h2 className="font-display text-6xl md:text-8xl uppercase mb-8 leading-[0.9] text-white">Prenota La <br/>Prova.</h2>
            <p className="text-xl text-red-100 font-light max-w-lg mx-auto lg:mx-0 mb-10">
              Il primo passo e il più difficile. Smetti di rimandare. Compila il modulo e vieni a sudare sul tatami.
            </p>

            <div className="flex flex-col gap-6 text-sm text-red-100 hidden lg:flex">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-red-400 rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <p className="font-light">Presso Freedom Avellino<br/>83100 Avellino (AV)</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-red-400 rounded-full flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <p className="font-light">+39 333 123 4567</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-red-400 rounded-full flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <p className="font-light">info@lamanoneramma.it</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="w-full lg:w-6/12 relative">
            <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 z-0"></div>
            <div className="relative z-10 bg-[#0a0a0a] p-10 md:p-14 border border-zinc-800">
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3">Nome e Cognome</label>
                  <input type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required className="w-full bg-zinc-900 border border-zinc-800 text-white px-5 py-4 focus:outline-none focus:border-red-500 transition-colors" placeholder="Il tuo nome" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3">Email o Telefono</label>
                  <input type="text" value={formData.contatto} onChange={(e) => setFormData({...formData, contatto: e.target.value})} required className="w-full bg-zinc-900 border border-zinc-800 text-white px-5 py-4 focus:outline-none focus:border-red-500 transition-colors" placeholder="I tuoi recapiti" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3">Livello Esperienza</label>
                  <select value={formData.livello} onChange={(e) => setFormData({...formData, livello: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 text-white px-5 py-4 focus:outline-none focus:border-red-500 transition-colors appearance-none cursor-pointer">
                    <option value="Principiante assoluto">Principiante assoluto</option>
                    <option value="Base di altri sport da combattimento">Base di altri sport da combattimento</option>
                    <option value="Atleta amatore (MMA/BJJ)">Atleta amatore (MMA/BJJ)</option>
                    <option value="Agonista">Agonista</option>
                  </select>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <button type="submit" className="group flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest py-5 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]">
                    <span>Prenota Lezione Gratuita</span>
                    <ChevronRight size={20} className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  </button>
                  <a href="https://wa.me/393491886101?text=INFO" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-transparent border-2 border-green-600/50 text-green-500 hover:bg-green-600 hover:text-white hover:border-green-600 font-bold uppercase tracking-widest py-4 transition-all duration-300">
                    <MessageCircle size={20} />
                    <span>Info WhatsApp</span>
                  </a>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Social Media Section */}
      <motion.section 
        className="py-20 md:py-32 bg-[#050505] relative border-t border-zinc-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div variants={fadeInUp}>
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-red-600"></div>
              <span className="uppercase tracking-widest text-red-500 font-bold text-sm">Community</span>
              <div className="w-8 h-[2px] bg-red-600"></div>
            </div>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-wider mb-8 text-white">Seguici sui <span className="text-red-500">Social</span></h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed mb-16">
              Unisciti alla nostra community. Scopri le tecniche, guarda gli allenamenti e resta aggiornato sui prossimi eventi e match della Mano Nera.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <a href="https://www.instagram.com/explore/locations/405756886279608/la-mano-nera-mma-avellino/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300 transform group-hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                  <Instagram size={36} className="md:w-10 md:h-10" />
                </div>
                <span className="text-zinc-500 uppercase tracking-widest text-xs md:text-sm font-bold group-hover:text-white transition-colors duration-300">Instagram</span>
              </a>
              
              <a href="https://www.facebook.com/LaManoNeraMMA/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300 transform group-hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                  <Facebook size={36} className="md:w-10 md:h-10" />
                </div>
                <span className="text-zinc-500 uppercase tracking-widest text-xs md:text-sm font-bold group-hover:text-white transition-colors duration-300">Facebook</span>
              </a>
              
              <a href="https://www.tiktok.com/@lamanoneramma" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300 transform group-hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" className="md:w-10 md:h-10" viewBox="0 0 448 512" fill="currentColor">
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                  </svg>
                </div>
                <span className="text-zinc-500 uppercase tracking-widest text-xs md:text-sm font-bold group-hover:text-white transition-colors duration-300">TikTok</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Dove Siamo */}
      <motion.section 
        id="dove-siamo" 
        className="py-24 md:py-32 bg-[#0a0a0a] relative border-t border-zinc-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-center">
          <motion.div variants={fadeInUp} className="w-full lg:w-1/3">
            <div className="text-sm font-bold tracking-widest uppercase text-red-500 mb-6 text-center lg:text-left">Ci trovi</div>
            <div className="mx-auto lg:mx-0 mb-8 w-64 max-w-full bg-white p-6 rounded-xl flex items-center justify-center overflow-hidden border-2 border-red-600/30 shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all duration-500 group hover:border-red-500 hover:shadow-[0_0_50px_rgba(220,38,38,0.5)] cursor-pointer">
              <img src="/freedom.jpg" alt="Freedom Avellino Logo" className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" />
            </div>
            <h2 className="font-display text-5xl md:text-6xl uppercase tracking-wider mb-6 text-white text-center lg:text-left">Presso <br/><span className="text-red-600">Freedom Avellino</span></h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10 text-center lg:text-left">
              Sul tatami siamo tutti uguali. C'è solo il duro lavoro, il rispetto e il sudore. La gabbia e il tatami ti aspettano.
            </p>
            <div className="flex justify-center lg:justify-start">
              <a 
                href="https://www.google.com/maps/dir//La+Mano+Nera+-+M.M.A.,+83100+Avellino+AV/@41.1945243,15.0440525,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x133bcd7e7bc4c78f:0x62fa70e832eb89c2!2m2!1d14.7948461!2d40.9173252?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-5 uppercase tracking-widest text-sm font-bold transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transform hover:-translate-y-1"
              >
                <MapPin size={20} /> Ottieni Indicazioni
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="w-full lg:w-2/3 h-[450px] border border-zinc-800 relative z-10 p-2 bg-[#050505]">
             <iframe 
                src="https://maps.google.com/maps?q=La+Mano+Nera+Avellino&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              ></iframe>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        id="faq" 
        className="py-24 md:py-32 relative bg-[#050505] border-t border-zinc-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-wider mb-6 text-white">Domande<br/>Frequenti</h2>
            <p className="text-zinc-400 text-lg font-light max-w-2xl mx-auto">
              Tutto quello che devi sapere prima di salire sul tatami con noi.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className="border border-zinc-800 bg-[#0a0a0a] rounded-xl overflow-hidden transition-colors duration-300 hover:border-zinc-700"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg text-white font-medium pr-8">{faq.question}</span>
                  <div className={`shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-red-500' : 'text-zinc-500'}`}>
                    <ChevronDown size={24} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-zinc-400 font-light leading-relaxed border-t border-zinc-800/80 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#050505] py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-zinc-400">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 logo-hover-effect">
                <img src="/logo.jpg" alt="La Mano Nera Logo" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <span className="font-display text-2xl tracking-widest uppercase text-white group-hover:text-red-400 transition-colors duration-300">La Mano Nera</span>
            </div>
            <p className="text-sm font-light leading-relaxed mb-8 max-w-sm">
              Il centro per le Arti Marziali Miste ad Avellino. Sviluppiamo atleti, forgiamo caratteri. Dedizione, disciplina e rispetto.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/explore/locations/405756886279608/la-mano-nera-mma-avellino/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:text-white hover:bg-red-600 transition-colors bg-zinc-900 w-12 h-12 rounded-full"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/LaManoNeraMMA/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:text-white hover:bg-red-600 transition-colors bg-zinc-900 w-12 h-12 rounded-full"><Facebook size={20} /></a>
              <a href="https://www.tiktok.com/@lamanoneramma" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:text-white hover:bg-red-600 transition-colors bg-zinc-900 w-12 h-12 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display uppercase tracking-widest text-lg mb-8">Esplora</h4>
            <div className="flex flex-col gap-4 text-sm font-light">
              <button onClick={() => scrollTo('storia')} className="text-left hover:text-red-500 transition-colors">La Storia</button>
              <button onClick={() => scrollTo('discipline')} className="text-left hover:text-red-500 transition-colors">Le Discipline</button>
              <button onClick={() => scrollTo('orari')} className="text-left hover:text-red-500 transition-colors">Orari Corsi</button>
              <button onClick={() => scrollTo('dove-siamo')} className="text-left hover:text-red-500 transition-colors">Dove Siamo</button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display uppercase tracking-widest text-lg mb-8">Orari Dojo</h4>
            <ul className="flex flex-col gap-3 text-sm font-light">
              <li className="flex justify-between border-b border-zinc-800/50 pb-3">
                <span>Martedì</span>
                <span className="text-white font-medium">20:30 - 22:00</span>
              </li>
              <li className="flex justify-between border-b border-zinc-800/50 pb-3">
                <span>Giovedì</span>
                <span className="text-white font-medium">20:30 - 22:00</span>
              </li>
              <li className="flex justify-between border-b border-zinc-800/50 pb-3">
                <span>Sabato</span>
                <span className="text-white font-medium">17:00 - 19:00</span>
              </li>
              <li className="flex justify-between pt-1">
                <span>Altri Giorni</span>
                <span className="text-zinc-600 font-bold uppercase text-xs tracking-wider">Chiuso</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-zinc-600">
          <p>© {new Date().getFullYear()} La Mano Nera MMA Avellino. Tutti i diritti riservati.</p>
          <p>Created by Google AI Studio</p>
        </div>
      </footer>
    </div>
  );
}

// Simple parallax hook for the hero image
export function useScrollParallax() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return offset;
}
