"use client";

import Image from "next/image";
import TopPage from "./agents/page";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { increment, decrement } from "@/lib/features/ai-agents/ai-agents-Slice";

export default function Home() {
  const count = useAppSelector((state) => state.agent.value);
  const dispatch = useAppDispatch();

  const handleclick = () => {
    dispatch(increment());
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-slate-900">
        Landing Page ..........
        <br />
        <Link href={"/agents"}>get started</Link>
        <div>
          {count}
          <Button onClick={handleclick} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
