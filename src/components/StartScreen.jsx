export default function StartScreen({ onStart }) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-bg-dark/95 backdrop-blur-xl p-6 text-center">
      <div className="flex flex-col items-center max-w-sm">
        <div className="w-24 h-24 bg-ink-mint rounded-full mb-6 flex items-center justify-center animate-bounce shadow-[0_0_30px_rgba(78,205,196,0.3)]">
          <span className="text-5xl">✏️</span>
        </div>
        <h1 className="text-5xl font-black mb-2 text-text-soft uppercase leading-tight">
          БУКВАРИО
        </h1>
        <button
          onClick={onStart}
          className="btn-magic text-2xl w-full py-6 mt-10 cursor-pointer"
        >
          КРЕНИ!
        </button>
      </div>
    </div>
  );
}
