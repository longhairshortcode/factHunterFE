import style from "./Header.module.css"
import {Link} from "react-router-dom"

function Header() {
  return (
    <header className={style.headerContainer}>
        <div className={style.logoContainer}>
          <p className={style.logo}>FactHunter</p>
        </div>
        <div className={style.linksContainer}>
          <Link className={style.homeLink}>Home</Link>
          <Link className={style.aboutLink}>About</Link>
          <Link className={style.howItWorksLink}>How It Works</Link>
        </div>
        <div className={style.loginButtonContainer}>
          <p className={style.loginButton}>Login</p>
        </div>
        
    </header>
  )
}

export default Header
