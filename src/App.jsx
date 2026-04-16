import { useState } from "react";
import { AZBUKA } from "./constants/alphabet";
import Header from "./components/Header";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";
import StartScreen from "./components/StartScreen";

export default function App() {
  const [index, setIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [clearKey, setClearKey] = useState(0);

  const playSfx = (type) => {
    if (isMuted || !gameStarted) return;

    const sounds = {
      swoosh:
        "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
      magic:
        "https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3",
    };

    const audio = new Audio(sounds[type]);
    audio.volume = type === "swoosh" ? 0.15 : 0.4;
    audio.play().catch(() => {});
  };

  const resetLetter = (newIndex) => {
    setIndex(newIndex);
    setProgress(0);
    setIsLocked(false);
    setClearKey((prev) => prev + 1);
  };

  const handleClear = () => {
    setClearKey((prev) => prev + 1);
    setProgress(0);
    setIsLocked(false);
  };

  return (
    <div className="h-dvh w-full flex flex-col items-center justify-between bg-bg-main p-2 pb-4 overflow-hidden relative">
      {!gameStarted && <StartScreen onStart={() => setGameStarted(true)} />}

      {/* SOUND */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-4 right-4 text-3xl z-50 text-ui-dark active:scale-90 transition-all cursor-pointer"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* HEADER */}
      <header className="h-[8%] min-h-12.5 w-full flex items-center justify-center pt-2 pointer-events-none z-30">
        <div className="pointer-events-auto">
          <Header />
        </div>
      </header>

      {/* CANVAS */}
      <main
        className={`flex-1 w-full max-h-[55%] flex items-center justify-center z-10 my-2 transition-all duration-500 ${
          gameStarted
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        {gameStarted && (
          <div className="canvas-frame">
            <Canvas
              key={`${index}-${clearKey}`}
              letter={AZBUKA[index]}
              isLocked={isLocked}
              progress={progress}
              onProgress={(level) =>
                setProgress((prev) => Math.max(prev, level))
              }
              onDrawStart={() => playSfx("swoosh")}
            />
          </div>
        )}
      </main>

      {/* CONTROLS */}
      <section className="h-[32%] min-h-55 w-full flex flex-col items-center justify-center z-20">
        <Controls
          onNext={() => resetLetter((index + 1) % AZBUKA.length)}
          onPrev={() =>
            resetLetter((index - 1 + AZBUKA.length) % AZBUKA.length)
          }
          onClear={handleClear}
          onMagic={() => {
            setIsLocked(true);
            playSfx("magic");
          }}
          current={index}
          total={AZBUKA.length}
          progress={progress}
          isDirty={progress > 0}
          canMagic={progress === 2 && !isLocked}
          isLocked={isLocked}
        />
      </section>
    </div>
  );
}
