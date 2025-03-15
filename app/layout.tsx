import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import "./global.css";
import MobileSidebar from "./components/layout/MobileSidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
        </style>
      </head>
      <body className="bg-[#00003c] ">
        <SessionProvider session={session}>
          <div className="flex flex-col h-screen">
            <Header />

            <div className="block md:hidden">
              <MobileSidebar />
            </div>

            <div className="flex flex-grow">
              <div className="hidden md:block">
                <Sidebar />
              </div>

              <main className="flex-grow p-4 overflow-auto">{children}</main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
