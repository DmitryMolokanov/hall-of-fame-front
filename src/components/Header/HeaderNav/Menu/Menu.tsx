import { Link } from 'react-router-dom';
import cls from '../../Header.module.scss'
import { FC } from 'react';
import mainImg from '@assets/icons/menu/home.svg'
import boxersImg from '@assets/icons/menu/boxer-сards.svg'
import beyondTheRingImg from '@assets/icons/menu/beyond-the-ring.svg'

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
        {
            link: '/beyond-the-ring',
            name: 'BEYOND THE RING',
            img: beyondTheRingImg,
        },

    ]

    return (
        <nav>
            <ul className={className}>
                {
                    navList.map((item) => {
                        return <li key={item.link}>
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
