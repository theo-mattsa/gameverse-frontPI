import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
