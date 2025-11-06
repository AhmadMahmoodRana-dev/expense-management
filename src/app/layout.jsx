import ContextProvider from "@/context/Context";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";

export const metadata = {
  title: "Expense Management",
  description: "Manage your expenses easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
          <ContextProvider>{children}</ContextProvider>
        {/* </ToastContainer>  */}
      </body>
    </html>
  );
}
