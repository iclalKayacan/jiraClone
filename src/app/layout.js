// app/layout.js (SERVER component, metadata kullanılacak)
import "./globals.css";
import TopNav from "@/components/TopNav"; // Bu bir "client component" olabilir

// Bu kısımda "use client" YOK, çünkü metadata kullanacağız
export const metadata = {
  title: "My App",
  description: "Demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Sunucu bileşen içinden, client bileşeni çağırmak */}
        <TopNav />
        {children}
      </body>
    </html>
  );
}
