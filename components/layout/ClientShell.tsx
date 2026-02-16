"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StoreProvider } from "@/lib/store";

const noShellRoutes = ["/signin", "/signup", "/admin"];

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideShell = noShellRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <StoreProvider>
      {!hideShell && <Header />}
      <main className="flex-1">{children}</main>
      {!hideShell && <Footer />}
    </StoreProvider>
  );
}
