import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Study English App',
  description: 'Improve your English skills with our interactive study app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <header className="container mx-auto py-4 px-4">
              <nav className="flex justify-between items-center">
                <a href="/" className="text-2xl font-bold">Study English</a>
                <ModeToggle />
              </nav>
            </header>
            <main>
              {children}
            </main>
            <footer className="container mx-auto py-4 px-4 text-center">
              <p>&copy; 2023 Study English App. All rights reserved.</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}