import { Outlet } from 'react-router'
import Footer from './Footer'
import Nav from './Nav'

export default function Layout() {
  return (
    <div className="App">
      <Nav />
      <main className="AppContainer">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
