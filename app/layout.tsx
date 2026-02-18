import "./globals.css";
import Link from "next/link";


export const metadata = {
  title: "FertilityCareHub",
  description: "Trusted global fertility guidance platform",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5F1E8] text-[#1A1A1A] font-serif">
        
        <header className="w-full py-6 border-b border-[#E5DDC8]">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
            
            <Link href="/" className="flex items-center gap-4">
              
              <span className="text-xl tracking-wide">
                FertilityCareHub
              </span>
            </Link>

            <Link
              href="/consultation#request"
              className="border border-[#B89B5E] px-5 py-2 text-sm tracking-wide hover:bg-[#B89B5E] hover:text-white transition"
            >
              Request Advisory Consultation
            </Link>

          </div>
        </header>

        <main>{children}</main>

      </body>
    </html>
  );
}
