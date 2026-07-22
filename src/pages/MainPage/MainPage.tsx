import mainImage from '@assets/image/main-image.jpg'
import cls from './MainPage.module.scss'
import AnimationWrapper from '@/components/AnimationWrapper/AnimationWrapper'
import classNames from 'classnames'

const MainPage = () => {

    return (
        <div className={cls.mainPageWrapper}>
            <section className={cls.hero}>
                <img src={mainImage} alt="International Boxing Hall of Fame" />
                <div className={cls.heroOverlay} />
                <div className={cls.heroContent}>
                    <span className={cls.heroKicker}>Canastota, New York · Est. 1990</span>
                    <h1 className={cls.heroTitle}>
                        International Boxing Hall of Fame
                    </h1>
                    <p className={cls.heroTagline}>
                        Where boxing honors its greatest names and keeps their stories alive.
                    </p>
                </div>
            </section>

            <AnimationWrapper>
                <p className={cls.lead}>
                    Boxing is a sport of moments — a single punch, a comeback no one saw coming,
                    a champion who simply refused to fall. The International Boxing Hall of Fame
                    exists so those moments are never lost. It is more than a museum; it is a living
                    archive of the sport, a place that honors the fighters who defined boxing along
                    with the many people behind them who kept it alive. Whether you have followed
                    every round for decades or are just discovering the ring, you are welcome here.
                </p>
            </AnimationWrapper>

            <AnimationWrapper>
                <article className={cls.section}>
                    <h2 className={classNames(cls.title, cls.sectionTitle)}>
                        Why the Hall Exists
                    </h2>
                    <p className={cls.paragraph}>
                        For most of boxing’s history, there was no single place to honor its greatest
                        names. The sport produced legend after legend, yet their stories stayed
                        scattered — kept alive in old newspapers, fading photographs, and the memories
                        of the people who were there. The Hall of Fame was created to change that: to
                        give boxing one home where its champions, trainers, promoters, and writers are
                        remembered together. Because a great fight is never the work of one person alone.
                    </p>
                </article>
            </AnimationWrapper>

            <AnimationWrapper>
                <article className={cls.section}>
                    <h2 className={classNames(cls.title, cls.sectionTitle)}>
                        A Home in Canastota
                    </h2>
                    <p className={classNames(cls.paragraph, cls.firstParagraph)}>
                        Turning that idea into a real place took years of work by fans, historians, and
                        former fighters who believed the sport deserved a lasting tribute. Different
                        efforts came and went over the years, but by the late 1980s the momentum was
                        finally there.
                    </p>

                    <p className={cls.paragraph}>
                        The Hall found its home in Canastota, New York — the small town that raised
                        world champion Carmen Basilio. Known for his toughness and heart, Basilio
                        embodied boxing’s working-class roots, and tying the institution to his
                        hometown gave it a fitting sense of place.
                    </p>

                    <p className={cls.paragraph}>
                        After years of planning and fundraising, the International Boxing Hall of Fame
                        opened its doors on June 10, 1990. It was more than the opening of a building —
                        it was the start of a permanent place to recognize the people and moments that
                        shaped the sport.
                    </p>
                </article>
            </AnimationWrapper>

            <AnimationWrapper>
                <article className={cls.section}>
                    <h2 className={classNames(cls.title, cls.sectionTitle)}>
                        More Than a Museum
                    </h2>
                    <p className={classNames(cls.paragraph, cls.firstParagraph)}>
                        Since then, the Hall has grown into far more than a collection of exhibits.
                        Every year a new class of inductees is chosen through a respected voting process
                        led by the Boxing Writers Association of America (BWAA) and the International
                        Boxing Research Organization (IBRO) — an honor reserved for those who truly left
                        their mark on the sport.
                    </p>

                    <p className={cls.paragraph}>
                        Inside, the galleries trace boxing’s most dramatic chapters. From Muhammad Ali’s
                        gloves to Rocky Marciano’s championship robe, from the raw power of Jack Dempsey
                        to the champions of today, the collection lets visitors stand face to face with
                        the history of the sport.
                    </p>

                    <p className={cls.paragraph}>
                        But the Hall’s mission reaches beyond its walls. It promotes the history of
                        boxing, supports charitable causes, and helps a wider audience appreciate the
                        skill, courage, and drama of the ring. For fans it is a pilgrimage, for
                        researchers an archive, and for newcomers an unforgettable first look at the sport.
                    </p>
                </article>
            </AnimationWrapper>

            <AnimationWrapper>
                <footer className={cls.cta}>
                    <p>Discover the stories that shaped the sport.</p>
                    <p>Relive the moments that made history.</p>
                    <p>Celebrate the legends who never backed down.</p>
                    <p>Your journey into boxing history starts here.</p>
                    <p className={cls.ctaTitle}>Welcome to the International Boxing Hall of Fame!</p>
                </footer>
            </AnimationWrapper>
        </div>
    )
};

export default MainPage
