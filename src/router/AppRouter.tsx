import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layout/AppLayout/AppLayout';
import MainPage from '@pages/MainPage/MainPage';
import BoxersPage from '@/pages/Boxer/BoxersPage/BoxersPage';
import BoxerCategoriesPage from '@/pages/Boxer/BoxerCategoriesPage/BoxerCategoriesPage';
import BoxerInfoPage from '@/pages/Boxer/BoxerInfoPage/BoxerInfoPage';
import RolesPage from '@/pages/BeyondTheRing/RolesPage/RolesPage';
import PeopleListPage from '@/pages/BeyondTheRing/PeopleListPage/PeopleListPage';
import PersonPage from '@/pages/BeyondTheRing/PersonPage/PersonPage';


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<MainPage />} />
                    {/* category cards: Modern, Late Era, Early Era, Pioneer */}
                    <Route path="/boxers" element={<BoxerCategoriesPage />} />
                    {/* the list stays mounted under the profile, so returning keeps loaded rows and scroll */}
                    <Route path="/boxers/:category" element={<BoxersPage />}>
                        <Route path=":slug" element={<BoxerInfoPage />} />
                    </Route>
                    {/* Beyond the Ring: trainers, promoters and other non-boxer inductees */}
                    <Route path="/beyond-the-ring" element={<RolesPage />} />
                    <Route path="/beyond-the-ring/:role" element={<PeopleListPage />}>
                        <Route path=":slug" element={<PersonPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default AppRouter
