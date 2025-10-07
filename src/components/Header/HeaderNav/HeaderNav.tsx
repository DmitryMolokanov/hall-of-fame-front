import cls from '../Header.module.scss'
import BurgerMenu from './BurgerMenu/BurgerMenu';
import Menu from './Menu/Menu';

const HeaderNav = () => {

    // отображается вариант в зависимости от ширины экрана. проверка ширины в Header.module.scss media

    return (
        <div className={cls.headerNav}>
            <Menu />
            <BurgerMenu />
        </div >
    )
};

export default HeaderNav
