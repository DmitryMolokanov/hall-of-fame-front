import { Link } from 'react-router-dom';
import cls from '../../Header.module.scss'
import { FC } from 'react';

interface MenuProps {
    className: string
}

const Menu: FC<MenuProps> = ({ className }) => {

    const navList = [
        {
            name: 'MAIN',
            link: '/',
        },
        {
            name: 'BOXERS',
            link: '/boxers',
        },
        {
            name: 'КНОПКА',
            link: '#',
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
