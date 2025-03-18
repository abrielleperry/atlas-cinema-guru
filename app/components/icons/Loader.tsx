import { Player } from "@lottiefiles/react-lottie-player";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <Player
        autoplay
        loop
        src="/Loader.lottie"
        className="w-48 h-48" // Tailwind width & height (48 = 12rem)
      />
    </div>
  );
};

export default Loader;
