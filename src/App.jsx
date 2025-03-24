import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './component/Header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <div>footer</div>
    </>
  )
}

export default App
