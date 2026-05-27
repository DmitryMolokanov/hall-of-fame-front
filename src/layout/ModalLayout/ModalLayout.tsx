import { FC, ReactNode } from 'react';
import cls from './ModalLayout.module.scss'
import classNames from 'classnames';

interface ModlaLayoutProps {
    visible: boolean,
    children: ReactNode
}

const ModlaLayout: FC<ModlaLayoutProps> = ({ children, visible }) => {
    return (
        <div className={classNames(cls.modalLayout, { [cls.visible]: visible })}>
            {children}
        </div>
    )
};

export default ModlaLayout
