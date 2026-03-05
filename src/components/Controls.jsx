import confetti from "canvas-confetti";

export default function Controls({
  onNext,
  onPrev,
  onMagic,
  onClear,
  current,
  total,
  progress,
  canMagic,
  isDirty,
}) {
  const handleMagic = () => {
    onMagic();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#EF4444", "#10B981", "#0F172A"],
    });
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {/* Obriši Button - mt-6 provides the air between canvas and button */}
      <button
        onClick={onClear}
        disabled={!isDirty}
        className={`mt-6 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 px-10 py-3 rounded-full border-2 ${
          isDirty
            ? "opacity-70 border-ui-dark text-ui-dark active:scale-90 shadow-sm cursor-pointer"
            : "opacity-10 border-ui-dark/20 text-ui-dark cursor-not-allowed"
        }`}
      >
        ОБРИШИ 🗑️
      </button>

      {/* Stars - mb-1 keeps the stars closer to the Magija button */}
      <div className="flex gap-4 mb-1">
        {[1, 2].map((s) => (
          <span
            key={s}
            className={`text-5xl transition-all duration-300 drop-shadow-sm ${
              progress >= s
                ? "text-ui-dark opacity-100 scale-110"
                : "text-ui-dark opacity-20"
            }`}
          >
            {progress >= s ? "★" : "☆"}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <button onClick={onPrev} className="btn-nav text-2xl p-4 cursor-pointer">
          ❮
        </button>

        <button
          onClick={handleMagic}
          disabled={!canMagic}
          className="btn-magic min-w-50 py-4 text-xl shadow-lg cursor-pointer"
        >
          {canMagic ? "МАГИЈА ✨" : "ПИШИ ЈОШ"}
        </button>

        <button onClick={onNext} className="btn-nav text-2xl p-4 cursor-pointer">
          ❯
        </button>
      </div>

      {/* mt-1 keeps the slovo counter tucked nicely under the nav */}
      <p className="text-ui-dark font-black text-sm uppercase tracking-widest mt-1">
        СЛОВО {current + 1} / {total}
      </p>
    </div>
  );
}
