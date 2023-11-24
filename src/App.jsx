import { useState } from 'react'
import Store from './Components/Store/Store.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Store />
  )
}

export default App
