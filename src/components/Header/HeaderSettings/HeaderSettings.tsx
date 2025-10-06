import cls from '@components/Header/Header.module.scss'
import darkModeIcon from '@assets/icons/common/lightTheme/dark-mode.svg'
import userIcon from '@assets/icons/common/lightTheme/user.svg'
import lightModeIcon from '@assets/icons/common/darkTheme/light-mode.svg'
import userLightIcon from '@assets/icons/common/darkTheme/user-light.svg'
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
                <img src={theme === ThemeMode.LIGHT ? userIcon : userLightIcon} alt="user" />
            </div>

            <div
                role='button'
                className={cls.headerSettingsItem}
            >
                <button>Check theme</button>
            </div>


        </div>
    )
};

export default HeaderSettings
