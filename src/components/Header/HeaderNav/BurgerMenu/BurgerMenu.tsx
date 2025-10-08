import { useState } from 'react';
import cls from '../../Header.module.scss'
import burgerMenuIcon from '@assets/icons/common/menu.svg'
import Menu from '../Menu/Menu';
import classNames from 'classnames';

const BurgerMenu = () => {

    const [openMenu, setOpenMenu] = useState(false)

    const handleMenu = () => {
        setOpenMenu(prev => !prev)
    }

    return (
        <div className={cls.mobileMenu}>
            <div
                role='button'
                className={cls.mobileMenuBtn}
                onClick={handleMenu}
            >
                <img src={burgerMenuIcon} alt="menu" />

                <div className={classNames(cls.mobileMenuContent, { [cls.visible]: openMenu })}>
                    <Menu className={cls.mobileMenuList} />
                </div>

            </div>
        </div>
    )
};

export default BurgerMenu
