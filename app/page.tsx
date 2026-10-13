'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';

const BABE_PRICE_REASONS = [
  'Premium access to the most beautiful face',
  'Looking this cute is illegal in 12 countries so pay.',
  'Fees for maintaining that radiant, heavenly smile daily.',
  'HD viewing with zero buffering and unlimited smiles',
  'A lifetime supply of compliments, refilled daily',
  'Priority booking for every future date with me',
  'Tax-free hugs and forehead kisses (terms and conditions apply)',
];

const HEART_COLORS = [
  '#FF4D7E', // pink
  '#FFE3EA', // light pink
  '#FFC76B', // yellow
  '#4ADE80', // green
  '#60A5FA', // blue
  '#A78BFA', // purple
  '#F472B6', // rose
  '#FB923C', // orange
];

// Replace this with your babe's picture later
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80';

export default function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isPoorPopupOpen, setIsPoorPopupOpen] = useState(false);
  const [dateDetails, setDateDetails] = useState({
    date: '',
    time: '19:00',
    location: 'Romantic Dinner & Stargazing',
    notes: ''
  });

  const noBtnRef = useRef<HTMLButtonElement>(null);

  const [hearts, setHearts] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number; color: string }[]
  >([]);

  useEffect(() => {
    const initialHearts = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 5,
      color: HEART_COLORS[i % HEART_COLORS.length]
    }));
    setHearts(initialHearts);
  }, []);

  const moveNoButton = () => {
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 200;
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoHoverCount((prev) => prev + 1);
  };

  const closePay = () => {
    setIsPayOpen(false);
    setIsPaid(false);
  };

  const handlePay = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758c', '#ff7eb3', '#ffffff']
    });
    setIsPaid(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dateDetails.date === '' || !dateDetails.time) {
      alert('Please select a date and time');
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dateDetails)
      });

      if (response.ok) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff4d6d', '#ff758c', '#ff7eb3', '#ffffff']
        });
        setIsSubmitted(true);
      } else {
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-zinc-950 to-rose-950 text-white overflow-hidden flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'easeInOut'
            }}
          >
            <Heart size={heart.size} fill={heart.color} />
          </motion.div>
        ))}
      </div>

      {/* Glow behind hero */}
      <div className="pointer-events-none absolute top-[-10%] left-1/2 z-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-rose-600/20 blur-[140px]" />

      {/* HERO SECTION */}
      <main className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:py-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* LEFT: Text + actions */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-300 shadow-lg shadow-rose-900/20 backdrop-blur-md md:text-base"
              >
                {/* <Sparkles size={18} className="text-rose-400 animate-pulse" /> */}
                <span>A Special Invitation from Shillmonger</span>
                {/* <Stars size={18} className="text-rose-400" /> */}
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mt-6 bg-gradient-to-r from-white via-rose-200 to-rose-400 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent drop-shadow-sm sm:text-6xl lg:text-7xl"
              >
                Hi Babe, will you go on a date with me?
              </motion.h1>

              {/* Paragraphs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mt-6 max-w-2xl space-y-4 text-base font-light leading-relaxed text-zinc-300 sm:text-xl"
              >
                <p>
                  From the moment you came into my life, every single day has felt brighter,
                  warmer, and infinitely more meaningful. Your smile is my favorite sight, and
                  your laughter is my favorite sound.
                </p>
                <p>
                  I put together this little corner of the internet just for you, because you
                  deserve something as unique and wonderful as you are. I want to take you out,
                  spoil you, and make unforgettable memories together.
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="relative mt-10 flex w-full max-w-md flex-col items-center gap-6 sm:flex-row sm:justify-start lg:max-w-none"
              >
                {/* Yes */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative flex cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl border border-rose-400/30 bg-gradient-to-r from-rose-500 to-pink-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-rose-600/30 transition-all duration-300 hover:from-rose-600 hover:to-pink-700"
                  >
                    <Heart className="h-5 w-5 fill-white text-white transition-transform group-hover:scale-125" />
                    <span>Yes hun i will</span>

                    <div className="absolute bottom-full z-30 mb-2 hidden whitespace-nowrap rounded-lg border border-rose-500/30 bg-zinc-900 px-3 py-1 text-xs text-rose-200 shadow-2xl group-hover:block">
                      Yes, I will go on a date with you my babe 💕
                    </div>
                  </button>
                </motion.div>

                {/* No */}
                <motion.div
                  animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <button
                    ref={noBtnRef}
                    onMouseEnter={moveNoButton}
                    onTouchStart={moveNoButton}
                    onClick={moveNoButton}
                    className="group relative flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-8 py-4 text-lg font-semibold text-zinc-400 shadow-lg transition-all duration-200 hover:bg-zinc-800 hover:text-white"
                  >
                    <span>No i dont like you</span>

                    <div className="absolute bottom-full z-30 mb-2 hidden whitespace-nowrap rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-300 shadow-2xl group-hover:block">
                      No, I don&apos;t want to go on a date with you 🙈
                    </div>
                  </button>
                </motion.div>
              </motion.div>

              {noHoverCount > 3 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-xs italic text-rose-400/80"
                >
                  Nice try! But the &quot;No&quot; button is feeling a little shy today... 😉
                </motion.p>
              )}
            </div>

            {/* RIGHT: Hero image */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.35 }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-rose-500/30 via-pink-500/10 to-transparent blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-rose-950/40 backdrop-blur-md">
                <div className="relative overflow-hidden rounded-[1.6rem] cursor-pointer" onClick={() => setIsPayOpen(true)}>
                  <img
                    src={HERO_IMAGE}
                    alt="My babe"
                    className="h-[380px] w-full object-cover object-center sm:h-[460px] lg:h-[540px] blur-md transition-all duration-300 hover:blur-sm"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <p className="text-2xl font-bold text-white mb-2">Who is my babe?</p>
                    <p className="text-base text-rose-200">Click to see my girlfriend</p>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-rose-300">
                        My whole world
                      </p>
                      <p className="text-xl font-bold text-white">The prettiest babe ❤️</p>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-500/90 shadow-lg shadow-rose-900/40">
                      <Heart className="h-5 w-5 fill-white text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating mini card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-white/10 bg-zinc-950/80 px-5 py-4 shadow-xl backdrop-blur-md sm:block"
              >
                <p className="text-xs uppercase tracking-widest text-rose-400">Date status</p>
                <p className="text-lg font-bold text-white">Waiting for your yes 💕</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Date modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E0B24]/75 p-4 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="date-title"
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl bg-[#FFE3EA] p-6 text-[#1E0B24] shadow-2xl sm:p-8"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-2xl leading-none text-[#4A1238] hover:bg-[#1E0B24]/10"
              >
                ×
              </button>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 id="date-title" className="pr-8 text-3xl font-semibold leading-tight">
                    Yay! Let&apos;s pick a day
                  </h2>
                  <p className="mt-2 text-[#4A1238]">
                    Choose when you&apos;re free and what sounds good.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <label className="col-span-2 block text-sm font-bold">
                      Date
                      <input
                        type="date"
                        value={dateDetails.date}
                        onChange={(e) =>
                          setDateDetails({ ...dateDetails, date: e.target.value })
                        }
                        className="mt-1 w-full rounded-xl border border-[#E8A4B8] bg-white px-3 py-3 text-base font-normal"
                      />
                    </label>

                    <label className="col-span-2 block text-sm font-bold">
                      Time
                      <input
                        type="time"
                        value={dateDetails.time}
                        onChange={(e) =>
                          setDateDetails({ ...dateDetails, time: e.target.value })
                        }
                        className="mt-1 w-full rounded-xl border border-[#E8A4B8] bg-white px-3 py-3 text-base font-normal"
                      />
                    </label>
                  </div>

                  <fieldset className="mt-5">
                    <legend className="text-sm font-bold">What should we do?</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[
                        'Dinner',
                        'Movie night',
                        'Picnic',
                        'Surprise me',
                        'Romantic Dinner & Stargazing'
                      ].map((activity) => (
                        <button
                          key={activity}
                          type="button"
                          aria-pressed={dateDetails.location === activity}
                          onClick={() =>
                            setDateDetails({ ...dateDetails, location: activity })
                          }
                          className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-bold transition ${
                            dateDetails.location === activity
                              ? 'border-[#C2185B] bg-[#C2185B] text-white'
                              : 'border-[#E8A4B8] bg-white text-[#4A1238] hover:border-[#C2185B]'
                          }`}
                        >
                          {activity}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <label className="mt-5 block text-sm font-bold">
                    Anything else I should know?
                    <textarea
                      rows={3}
                      value={dateDetails.notes}
                      onChange={(e) =>
                        setDateDetails({ ...dateDetails, notes: e.target.value })
                      }
                      placeholder="Favourite food, dress code, a song..."
                      className="mt-1 w-full resize-none rounded-xl border border-[#E8A4B8] bg-white px-3 py-3 text-base font-normal placeholder:text-[#4A1238]/50"
                    />
                  </label>

                  <button
                    type="submit"
                    className="mt-6 w-full cursor-pointer rounded-full bg-[#C2185B] py-4 text-lg font-bold text-white shadow-lg transition hover:bg-[#A8124D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E0B24]"
                  >
                    Send my answer
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center">
                  <div className="text-6xl text-[#C2185B]">♥</div>
                  <h2 className="mt-4 text-3xl font-semibold">It&apos;s a date, babe</h2>
                  <p className="mt-3 text-lg">
                    Shillmonger is already smiling. See you soon.
                  </p>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsSubmitted(false);
                    }}
                    className="mt-6 w-full cursor-pointer rounded-full bg-[#C2185B] py-4 text-lg font-bold text-white shadow-lg transition hover:bg-[#A8124D]"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pay popup */}
      <AnimatePresence>
        {isPayOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E0B24]/75 p-4 backdrop-blur-sm"
            onClick={closePay}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="pay-title"
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl bg-[#FFE3EA] p-6 text-[#1E0B24] shadow-2xl sm:p-8"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={closePay}
                className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-2xl leading-none text-[#4A1238] hover:bg-[#1E0B24]/10"
              >
                ×
              </button>

              {!isPaid ? (
                <>
                  <h2 id="pay-title" className="pr-8 text-3xl font-semibold leading-tight">
                    Pay $100 to see my babe
                  </h2>
                  <p className="mt-2 text-[#4A1238]">
                    Viewing this picture is not free. Sorry, those are the rules.
                  </p>

                  <h3 className="mt-6 text-lg font-bold">What am I paying for?</h3>
                  <ul className="mt-3 space-y-3">
                    {BABE_PRICE_REASONS.map((reason) => (
                      <li key={reason} className="flex items-start gap-3 text-base">
                        <Heart
                          size={18}
                          fill="currentColor"
                          className="mt-1 shrink-0 text-[#C2185B]"
                        />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-[#C2185B]">$100.00</span>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handlePay}
                      className="w-full cursor-pointer rounded-full bg-[#C2185B] py-4 text-lg font-bold text-white shadow-lg transition hover:bg-[#A8124D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E0B24]"
                    >
                      Pay $100
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsPayOpen(false);
                        setIsPoorPopupOpen(true);
                      }}
                      className="w-full cursor-pointer rounded-full border border-[#E8A4B8] bg-white py-4 text-lg font-bold text-[#4A1238] transition hover:border-[#C2185B]"
                    >
                      Too expensive
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-6 text-center">
                  <div className="text-6xl text-[#C2185B]">♥</div>
                  <h2 className="mt-4 text-3xl font-semibold">Payment received 😂</h2>
                  <p className="mt-3 text-lg">
                    Just kidding, it&apos;s free for you. Ask me to send you the picture on WhatsApp!
                  </p>
                  <button
                    type="button"
                    onClick={() => window.open('https://wa.me/2347045167609', '_blank')}
                    className="mt-6 w-full cursor-pointer rounded-full bg-[#C2185B] py-4 text-lg font-bold text-white shadow-lg transition hover:bg-[#A8124D]"
                  >
                    Dm on green app
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Poor popup */}
      <AnimatePresence>
        {isPoorPopupOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E0B24]/75 p-4 backdrop-blur-sm"
            onClick={() => setIsPoorPopupOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl bg-[#FFE3EA] p-6 text-[#1E0B24] shadow-2xl sm:p-8"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsPoorPopupOpen(false)}
                className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-2xl leading-none text-[#4A1238] hover:bg-[#1E0B24]/10"
              >
                ×
              </button>

              <div className="py-6 text-center">
                <div className="text-6xl">😂</div>
                <h2 className="mt-4 text-3xl font-semibold">Ah poor man pikin lol</h2>
                <p className="mt-3 text-lg text-[#4A1238]">Leave here now</p>
                <button
                  onClick={() => setIsPoorPopupOpen(false)}
                  className="mt-6 w-full cursor-pointer rounded-full bg-[#C2185B] py-4 text-lg font-bold text-white shadow-lg transition hover:bg-[#A8124D]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-zinc-500">
        Made with endless love by Shillmonger for his babe ✨
      </footer>
    </div>
  );
}