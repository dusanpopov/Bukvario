import confetti from 'canvas-confetti';

export default function Controls({ onNext, onPrev, onMagic, onClear, current, total, progress, canMagic, isDirty }) {
  
  const handleMagic = () => {
    onMagic();
    confetti({ 
      particleCount: 150, 
      spread: 70, 
      origin: { y: 0.8 },
      colors: ['#EF4444', '#10B981', '#0F172A'] 
    });
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-evenly py-2">
      
      {/* Obriši Button */}
      <button 
        onClick={onClear}
        disabled={!isDirty}
        className={`text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 px-8 py-2 rounded-full border-2 ${
          isDirty 
          ? 'opacity-70 border-ui-dark text-ui-dark active:scale-90 shadow-sm cursor-pointer' 
          : 'opacity-10 border-ui-dark/20 text-ui-dark cursor-not-allowed'
        }`}
      >
        Obriši 🗑️
      </button>

      {/* Stars Unlock Logic */}
      <div className="flex gap-4">
        {[1, 2].map((s) => (
          <span 
            key={s} 
            className={`text-5xl transition-all duration-300 drop-shadow-sm ${
              progress >= s ? 'text-ui-dark opacity-100 scale-110' : 'text-ui-dark opacity-20'
            }`}
          >
            {progress >= s ? '★' : '☆'}
          </span>
        ))}
      </div>

      {/* Primary Navigation Row */}
      <div className="flex items-center gap-6">
        <button onClick={onPrev} className="btn-nav text-2xl p-3">❮</button>
        
        <button 
          onClick={handleMagic} 
          disabled={!canMagic} 
          className="btn-magic min-w-45 py-3 text-xl shadow-lg"
        >
          {canMagic ? 'MAGIJA ✨' : 'PIŠI JOŠ'}
        </button>

        <button onClick={onNext} className="btn-nav text-2xl p-3">❯</button>
      </div>

      {/* Letter Counter - Small font size ensures it stays above the bottom bezel */}
      <p className="text-ui-dark font-black text-[10px] uppercase tracking-widest opacity-80">
        Slovo {current + 1} / {total}
      </p>
    </div>
  );
}