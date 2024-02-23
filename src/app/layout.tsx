import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/globals.css";
import { UIProviders } from "@/providers/NextUIProvider";
import { StoreProvider } from '@/providers/StoreProvider'
import Navigation from "@/components/Navigation";
import { AuthChecker } from "@/components/AuthChecker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthChecker>
            <UIProviders>
              <Navigation />
              {children}
            </UIProviders>
          </AuthChecker>
        </StoreProvider>
      </body>
    </html>
  );
}

