import { CompaniesContextProvider } from '../contexts/CompaniesContext'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return <CompaniesContextProvider>
    <Component {...pageProps} />
  </CompaniesContextProvider>
}

export default MyApp
