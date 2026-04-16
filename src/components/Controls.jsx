import confetti from "canvas-confetti";
import { useCallback } from "react";

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
  isLocked,
}) {
  const handleMagic = useCallback(() => {
    onMagic();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#EF4444", "#10B981", "#0F172A"],
    });
  }, [onMagic]);

  const getButtonContent = () => {
    if (isLocked) return "БРАВО, НАСТАВИ ДАЉЕ! 🎉";
    if (canMagic) return "МАГИЈА ✨";
    return "ПИШИ ЈОШ";
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-evenly py-2">
      <button
        onClick={onClear}
        disabled={!isDirty || isLocked}
        className={`text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 px-8 py-2 rounded-full border-2 ${
          isDirty && !isLocked
            ? "opacity-70 border-ui-dark text-ui-dark active:scale-90 shadow-sm cursor-pointer"
            : "opacity-10 border-ui-dark/20 text-ui-dark cursor-not-allowed"
        }`}
      >
        ОБРИШИ 🗑️
      </button>

      <div className="flex gap-4">
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
        <button
          onClick={onPrev}
          className={`btn-nav text-2xl p-3 cursor-pointer transition-all duration-500 ${
            isLocked ? "animate-pulse-mint border-none" : ""
          }`}
        >
          ❮
        </button>

        <button
          onClick={handleMagic}
          disabled={!canMagic || isLocked}
          className={`min-w-60 py-3 text-sm font-black rounded-xl transition-all duration-500 shadow-lg ${
            isLocked
              ? "bg-ui-dark text-bg-main scale-105 pointer-events-none"
              : canMagic
                ? "btn-magic cursor-pointer active:scale-95"
                : "bg-ui-dark/10 text-ui-dark/30 cursor-not-allowed"
          }`}
        >
          {getButtonContent()}
        </button>

        <button
          onClick={onNext}
          className={`btn-nav text-2xl p-3 cursor-pointer transition-all duration-500 ${
            isLocked ? "animate-pulse-mint border-none" : ""
          }`}
        >
          ❯
        </button>
      </div>

      <p className="text-ui-dark font-black text-[10px] uppercase tracking-widest opacity-80">
        СЛОВО {current + 1} / {total}
      </p>
    </div>
  );
}
