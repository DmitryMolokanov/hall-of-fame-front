import { Link } from 'react-router-dom';
import cls from '../../Header.module.scss'

const Menu = () => {

    const navList = [
        {
            name: 'BOXERS',
            link: '#',
        },
        {
            name: 'КНОПКА',
            link: '#',
        },
    ]

    return (
        <nav>
            <ul className={cls.desktopMenu}>
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
