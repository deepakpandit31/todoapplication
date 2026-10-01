import { useState } from 'react'

import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div className="min-h-screen bg-gray-100 p-8">
  <h1 className="text-3xl font-bold">
    Todo App
  </h1>
</div>
  )
}

export default App
