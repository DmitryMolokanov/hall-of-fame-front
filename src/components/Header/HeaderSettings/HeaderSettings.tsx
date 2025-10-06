import cls from '@components/Header/Header.module.scss'
import darkModeIcon from '@assets/icons/common/dark-mode.svg'
import userIcon from '@assets/icons/common/user.svg'

const HeaderSettings = () => {
    return (
        <div className={cls.headerSettings}>
            <div
                role='button'
                className={cls.headerSettingsItem}
            >
                <img src={darkModeIcon} alt="dark_mode" />
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
