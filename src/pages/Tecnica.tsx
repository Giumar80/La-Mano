import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Facebook, Menu as MenuIcon, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Tecnica() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 logo-hover-effect">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="La Mano Nera Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl tracking-widest uppercase leading-none">La Mano Nera</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-red-500 font-bold mt-1">MMA \ Avellino</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors flex items-center gap-2">
              <ChevronLeft size={16} /> Torna alla Home
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
                <button onClick={() => navigate('/')} className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-sm font-bold uppercase tracking-wider transition-colors border border-zinc-800 text-center flex items-center justify-center gap-2">
                  <ChevronLeft size={16} /> Torna alla Home
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="pt-40 pb-20 relative">
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-red-600"></div>
                <span className="uppercase tracking-widest text-red-500 font-bold text-sm">Metodologia</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl uppercase tracking-wider mb-8 text-white leading-tight">
                Le MMA: <br/> L'Arte della Sintesi e il Primato della Tecnica
              </h1>
              
              <div className="prose prose-invert prose-lg max-w-none prose-p:text-zinc-400 prose-p:font-light prose-p:leading-relaxed prose-li:text-zinc-400 prose-strong:text-white">
                <p>
                  Le Mixed Martial Arts (Arti Marziali Miste) non sono semplicemente la somma di diversi stili di combattimento, ma rappresentano l'evoluzione finale della strategia atletica. Spesso fraintese come una disciplina basata sulla forza bruta, le MMA sono in realtà una forma raffinata di scacchi fisici, dove l'intelligenza motoria prevale sull'istinto primordiale.
                </p>
                <p>
                  In questo ecosistema, la tecnica non è un accessorio: è il sistema operativo che permette a un atleta di trasformare il caos del confronto in una sequenza ordinata di decisioni efficaci.
                </p>

                <h2 className="font-display text-3xl uppercase tracking-wider text-white mt-16 mb-8">Perché la Tecnica è il vero motore delle MMA</h2>
                <p>
                  Esistono tre ragioni fondamentali per cui la padronanza tecnica definisce il confine tra un "combattente" e un vero artista marziale:
                </p>
                <ul className="space-y-4 my-8">
                  <li className="flex gap-4 items-start">
                    <span className="text-red-500 mt-1">/</span>
                    <div>
                      <strong className="block mb-1">Efficienza Meccanica:</strong>
                      La tecnica è l'arte di ottenere il massimo risultato con il minimo sforzo. In una disciplina che unisce striking, lotta e grappling, saper gestire le leve e il baricentro permette di neutralizzare avversari fisicamente più imponenti.
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-red-500 mt-1">/</span>
                    <div>
                      <strong className="block mb-1">Gestione del Rischio e Longevità:</strong>
                      Allenarsi tecnicamente significa imparare a proteggere il proprio corpo. Una corretta esecuzione dei movimenti riduce drasticamente l'impatto articolare e il rischio di infortuni, permettendo una pratica costante e duratura nel tempo.
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-red-500 mt-1">/</span>
                    <div>
                      <strong className="block mb-1">Chiarezza sotto pressione:</strong>
                      Quando la fatica aumenta, la forza svanisce. La tecnica, invece, resta. È la memoria muscolare che permette di mantenere la lucidità tattica anche nei momenti di massima intensità, trasformando un potenziale svantaggio in un'opportunità di contrattacco.
                    </div>
                  </li>
                </ul>

                <h2 className="font-display text-3xl uppercase tracking-wider text-white mt-16 mb-8">Un Percorso di Evoluzione Personale</h2>
                <p>
                  Approcciarsi alle MMA attraverso lo studio della tecnica significa intraprendere un viaggio di autoconsapevolezza. Non si tratta solo di imparare a colpire o a difendersi, ma di comprendere come il corpo e la mente possano lavorare in perfetta sinergia.
                </p>
                <ul className="space-y-4 my-8">
                  <li className="flex gap-4 items-start">
                    <span className="text-red-500 mt-1">/</span>
                    <div>
                      <strong className="block mb-1">Disciplina Mentale:</strong>
                      Ogni sessione richiede focus, analisi e capacità di adattamento.
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-red-500 mt-1">/</span>
                    <div>
                      <strong className="block mb-1">Rispetto:</strong>
                      La complessità della disciplina insegna a rispettare il percorso dell'avversario e la profondità dell'arte.
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-red-500 mt-1">/</span>
                    <div>
                      <strong className="block mb-1">Versatilità:</strong>
                      Impariamo a essere fluidi, passando dalla distanza del pugilato alla complessità della lotta a terra senza soluzione di continuità.
                    </div>
                  </li>
                </ul>

                <blockquote className="mt-16 border-l-4 border-red-600 pl-6 italic text-2xl text-white font-light p-8 bg-zinc-900/50">
                  "La forza bruta può vincere un round, ma è la comprensione profonda del movimento che costruisce un atleta completo."
                </blockquote>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="w-full mt-20 relative h-[600px]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10"></div>
          <img 
            src={`${import.meta.env.BASE_URL}tecnica.png`} 
            alt="Tecnica MMA" 
            className="w-full h-full object-cover grayscale opacity-60"
          />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-zinc-400">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 logo-hover-effect">
                <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="La Mano Nera Logo" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <span className="font-display text-2xl tracking-widest uppercase text-white group-hover:text-red-400 transition-colors duration-300">La Mano Nera</span>
            </div>
            <p className="text-sm font-light leading-relaxed mb-8 max-w-sm">
              Il centro per le Arti Marziali Miste ad Avellino. Sviluppiamo atleti, forgiamo caratteri. Dedizione, disciplina e rispetto.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-zinc-600">
          <p>© {new Date().getFullYear()} La Mano Nera MMA Avellino. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
