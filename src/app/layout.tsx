import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: 'FKM UMJ',
  description: 'Powered By PBL KEL 6 FKM UMJ X UPT PUSKESMAS KAMPUNG SAWAH',
}
export const viewport: Viewport = {
  themeColor:"#fffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ maxWidth: '500px', margin: '0 auto' }}>
        {children}

        <div className="bg-green-900 mx-2 rounded-md mb-2">
          <div className="px-5 py-5 text-white text-center" style={{fontSize: "8px"}}>
            Powered By PBL KEL 6 FKM UMJ X UPT PUSKESMAS KAMPUNG SAWAH
          </div>

        </div>
      </body>
    </html>
  );
}
