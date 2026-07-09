export default function FloatingAddUserButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button className="w-14 h-14 bg-primary-container text-on-primary-container rounded-full shadow-2xl flex items-center justify-center">
        <span className="material-symbols-outlined text-3xl">
          add
        </span>
      </button>
    </div>
  );
}