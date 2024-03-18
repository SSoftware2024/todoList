import style from '@/css/components/button.module.scss';
import { useNavigate } from "react-router-dom";
export default function Animation({name,url='',color=''}) {
    const navigate = useNavigate();
    return (
        <button className={`${style.button_animation} ${style[color]}`} onClick={() => navigate(url)}>
            <span>{name}</span>
        </button>

    )
}


