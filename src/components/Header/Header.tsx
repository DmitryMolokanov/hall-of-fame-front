import cls from './Header.module.scss'
import HeaderNav from './HeaderNav/HeaderNav';
import HeaderSettings from './HeaderSettings/HeaderSettings';

const Header = () => {
    return (
        <header className={cls.header}>
            <HeaderNav />
            <HeaderSettings />
        </header>
    )
};

export default Header
