import style from "./Styles/Login.module.css"
import {Link} from "react-router-dom"

function Login() {
  return (
    <div className={style.componentContainer}>
    {/* <div className={style.leftImageContainer}><img className={style.leftImage} src={signupStudent} alt="student and adult using a laptop"/>
    </div> */}

    <div className={style.middleContainer}>
      <div className={style.contentsContainer}>
       <div className={style.h1AndSubheader}> 
        <h1 className={style.title}>Welcome Back</h1>
        <p className={style.subheader}>Please enter your e-mail and password.</p>
       </div>                 
            <form className={style.formContainer}>
                  <input
                    type="email"
                    className={style.email}
                    name="email"
                    // value={userSignUpData.email}
                    // onChange={handleChange}
                    placeholder="Email"
                    required/>

        
                  <input
                    type="password"
                    className={style.password}
                    name="password"
                    // value={userSignUpData.password}
                    // onChange={handleChange}
                    placeholder="Password"
                    required/>
                <div className={style.forgotContainer}>
                <p className={style.forgot}>Forget your password? Click <Link className={style.createOne}to={"/sign-up"}>here</Link>.</p>
                </div> 
          <div className={style.buttonAndMessage}>
           <button className={style.button}>Login</button>
            <p className={style.message}>Don't have an account? Create one <Link className={style.createOne}to={"/sign-up"}>here.</Link></p>
          </div>
          </form>      
        </div>
    </div>
  </div>
  )
}

export default Login
