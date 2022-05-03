import styles from "./Animate.module.css"
import { useState } from "react"

export const Animate = <P extends object>(BaseComponent: React.ComponentType<P>) => {
  const Animated = (props: P) => {
    const [mouseOver, setMouseOver] = useState(false)

    return (
      <div
        className={mouseOver ? styles.tadaAnimation : ""}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        <BaseComponent {...props}></BaseComponent>
      </div>
    )
  }
  return Animated
}
