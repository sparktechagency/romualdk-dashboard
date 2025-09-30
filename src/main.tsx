import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './components/Router/Routes'
import ReduxProvider from './redux/lib/ReduxProvider'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <Toaster/>
    <RouterProvider router={router}/>
    </ReduxProvider>
  </StrictMode>,
)
