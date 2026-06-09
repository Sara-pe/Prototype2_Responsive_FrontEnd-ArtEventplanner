
import './App.css'
import { Header } from './layout/components/Header'
import { NavBar } from './layout/components/NavBar'
import { Outlet } from 'react-router'

function App() {


  return (
    <>
     <Header/>
     <main>
      <Outlet/>
     </main>
     <NavBar/>
    </>
  )
}

export default App
