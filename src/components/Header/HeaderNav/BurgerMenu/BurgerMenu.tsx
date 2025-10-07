import cls from '../../Header.module.scss'
import burgerMenuIcon from '@assets/icons/common/menu.svg'

const BurgerMenu = () => {
    return (
        <div className={cls.mobileMenu}>
            <img src={burgerMenuIcon} alt="menu" />
        </div>
    )
};

export default BurgerMenu
