import { useState, useEffect } from 'react'
import axios from 'axios';
import Map from './Map';
import Navigation from './components/Navigation';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigation />
      {/* <Map /> */}
    </>
  )
}

export default App
