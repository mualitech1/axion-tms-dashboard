import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './hooks/use-auth.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './config/query-client'

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </QueryClientProvider>
);
