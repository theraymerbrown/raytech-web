import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RayTech Services | Local tech people. Real follow-through.",
  description:
    "RayTech Services LLC — Shelbyville, Kentucky. Networks, cameras, care, and calm follow-through for small businesses and organizations across the Louisville–Lexington corridor.",
  openGraph: {
    title: "RayTech Services",
    description:
      "Real humans serving real people. Local technology services since about 2009.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
