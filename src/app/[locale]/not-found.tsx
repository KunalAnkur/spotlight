"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Film, Rocket, Search } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="flex h-screen bg-gradient-to-br from-[#030712] via-[#0f172a] to-[#1e1b4b] items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating orbs */}
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float-rotate" 
            style={{ animationDelay: '0s' }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-rotate" 
            style={{ animationDelay: '1s' }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl animate-float-rotate" 
            style={{ animationDelay: '2s' }}
          ></div>
          
          {/* Floating icons */}
          <div 
            className="absolute top-1/4 left-1/4 text-purple-500/20 animate-float-rotate" 
            style={{ animationDelay: '0.5s' }}
          >
            <Film size={40} />
          </div>
          <div 
            className="absolute bottom-1/4 right-1/4 text-pink-500/20 animate-float-rotate" 
            style={{ animationDelay: '1.5s' }}
          >
            <Rocket size={35} />
          </div>
          <div 
            className="absolute top-1/3 right-1/3 text-rose-500/20 animate-float-rotate" 
            style={{ animationDelay: '2.5s' }}
          >
            <Search size={30} />
          </div>
        </div>

        <div className={`flex flex-col items-center gap-8 px-4 z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Animated 404 */}
          <div className="relative">
            <h1 className="text-9xl md:text-[12rem] font-extrabold bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
            {/* Glow effect */}
            <div 
              className="absolute inset-0 text-9xl md:text-[12rem] font-extrabold bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent blur-2xl opacity-50 -z-10 animate-pulse" 
              style={{ animationDelay: '0.5s' }}
            >
              404
            </div>
          </div>

          {/* Main content */}
          <div className="text-center space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20 border border-purple-500/30 backdrop-blur-sm">
              <span className="text-2xl">🎬</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Oops! This Scene is Missing
              </h2>
              <span className="text-2xl">🎥</span>
            </div>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Looks like this page went on a coffee break! ☕
            </p>
            <p className="text-base text-gray-400">
              Don&apos;t worry, even the best movies have deleted scenes. Let&apos;s get you back to the main show!
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <button
              onClick={() => router.push("/")}
              className="group relative px-8 py-4 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 hover:from-rose-500 hover:via-pink-500 hover:to-fuchsia-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              <Home className="relative z-10 w-5 h-5" />
              <span className="relative z-10">Go Home</span>
            </button>
            
            <button
              onClick={() => router.back()}
              className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Fun facts or tips */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 border border-purple-500/20 backdrop-blur-sm max-w-md">
            <p className="text-sm text-gray-400 text-center">
              <span className="text-purple-400 font-semibold">Fun Fact:</span>{" "}
              The first 404 error appeared in 1992. You&apos;re experiencing a piece of internet history! 🚀
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

