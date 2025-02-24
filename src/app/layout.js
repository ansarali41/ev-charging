import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata = {
    title: 'EV Charging Platform',
    description: 'Book your EV charging slots efficiently',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
