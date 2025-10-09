import mainImage from '@assets/image/main-image.jpg'
import cls from './MainPage.module.scss'
import AnimationWrapper from '@/components/AnimationWrapper/AnimationWrapper'
import classNames from 'classnames'

const MainPage = () => {

    return (
        <div className={cls.mainPageWrapper}>
            <div className={cls.mainImgContainer}>
                <img src={mainImage} alt="international boxing hall of fame" />
            </div>

            <article className={cls.mainInfoContainer}>
                <AnimationWrapper>
                    <header>
                        <h1 className={cls.title}>
                            International Boxing Hall of Fame
                        </h1>
                    </header>
                </AnimationWrapper>

                <AnimationWrapper>
                    <p className={cls.paragraph}>
                        Step into a hallowed space where the echoes of thunderous punches, the roar of the crowd, and the unwavering spirit of champions converge.
                        The International Boxing Hall of Fame (IBHOF) stands as the ultimate testament to the enduring power and captivating drama of boxing.
                        This is  more than just a museum; this is a living archive,
                        a global center dedicated to honoring the iconic figures who have defined this ancient and noble sport,
                        and to meticulously preserving its rich, often untold, history for generations to come.
                        Whether you are a lifelong aficionado who has lived through every knockout and every controversial decision,
                        or a newcomer discovering the artistry and courage within the squared circle, our virtual gates are wide open,
                        inviting you to explore the compelling narratives that have shaped boxing into the universally celebrated phenomenon it is today.
                    </p>
                </AnimationWrapper>
            </article>

            <article className={cls.mainInfoContainer}>
                <AnimationWrapper>
                    <header>
                        <h3 className={cls.title}>
                            The Genesis of a Dream: Laying the Foundation for Boxing’s Pantheon
                        </h3>
                    </header>
                </AnimationWrapper>

                <AnimationWrapper>
                    <p className={cls.paragraph}>
                        The desire to formally recognize and immortalize boxing’s greatest talents is not a new one.
                        For decades, as the sport produced an astonishing lineage of heroes and spectacles, a void was felt – the absence of a centralized,
                        universally respected institution dedicated solely to their commemoration.
                        This growing sentiment, born from a profound love for boxing and a deep-seated commitment to ensuring its legacy would transcend time,
                        began to coalesce into a tangible vision: a Hall of Fame worthy of the sport’s giants.
                        This was not a limited aspiration, confined solely to the celebrated pugilists.
                        The architects of this dream understood that boxing’s soul resided not only in the raw power of its fighters
                        but also in the strategic brilliance of its trainers, the audacious vision of its promoters,
                        the insightful chronicling of its journalists, and the unwavering dedication of countless individuals who,
                        behind the scenes, kept the engine of the sport running.The concept was to create a comprehensive tapestry,
                        woven with the threads of every significant contribution to boxing’s storied existence.
                    </p>
                </AnimationWrapper>
            </article>

            <article className={cls.mainInfoContainer}>
                <AnimationWrapper>
                    <header>
                        <h3 className={cls.title}>
                            From Vision to Cornerstone: The Transformative Development of the IBHOF
                        </h3>
                    </header>
                </AnimationWrapper>

                <AnimationWrapper>
                    <p className={classNames(cls.paragraph, [cls.firstParagraph])}>
                        The path from conceptualization to the establishment of a physical institution was a arduous but inspiring journey,
                        fueled by the unwavering passion and collective effort of boxing enthusiasts, historians, and former fighters.
                        While various initiatives were explored throughout the mid-to-late 20th century,
                        it was in the late 1980s that the momentum truly solidified, setting the stage for a historic undertaking.
                    </p>

                    <p className={cls.paragraph}>
                        A pivotal moment arrived in 1988 with the momentous decision to establish the permanent
                        home of the International Boxing Hall of Fame in Canastota, New York. This choice held profound significance.
                        Canastota, the proud hometown of the legendary Hall of Famer Carmen Basilio, a man embodying the grit, determination,
                        and heart of a true champion, became intrinsically linked to the modern institution.
                        This geographic anchoring connected the future of boxing’s legacy to its powerful, working-class roots.
                    </p>

                    <p className={cls.paragraph}>
                        Under the astute leadership of dedicated visionaries and with the enthusiastic
                        support of the global boxing community – a community united by their
                        shared passion for the sport – the ambitious project of constructing the IBHOF facility commenced.
                        Years of meticulous planning, extensive fundraising campaigns that spanned continents,
                        and countless hours of tireless dedication from volunteers and staff culminated in a momentous occasion:
                        the grand opening of the Hall of Fame on June 10, 1990.
                        This landmark event wasn’t just the inauguration of a building; it was the formal christening of a sanctuary,
                        a place forever consecrated to the recognition, preservation, and celebration of boxing’s most extraordinary individuals and moments.
                    </p>
                </AnimationWrapper>
            </article>

            <article className={cls.mainInfoContainer}>
                <AnimationWrapper>
                    <header>
                        <h3 className={cls.title}>
                            An Evolving Pantheon: The Continuous Growth and Profound Impact of the IBHOF
                        </h3>
                    </header>
                </AnimationWrapper>

                <AnimationWrapper>
                    <p className={classNames(cls.paragraph, [cls.firstParagraph])}>
                        Since its auspicious beginnings, the International Boxing Hall of Fame has transcended its role as a static museum,
                        evolving into a dynamic and vibrant testament to the sport’s continuous evolution and its ever-expanding pantheon of greatness.
                        Each year, a distinguished class of inductees is meticulously selected through a rigorous and highly respected process.
                        This esteemed selection is a joint endeavor, drawing upon the expertise and historical knowledge of the Boxing Writers Association of America (BWAA)
                        and the International Boxing Research Organization (IBRO),
                        ensuring that only those who have demonstrably left an indelible mark on the sport are honored.
                    </p>

                    <p className={cls.paragraph}>
                        The IBHOF’s physical space has blossomed into an expansive and meticulously curated collection.
                        It houses an unparalleled array of artifacts, historical memorabilia, and immersive exhibits that artfully chronicle boxing’s
                        storied, complex, and often dramatic past. From the iconic gloves worn by Muhammad Ali in his most celebrated bouts,
                        to the championship robes of Rocky Marciano, from the legendary tales of Jack Dempsey’s ferocious
                        power to the dazzling performances and global impact of contemporary champions, the Hall of Fame offers an
                        experience that is both deeply educational and profoundly inspiring.
                        It provides a journey through time, allowing visitors to connect with the very essence of boxing history.
                    </p>

                    <p className={cls.paragraph}>
                        Beyond its tangible presence and its role as a historical repository,
                        the IBHOF serves a vital and multifaceted purpose within the boxing world.
                        It actively champions the promotion of boxing history, offering educational resources
                        and supporting boxing-related charitable endeavors that give back to communities.
                        Furthermore, it acts as a crucial nexus for fostering a deeper, more informed global appreciation for the
                        sport’s artistry, courage, and cultural significance. The IBHOF is more than a destination;
                        it is a pilgrimage site for boxing aficionados, an invaluable historical archive for researchers and scholars,
                        and an awe-inspiring destination that captivates and educates all who are drawn to the raw emotion,
                        strategic brilliance, and enduring dignity of the prize ring.
                    </p>
                </AnimationWrapper>
            </article>
            <footer className={cls.footer}>
                <p><span> Immerse yourself in the compelling stories</span></p>
                <p><span>Relive the unforgettable moments</span></p>
                <p><span>Celebrate the immortal legends</span></p>
                <p><span> Your journey into the heart of boxing history begins here</span></p>
                <p className={cls.footerLast}><span>Welcome to the International Boxing Hall of Fame!</span> </p>
            </footer>

        </div>
    )
};

export default MainPage
