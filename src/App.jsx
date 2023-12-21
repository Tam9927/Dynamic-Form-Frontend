import { useState } from 'react'
import ToDoForm from './ToDoForm'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
<div className="App"> 
      <ToDoForm></ToDoForm>
    </div> 
  )
}

export default App
