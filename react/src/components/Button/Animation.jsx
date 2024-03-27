import style from '@/css/components/button.module.scss';
import { useNavigate } from "react-router-dom";
function Animation({ name, url = '', color = '', isLink = false, onClick }) {
    const navigate = useNavigate();
    const handleClick = () => {
        if (isLink) {
            navigate(url);
        } else {
            onClick();
        }
    };
    return (
        <button className={`${style.button_animation} ${style[color]}`} onClick={handleClick}>
            <span>{name}</span>
        </button>
    )
}
export default Animation;

