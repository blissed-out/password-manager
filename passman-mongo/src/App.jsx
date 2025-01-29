import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Engine from './components/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />



        <div className=' bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)'>

          </div>
          <Manager />

      <Engine />
    </>
  )
}

export default App
