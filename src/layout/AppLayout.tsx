import Footer from '@/components/Footer/Footer';
import Header from '@components/Header/Header';
import { Outlet } from 'react-router-dom';
import cls from './AppLayout.module.scss'

const AppLayout = () => {
    return (
        <div className={cls.appLayoutWrapper}>
            <Header />
            <main className={cls.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
};

export default AppLayout
