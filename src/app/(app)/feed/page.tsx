"use client";
import { useRouter } from "next/navigation";

export default function FeedPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Feed Page</h1>
      <p className="text-lg">This is the feed page content.</p>
    </div>
  );
}
