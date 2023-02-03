import '../styles/globals.css';
import Layout from '../component/layout';
import ErrorBoundary from '../component/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  )
}

export default MyApp
