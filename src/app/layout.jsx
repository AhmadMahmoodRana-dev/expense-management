import ContextProvider from "@/context/Context";
import "./globals.css";

export const metadata = {
  title: "Expense Management",
  description: "Manage your expenses easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
