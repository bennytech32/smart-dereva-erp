import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Smart Dereva | National Driver Registry',
  description: 'Professional Driver Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* STRATEGIC FIX: 
          We ensure the body has no 'fixed' overlays and 
          background-color is explicitly set to white/slate. 
      */}
      <body className={`${inter.className} bg-white antialiased`}>
        {children}
      </body>
    </html>
  );
}