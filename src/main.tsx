import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { store } from "./store"
import { Provider } from "react-redux";

if (import.meta.env.VITE_USE_MOCK === 'true') {
  const { worker } = await import('./mocks/server.ts');
  await worker.start();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
