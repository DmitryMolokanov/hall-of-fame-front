import { Link } from 'react-router-dom';
import cls from '../../Header.module.scss'
import { FC } from 'react';
import mainImg from '@assets/icons/menu/home.svg'
import boxersImg from '@assets/icons/menu/boxer-сards.svg'

interface MenuProps {
    className: string
}

const Menu: FC<MenuProps> = ({ className }) => {

    const navList = [
        {
            link: '/',
            name: 'MAIN',
            img: mainImg,
        },
        {
            link: '/boxers',
            name: 'BOXERS',
            img: boxersImg,
        },

    ]

    return (
        <nav>
            <ul className={className}>
                {
                    navList.map((item) => {
                        return <li>
                            <Link
                                to={item.link}
                                className={cls.menuLink}
                            >
                                <img src={item.img} alt="icon" />
                                {item.name}
                            </Link>
                        </li>

                    })
                }
            </ul>
        </nav >
    )

};

export default Menu
