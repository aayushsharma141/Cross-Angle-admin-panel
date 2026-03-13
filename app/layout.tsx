import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/auth-provider';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });

export const metadata: Metadata = {
  title: 'CrossAngle Intelligence Admin',
  description: 'Admin Panel for CrossAngle Intelligence',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-gray-50 text-gray-900 dark:bg-[#0a0a0f] dark:text-[#e2e8f0] antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
