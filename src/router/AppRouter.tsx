import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layout/AppLayout/AppLayout';
import MainPage from '@pages/MainPage/MainPage';
import BoxersPage from '@/pages/Boxer/BoxersPage/BoxersPage';
import BoxerInfoPage from '@/pages/Boxer/BoxerInfoPage/BoxerInfoPage';


const routeList = [
    {
        path: '/',
        element: <MainPage />
    },
    {
        path: '/boxers',
        element: <BoxersPage />
    },
    {
        path: '/boxers/:id',
        element: <BoxerInfoPage />
    }
]

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    {routeList.map((item) =>
                        <Route key={item.path} path={item.path} element={item.element} />
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default AppRouter
