import classNames from 'classnames';
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import cls from './AnimationWrapper.module.scss'

interface AnimationWrapperProps {
  children: ReactNode
}


const AnimationWrapper: FC<AnimationWrapperProps> = ({ children }) => {

  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    })
    observer.observe(element)

    return () => observer.disconnect();
  }, [])

  return (
    <div ref={ref} className={classNames(cls.animationWrapper, { [cls.visible]: isVisible })}>
      {children}
    </div>
  )
};

export default AnimationWrapper
