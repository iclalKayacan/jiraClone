import "./globals.css";
import Providers from "../components/Providers"; 

export const metadata = {
  title: "Jira Clone",
  description: "Proje ve görev yönetim sistemi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
