import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import { AuthBypassProvider } from "./AuthBypassContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

async function prepare() {
  const useMock = import.meta.env.VITE_USE_MSW === "true";
  if (useMock) {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      serviceWorker: { url: "/mockServiceWorker.js" },
      onUnhandledRequest: "bypass",
    });
  }
}

prepare()
  .catch((err) => {
    console.error("MSW init failed (continuing without mocks):", err);
  })
  .finally(() => {
    root.render(
      <React.StrictMode>
        <AuthBypassProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </AuthBypassProvider>
      </React.StrictMode>
    );
  });
