import mainImage from '@assets/image/main-image.jpg'
import arrowRight from '@assets/icons/common/arrow-right.svg'
import cls from './MainPage.module.scss'
import AnimationWrapper from '@/components/AnimationWrapper/AnimationWrapper'
import { Button } from '@/components/Buttons/Button'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { ImageCredit, ImageCreditData } from '@/components/ImageCredit/ImageCredit'

// main-image.jpg is the 1920px Wikimedia Commons rendition of this file
const heroImageCredit: ImageCreditData = {
    imageAuthor: 'DASonnenfeld',
    imageLicense: 'CC BY-SA 4.0',
    imageLicenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Boxing-Hall-of-Fame-02.jpg',
}

// Facts on this page follow the English Wikipedia article "International Boxing Hall of Fame".
// This is an independent project: do not present it as the Hall's official site.
const MainPage = () => {
    const navigate = useNavigate()

    return (
        <div className={cls.mainPageWrapper}>
            <figure className={cls.hero}>
                <img src={mainImage} alt="Entrance sign of the International Boxing Hall of Fame in Canastota, New York" />
                <div className={cls.heroOverlay} />
                <div className={cls.heroContent}>
                    <span className={cls.heroKicker}>Canastota, New York · Inductions since 1990</span>
                    <h1 className={cls.heroTitle}>
                        Legends of the Ring
                    </h1>
                    <p className={cls.heroTagline}>
                        An independent guide to the fighters enshrined in the International Boxing Hall of Fame.
                    </p>
                </div>
                <ImageCredit credit={heroImageCredit} className={cls.heroCredit} />
            </figure>

            <AnimationWrapper>
                <p className={cls.lead}>
                    Every June, a small village in upstate New York becomes the capital of boxing.
                    Since 1990, the International Boxing Hall of Fame in Canastota has inducted the
                    fighters, trainers, promoters and writers who shaped the sport. This site collects
                    the stories of the boxers it honors: their records, their careers and the fights
                    that made them legends.
                </p>
            </AnimationWrapper>

            <AnimationWrapper>
                <article className={cls.section}>
                    <h2 className={classNames(cls.title, cls.sectionTitle)}>
                        Why Canastota
                    </h2>
                    <p className={classNames(cls.paragraph, cls.firstParagraph)}>
                        Canastota calls itself “Titletown, USA”, and with good reason: the village gave
                        boxing two world champions. Carmen Basilio, a former onion-field worker, won world
                        titles at welterweight and middleweight and beat Sugar Ray Robinson in 1957. His
                        nephew, Billy Backus, took the welterweight crown from José Nápoles in 1970.
                    </p>

                    <p className={cls.paragraph}>
                        In the 1980s, local resident Ed Brophy set out to honor the two champions. The idea
                        quickly outgrew the village: the museum opened in 1989, and the following June
                        the first class of inductees was enshrined. Since then the ceremony has been held
                        on the second Sunday of June, at the end of a Hall of Fame Weekend that brings
                        together former champions and fans from around the world.
                    </p>

                    <p className={cls.paragraph}>
                        It was not the first attempt to build such a hall. The Ring magazine ran its own
                        Boxing Hall of Fame at Madison Square Garden from 1954 to 1987. Almost all of its
                        155 members were later inducted in Canastota as well.
                    </p>
                </article>
            </AnimationWrapper>

            <AnimationWrapper>
                <article className={cls.section}>
                    <h2 className={classNames(cls.title, cls.sectionTitle)}>
                        How a Fighter Gets In
                    </h2>
                    <p className={classNames(cls.paragraph, cls.firstParagraph)}>
                        A boxer becomes eligible three years after his or her last fight (until 2019 the
                        wait was five years). Candidates are voted in by members of the Boxing Writers
                        Association of America and an international panel of boxing historians.
                    </p>

                    <p className={cls.paragraph}>
                        Fighters are judged within their own era, so a bare-knuckle champion never
                        competes for a place with a modern pay-per-view star:
                    </p>

                    <ul className={cls.categoryList}>
                        <li><strong>Modern</strong> — last bout in 1989 or later.</li>
                        <li><strong>Late Era</strong> — last bout between 1943 and 1988.</li>
                        <li><strong>Early Era</strong> — fought between 1893 and 1942.</li>
                        <li><strong>Pioneers</strong> — the bare-knuckle era, last bout in 1892 or earlier.</li>
                    </ul>

                    <p className={cls.paragraph}>
                        Separate categories honor non-participants, such as trainers, promoters and
                        managers, and observers: journalists, historians and artists. Since the class
                        of 2020, women boxers have been inducted too.
                    </p>
                </article>
            </AnimationWrapper>

            <AnimationWrapper>
                <article className={cls.section}>
                    <h2 className={classNames(cls.title, cls.sectionTitle)}>
                        What You Will Find Here
                    </h2>
                    <p className={classNames(cls.paragraph, cls.firstParagraph)}>
                        Each fighter has a profile with dates of birth and induction, a full professional
                        record with wins, losses, draws and knockouts, and a biography. The table can be
                        sorted by name, date of birth, year of induction or number of bouts, and the
                        search finds any boxer by name.
                    </p>

                    <p className={cls.paragraph}>
                        The collection is growing: it already spans from Henry Armstrong, who held three
                        world titles at once in 1938, to Wladimir Klitschko, but not every inductee is
                        here yet. Photos come from Wikimedia Commons and are credited on each profile.
                    </p>
                </article>
            </AnimationWrapper>

            <AnimationWrapper>
                <footer className={cls.cta}>
                    <p className={cls.ctaTitle}>Meet the fighters</p>
                    <Button
                        label="Browse all boxers"
                        icon={arrowRight}
                        iconPosition="right"
                        imgAnimation="rightSideMove"
                        onClick={() => navigate('/boxers')}
                    />
                    <p className={cls.disclaimer}>
                        This is an independent fan project and is not affiliated with the International
                        Boxing Hall of Fame. Official website:{' '}
                        <a href="https://www.ibhof.com" target="_blank" rel="noopener noreferrer">ibhof.com</a>.
                    </p>
                </footer>
            </AnimationWrapper>
        </div>
    )
};

export default MainPage
