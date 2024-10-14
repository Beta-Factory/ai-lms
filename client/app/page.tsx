"use client";

import Image from "next/image";
import TopPage from "./agents/page";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { increment, decrement } from "@/lib/features/ai-agents/ai-agents-Slice";
import { useEffect, useState } from "react";

export default function Home() {
  // const count = useAppSelector((state) => state.agent.value);
  // const dispatch = useAppDispatch();

  // const handleclick = () => {
  //   dispatch(increment());
  // };

  // password protection logic-------------------------------------------------------------
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedPassword = localStorage.getItem("password");
    const correctPassword = "gta6gamer";

    if (storedPassword === correctPassword) {
      setIsAuthenticated(true);
    } else {
      const password = prompt("Please enter the password:");
      if (password === correctPassword) {
        localStorage.setItem("password", password);
        setIsAuthenticated(true);
      } else {
        alert("Incorrect password!");
      }
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-4xl text-center">Access Denied</div>
      </div>
    );
  }
  // password protection logic end-------------------------------------------------------------

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-slate-900">
        Landing Page ..........
        <br />
        <Link href={"/agents"}>get started</Link>
        {/* <div>
          {count}
          <Button onClick={handleclick} />
        </div> */}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
