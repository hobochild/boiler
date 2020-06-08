import 'normalize.css'
import 'concrete.css'
import Nav from './_nav'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const { user } = pageProps
  return (
    <main className="container">
      <Nav user={pageProps.user} />
      <Component {...pageProps} />
    </main>
  )
}
