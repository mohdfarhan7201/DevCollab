import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";

import router from "./routes/index.jsx";

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}