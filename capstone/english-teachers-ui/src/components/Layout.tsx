// src/components/Layout.tsx
import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "60px", paddingBottom: "40px" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
