import style from '@/css/components/button.module.css';
function Animation({name,url='',color='primary'}) {

    return (
        <button className={style.button_animation}>
            <p>{name}</p>
        </button>

    )
}

export default Animation;