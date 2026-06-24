"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import ProfileCard from "@/components/ProfileCard";
import WeatherWidget from "@/components/WeatherWidget";
import NotesWidget from "@/components/NotesWidget";
import TimerWidget from "@/components/TimerWidget";
import NewsWidget from "@/components/NewsWidget";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/register");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-white p-5">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-green-400">
          Super Dashboard
        </h1>

        <div className="grid lg:grid-cols-3 gap-5">

          {/* Left Side */}

          <div className="lg:col-span-2 grid gap-5">

            <div className="grid md:grid-cols-2 gap-5">

              <ProfileCard />

              <WeatherWidget />

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <NotesWidget />

              <TimerWidget />

            </div>

          </div>

          {/* Right Side */}

          <div>
            <NewsWidget />
          </div>

        </div>
      </div>
    </main>
  );
}
