import Header from '@/components/Header';
import ReduxProvider from '@/store/ReduxProvider';
import { GoogleAnalytics } from '@next/third-parties/google'

import './globals.scss';

export const metadata = {
    title: 'Resumave - Free Resume Maker',
    description:
        'Our tool helps you create a resume that works with job application systems. It makes sure you look good to employers.',
    openGraph: {
        title: 'Resumave',
        images: `/banner.png`,
        icons: {
            icon: `/favicon.png`,
        },
        type: 'website',
    },
    alternates: {
        canonical: '/',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ReduxProvider>
                    <Header />
                    <div className="mx-auto">
                        {children}
                    </div>
                </ReduxProvider>
                <GoogleAnalytics gaId='G-WPXWXJ9MC2' />
            </body>
        </html>
    );
}
