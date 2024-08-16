import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// import { Analytics } from '@vercel/analytics/react';

import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';
import { Providers } from '@/store/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Whatsapp Clone',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthContext>
                    <Providers>
                        <ToasterContext />
                        {children}
                        {/* <Analytics /> */}
                    </Providers>
                </AuthContext>
            </body>
        </html>
    );
}
