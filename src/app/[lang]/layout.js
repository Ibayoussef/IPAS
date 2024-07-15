import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const scheherazade_new = localFont({
  src: [
    {
      path: "../../../public/fonts/ScheherazadeNew-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ScheherazadeNew-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ScheherazadeNew-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ScheherazadeNew-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const generateMetadata = async ({ params: { lang } }) => {
  const langto = lang || "fr";

  const title =
    langto === "fr"
      ? "IP ADVICE & SERVICES - Expert en Propriété Industrielle au Maroc"
      : "IP ADVICE & SERVICES - Industrial Property Expert in Morocco";

  const description =
    langto === "fr"
      ? "Cabinet de conseil accrédité par l'OMPIC, spécialisé dans la protection des brevets, marques et dessins industriels. Valorisez vos innovations avec notre expertise."
      : "OMPIC-accredited consulting firm specializing in patents, trademarks, and industrial designs protection. Enhance your innovations with our expertise.";

  const keywords = [
    "propriété industrielle",
    "brevets",
    "marques",
    "dessins industriels",
    "OMPIC",
    "industrial property",
    "patents",
    "trademarks",
    "industrial designs",
    "conseil juridique",
    "legal consulting",
    "innovation protection",
    "Maroc",
    "Morocco",
  ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "IP ADVICE & SERVICES" }],
    creator: "IP ADVICE & SERVICES",
    publisher: "IP ADVICE & SERVICES",
    openGraph: {
      title,
      description,
      url: "http://localhost:3000",
      siteName: "IP ADVICE & SERVICES",
      images: [
        {
          url: "/images/logo.png", // Update with your actual logo path
          width: 1200,
          height: 630,
          alt: "IP ADVICE & SERVICES Logo",
        },
      ],
      locale: langto === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/logo.png"], // Update with your actual logo path
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `http://localhost:3000/${langto}`,
      languages: {
        "en-US": "/en",
        "fr-FR": "/fr",
      },
    },
    icons: {
      icon: "/favicon.ico", // Make sure you have a favicon
    },
  };
};

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang || "en"}>
      <body className={[scheherazade_new.className, montserrat.className]}>
        {children}
      </body>
    </html>
  );
}
