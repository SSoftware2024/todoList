import { useState } from 'react'
import Button from '@/components/Button/Animation.jsx';
import style from '@/css/app.module.css'

function App() {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1>Bem vindo ao ToDoList!</h1>
      </div>
      <div className={style.container_buttons}>
        <Button name='Login'></Button>
        <Button name='Registrar'></Button>
        <Button name='Demo'></Button>
      </div>
      
    </div>

  )
}

export default App
