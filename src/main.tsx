// styles
import './utils/styles/global.scss'

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './utils/i18n'

createRoot(document.getElementById('root')!).render(<App />)
