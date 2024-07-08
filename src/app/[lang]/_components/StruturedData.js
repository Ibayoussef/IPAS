// components/StructuredData.tsx
import React from "react";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "IP ADVICE & SERVICES",
    description: "Industrial property consulting firm, accredited by OMPIC",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
    },
    telephone: "+212 6 77 62 82 03",
    email: "mohamed@elharzli.com",
    url: "https://your-website-url.com",
    image: "/images/logo.png",
    priceRange: "$$",
    serviceType: [
      "Patent Filing",
      "Trademark Registration",
      "Industrial Design Protection",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
