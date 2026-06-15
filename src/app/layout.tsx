import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ananya Kalia | Portfolio",
    template: "%s | Ananya Kalia"
  },
  description: "Aspiring software developer driven by curiosity and a desire to create real-world impact through technology. Expert in AI/ML, Computer Vision, and Web Systems.",
  keywords: [
    "Ananya Kalia",
    "Software Developer",
    "AI Engineer",
    "Computer Vision Developer",
    "Machine Learning Engineer",
    "Next.js Developer",
    "Portfolio"
  ],
  authors: [{ name: "Ananya Kalia" }],
  creator: "Ananya Kalia",
  metadataBase: new URL("https://ananyakalia.com"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ananyakalia.com",
    title: "Ananya Kalia | Portfolio & AI Showcase",
    description: "Driven by curiosity, building real-world impact through software engineering, computer vision, and machine learning.",
    siteName: "Ananya Kalia Portfolio",
    images: [
      {
        url: "/ananya_real.jpg",
        width: 1200,
        height: 630,
        alt: "Ananya Kalia Portfolio Background"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ananya Kalia | Portfolio & AI Showcase",
    description: "Driven by curiosity, building real-world impact through software engineering, computer vision, and machine learning.",
    creator: "@ananyakalia",
    images: ["/ananya_real.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/logo.jpg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ananya Kalia",
    "alternateName": "Ananya",
    "jobTitle": "Software Developer & AI Engineer",
    "url": "https://ananyakalia.com",
    "image": "https://ananyakalia.com/ananya_real.jpg",
    "sameAs": [
      "https://github.com/ananyakalia",
      "https://linkedin.com/in/ananyakalia"
    ],
    "description": "Aspiring software developer driven by curiosity and a desire to create real-world impact through technology.",
    "knowsAbout": [
      "Computer Vision",
      "Artificial Intelligence",
      "Machine Learning",
      "Web Development",
      "Python",
      "C++",
      "Java",
      "TensorFlow",
      "OpenCV",
      "React",
      "Next.js"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "TCET (Thakur College of Engineering and Technology)"
    }
  };

  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#121816] text-[#FAF6EE] font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
