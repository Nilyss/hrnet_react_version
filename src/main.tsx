// styles
import './utils/styles/global.scss'

// libraries
import ReactDOM from 'react-dom/client'
import './utils/i18n'

// components
import App from './App.tsx'

// context
import { EmployeeProvider } from './context/EmployeeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <EmployeeProvider>
    <App />
  </EmployeeProvider>,
)
