import './globals.css';
import {
  Advent_Pro,
  Arima,
  Glory,
  Grenze_Gotisch,
  Inter,
  Merienda,
  Raleway_Dots,
} from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const advent_pro = Advent_Pro({
  subsets: ['latin'],
  variable: '--font-advent-pro',
});
const glory = Glory({ subsets: ['latin'], variable: '--font-glory' });
const arima = Arima({ subsets: ['latin'], variable: '--font-arima' });
const grenze_gotisch = Grenze_Gotisch({
  subsets: ['latin'],
  variable: '--font-grenze-gotisch',
});
const merienda = Merienda({ subsets: ['latin'], variable: '--font-merienda' });
const raleway_dots = Raleway_Dots({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-raleway-dots',
});

export const metadata = {
  title: 'Portfolio',
  description: 'Mateusz Piwowarski portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} ${inter.variable} ${advent_pro.variable} ${glory.variable} ${arima.variable} ${grenze_gotisch.variable} ${merienda.variable} ${raleway_dots.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
