import { useState } from 'react'
import Button from '@/components/Button/Animation.jsx';
import style from '@/css/app.module.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className={style.container}>
      <div>
        Bem vindo ao ToDoList
      </div>
      <div>
        <Button></Button>
      </div>
      
    </div>

  )
}

export default App
