import style from "./Styles/Signup.module.css"
import signupStudent from "../assets/signupStudent.jpeg"
import {Link} from "react-router-dom"
import { useState } from "react"

function Signup() {
  return (
    <div className={style.componentContainer}>
      <div className={style.leftImageContainer}>
        <img className={style.leftImage} src={signupStudent} alt="student and adult using a laptop"/>
      </div>

      <div className={style.rightTextContainer}>
          <h1 className={style.title}>Welcome to FactHunter</h1>
             {/* <div className={style.outerFormContainer}>  */}
              <form className={style.formContainer}>
                <input
                  type="text"
                  className={style.name}
                  name="name"
                  placeholder="Name"
                  required/>
                <input
                  type="email"
                  className={style.email}
                  name="email"
                  placeholder="Email"
                  required/>
                <input
                  type="password"
                  className={style.password}
                  name="password"
                  placeholder="Password"
                  required/>
                <input
                  type="password"
                  className={style.confirmPassword}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required/>
              </form>
            {/* </div> */}
            <button className={style.button}>Sign Up</button>
              <p className={style.loginMessage}>Have an account? <Link className={style.login}to={"/login"}>Log in</Link></p>
      </div>
    </div>
  )
}

export default Signup
