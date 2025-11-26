import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

export const metadata = {
  title: "Hyzeer AI builder: Websites, apps & prototypes in seconds",
  description: "Create stunning apps & websites by chatting with AI.",
};

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body

      >
        <Provider>
          {children}
        </Provider>
       
      </body>
    </html>
  );
}
