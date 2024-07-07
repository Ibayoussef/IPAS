import { Inter, Montserrat, Scheherazade_New } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const scheherazade_new = Scheherazade_New({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
export const metadata = {
  title: "IPAS",
  description: "Intelectual Property",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={[scheherazade_new.className, montserrat.className,]}>{children}</body>
    </html>
  );
}
