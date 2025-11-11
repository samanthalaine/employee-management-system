import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthBypassProvider } from "./AuthBypassContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

async function prepare() {
  // Toggle mocks via env: set VITE_USE_MSW=true in Render Static Site env
  const useMock = import.meta.env.VITE_USE_MSW === "true";

  if (useMock) {
    // Lazy-load MSW in the browser only
    const { worker } = await import("./mocks/browser");
    await worker.start({
      // Make sure you've run: npx msw init public --save
      serviceWorker: { url: "/mockServiceWorker.js" },
      onUnhandledRequest: "bypass", // ignore any endpoints you don't mock
    });
  }
}

prepare()
  .catch((err) => {
    // If MSW fails to start, just log and continue rendering the app
    console.error("MSW init failed (continuing without mocks):", err);
  })
  .finally(() => {
    root.render(
      <React.StrictMode>
        <AuthBypassProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthBypassProvider>
      </React.StrictMode>
    );
  });
