import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Providers from './providers/Providers.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider,QueryClient} from '@tanstack/react-query'
  
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        <QueryClientProvider client={queryClient}>
        <App />
        </QueryClientProvider>
      </Providers>
    </BrowserRouter>
  </StrictMode>,
)
