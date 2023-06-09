import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import {BrowserRouter} from 'react-router-dom'
import App from "./App.tsx";
import "./index.css";
import { queryClient } from "./core/api.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
