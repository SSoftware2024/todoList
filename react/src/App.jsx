import Button from '@/components/Button/Animation.jsx';
import style from '@/css/app.module.css'
import instance from '@/js/configAxios.js';
import { user as userEndpoint } from '@/js/endpoints.js';
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  async function login() {
    const axios = await instance();
    axios({
      method: 'POST',
      url: userEndpoint.login,
      data: {
        email: 'demo@example.com',
        password: 'senha123',
      },
    }).then((result) => {
      const user = result.data;
      if (user?.email) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/auth/toDo/');
      }

    });
  }
  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1>Bem vindo ao ToDoList!</h1>
      </div>
      <div className={style.container_buttons}>
        <Button name='Login' url='/auth/login' isLink={true}></Button>
        <Button name='Registrar' url='/auth/register' isLink={true}></Button>
        <Button name='Demo' onClick={login}></Button>
      </div>

    </div>

  )
}

export default App
