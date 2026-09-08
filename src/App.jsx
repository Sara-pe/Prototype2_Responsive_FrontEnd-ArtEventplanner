
import './App.css'
import { Header } from './layout/components/Header'
import { NavBar } from './layout/components/NavBar'
import { Outlet, ScrollRestoration } from 'react-router'

function App() {


  return (
    <>
     <Header/>
     <main>
      <Outlet/>
     </main>
     <NavBar/>
     <ScrollRestoration/>
    </>
  )
}

export default App
