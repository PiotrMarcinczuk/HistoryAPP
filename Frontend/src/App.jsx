import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  // fetch articles along with their covers
  const fetch = async () => {
    const response = await axios.get("http://localhost:1337/api/articles");
    console.log(response.data.data);
  }

  useEffect(() => {
    fetch();
  }, [])

  return (
    <>
      <div>fddsfsdfsdfsd</div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
