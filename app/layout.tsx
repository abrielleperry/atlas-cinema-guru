import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import "./global.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="bg-[#00003c] ">
        <SessionProvider session={session}>
          <Header />
          <Sidebar />
          <div>{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
