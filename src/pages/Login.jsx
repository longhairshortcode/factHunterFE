import style from "./Styles/Login.module.css"
import {Link} from "react-router-dom"
import {useState, useContext} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../App"


function Login() {

  const {setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  })

  function handleChange(e) {
    const {name, value} = e.target
    setUserLogin(prev => ({
      ...prev,
      [name] : value 
    }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    const {email, password} = userLogin
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/login`, {email, password})
      console.log(res)
      if (res.status === 200){
        setUser(prev => ({
          ...prev,
          email: res.data.email,
          name: res.data.name,
          id: res.data.id 
        })
      );
      window.localStorage.setItem("currentUserLoggedIn", res.data.id)
      navigate("/dashboard")
      }
    }catch(error){
      console.log(error)
    }
  }

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
            <form className={style.formContainer} onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className={style.email}
                    name="email"
                    value={userLogin.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required/>

        
                  <input
                    type="password"
                    className={style.password}
                    name="password"
                    value={userLogin.password}
                    onChange={handleChange}
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

















