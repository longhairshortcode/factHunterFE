import style from "../layout/Footer.module.css"
import { PiDetectiveBold } from "react-icons/pi";
import { IoLogoFacebook } from "react-icons/io";
import { AiFillTwitterSquare } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";
import { ImYoutube } from "react-icons/im";

function Footer() {
    return (
      <div className={style.componentContainer}>
        <div className={style.left}>
            <div className={style.logoContainer}>
                <p className={style.title}><PiDetectiveBold />FactHunter</p>
            </div>
            <ul className={style.leftUL}>
              <li className={style.li}>About</li>
              <li className={style.li}>How It Works</li>
              <li className={style.li}></li>
            </ul>
        </div>
        <div className={style.middle}>
            {/* <div className={style.center}> */}
            <p className={style.title}>Company</p>
            <ul className={style.middleUL}>
              <li className={style.li}>About</li>
              <li className={style.li}>FAQ</li>
              <li className={style.li}>Support</li>
              <li className={style.li}>Contact</li>
            </ul>
            {/* </div> */}
        </div>
        <div className={style.right}>
            <div className={style.center}>
                <p className={style.title}>Follow</p>
                <div className={style.socialsContainer}>
                    <p className={style.socialsParagraph} >
                    <span><IoLogoFacebook /></span>
                    <span><AiFillTwitterSquare /></span>
                    <span><FaSquareInstagram /></span>
                    <span><ImYoutube /></span>
                    </p>
            </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default Footer