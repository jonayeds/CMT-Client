import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";

export const metadata: Metadata = {
  title: "Classync.",
  description: "Classroom Management Tool",
  icons:{
    icon:'/classyncLogo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body cz-shortcut-listen="true">
          <Toaster position="top-center" duration={1500} />
          {children}
        </body>
      </html>
    </Providers>
  );
}
