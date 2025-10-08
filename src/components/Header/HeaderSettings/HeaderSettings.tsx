import cls from '@components/Header/Header.module.scss'
import darkModeIcon from '@assets/icons/common/dark-mode.svg'
import lightModeIcon from '@assets/icons/common/light-mode.svg'
import userIcon from '@assets/icons/common/user.svg'
import { useThemeStore } from '@/store/ThemeStore';
import { ThemeMode } from '@/types/ThemeTypes';

const HeaderSettings = () => {

    const { theme, toggleTheme } = useThemeStore()

    return (
        <div className={cls.headerSettings}>
            <div
                role='button'
                className={cls.headerSettingsItem}
                onClick={toggleTheme}
            >
                <img src={theme === ThemeMode.LIGHT ? darkModeIcon : lightModeIcon} alt="dark_mode" />
            </div>

            <div
                role='button'
                className={cls.headerSettingsItem}
            >
                <img src={userIcon} alt="user" />
            </div>

        </div>
    )
};

export default HeaderSettings
