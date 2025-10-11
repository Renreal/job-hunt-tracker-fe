import { DotLottieReact } from "@lottiefiles/dotlottie-react";
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <DotLottieReact
        src="/notFound.lottie"
        loop
        autoplay
        className="w-80 h-80"
      />
      <h1 className="text-4xl font-bold mt-6">404 Not Found</h1>
      <p className="text-gray-500 mb-8">
      Hmm… we can’t seem to find that page 😅
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Back to Home
      </a>
    </div>
  );
}

export default NotFound;
