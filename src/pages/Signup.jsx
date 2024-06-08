import style from "./Styles/Signup.module.css"
import axios from "axios"
import { useState, useEffect} from "react"
import signupStudent from "../assets/signupStudent.jpeg"
//Is useNavigate even used here, or for when directed to dashboard which haven't done yet?
import {Link, useNavigate} from "react-router-dom"


function Signup() {

  const navigate = useNavigate()

  const [userSignUpData, setUserSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [isNLengthValid, setIsNLengthValid] = useState(false)
  const [isNTouched, setIsNTouched] = useState(false)
  const [isPLengthValid, setIsPLengthValid] = useState(false)
  const [isPTouched, setIsPTouched] = useState(false)
  const [pWMatch, setPWMatch] = useState(false)
  const [isConfirmTouched, setIsConfirmTouched] = useState(false)

  useEffect(()  => {
    if (userSignUpData.name.length > 1){
      setIsNLengthValid(true)
    }else{
      setIsNLengthValid(false)
    }
  }, [userSignUpData.name])

  useEffect(()=> {
    if (userSignUpData.password.length > 5){
      setIsPLengthValid(true)
    }else{
      setIsPLengthValid(false)
    }
  }, [userSignUpData.password])

  useEffect(() => {
    if (userSignUpData.confirmPassword !== userSignUpData.password){
      setPWMatch(false)
    }else{
      setPWMatch(true)
    }
  }, [userSignUpData.confirmPassword, userSignUpData.password])


  function handleChange(e){
    const {name, value} = e.target
    setUserSignUpData(prev => ({
      ...prev,
      [name] : value
    }));
    if (name === "name" && !isNTouched) {
      setIsNTouched(true);
    }
    if (name === "password" && !isPTouched){
      setIsPTouched(true);
    }
    if (name === "confirmPassword" && !isConfirmTouched){
      setIsConfirmTouched(true);
    }
  }

  //do i need to handle authenticate like in mealJouranl line 74? did I alread do in return of signup function?
  async function handleSubmit(e){
    e.preventDefault()
    console.log("handleSubmit has run")
    const {email, name, password, confirmPassword} = userSignUpData
    try{
      const res = await axios.post("http://localhost:4000/user/sign-up", {email, name, password})
      console.log("THIS IS THE RES", res)
      if (res.status === 200){
        alert("User was created")
        //3) Set localStorages, navigate
        window.localStorage.setItem("currentUserLoggedIn", res.data.id)
        navigate("/dashboard")
      }
    //4) Catch
    }catch(error){
      console.log("This error", error)
    }
  }

  return (
    <div className={style.componentContainer}>
      <div className={style.leftImageContainer}>
        <img className={style.leftImage} src={signupStudent} alt="student and adult using a laptop"/>
      </div>

      <div className={style.rightTextContainer}>
        <div className={style.contentsContainer}>
          <h1 className={style.title}>Welcome to FactHunter</h1>
             {/* <div className={style.outerFormContainer}>  */}
                  <form className={style.formContainer} onSubmit={handleSubmit}>
                  {isNTouched && !isNLengthValid && (
                      <p className={style.nameLengthInvalid}>Name must be at least two letters.</p>
                    )}
                    <input
                      type="text"
                      className={style.name}
                      name="name"
                      value={userSignUpData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required/>
                    <input
                      type="email"
                      className={style.email}
                      name="email"
                      value={userSignUpData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required/>

                    {isPTouched && !isPLengthValid && (
                      <p className={style.pwLengthInvalid}>Password must be at least 5 characters.</p>
                    )}
                    <input
                      type="password"
                      className={style.password}
                      name="password"
                      value={userSignUpData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required/>
                    { isConfirmTouched && !pWMatch && (
                  <p className={style.passwordsMatch}>Confirmation password does not match password.</p>
                  )} 
                    <input
                      type="password"
                      className={style.confirmPassword}
                      name="confirmPassword"
                      value={userSignUpData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      required/>
            <div className={style.buttonAndMessage}>
             <button className={style.button}>Sign Up</button>
              <p className={style.loginMessage}>Have an account? <Link className={style.login}to={"/login"}>Log in</Link></p>
            </div>
            </form>      
          </div>
      </div>
    </div>
  )
}

export default Signup
