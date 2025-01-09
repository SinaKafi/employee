import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import chakraTheme from "./configs/theme/chakraTheme"; // Update the path as necessary
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }}>
      <ChakraProvider theme={chakraTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </MotionConfig>
  </StrictMode>
);
