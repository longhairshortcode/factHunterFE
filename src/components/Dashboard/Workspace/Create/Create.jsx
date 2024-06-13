import style from "./Create.module.css"
import axios from "axios"
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../../../App"
import additionChart from "./additionChart.png"
import subtractionChart from "./subtractionChart.png"
import multiplicationChart from "./multiplicationChart.png"
import divisionChart from "./divisionChart.png"
import {Outlet, Link} from "react-router-dom"


function Create() {
const {user} = useContext(AuthContext)

const [flashcardData, setFlashcardData] = useState({
  question: "",
  answer: "",
  id: "",
  subject: "",
  topic: "",
  subtopic: "",
})

const mathTopic = ["addition", "subtraction", "multiplication", "division"]
const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] 
const readingTopic = ["vowels", "consonants"]

const [topic, setTopic] = useState([])
// const [subtopic, setSubtopic] = useState(number)
const [chartImage, setChartImage] = useState(null)

useEffect(()=>{
setTopic(flashcardData.subject === "math" ? mathTopic : flashcardData.subject == "reading" ? readingTopic : [])
}, [flashcardData.subject])

// useEffect(()=>{
//   setSubtopic(flashcardData.topic === "addition" ? mathTopic : flashcardData.topic == "reading" ? readingTopic : [])
// }, [])

useEffect(()=>{
  setChartImage(flashcardData.topic === "addition" ? additionChart : flashcardData.topic === "subtraction" ? subtractionChart 
  : flashcardData.topic === "multiplication" ? multiplicationChart : flashcardData.topic === "division" ? divisionChart : null) 
}, [flashcardData.topic])

function handleChange(e){
  const {name, value} = e.target 
  setFlashcardData(prev=>({
    ...prev,
    [name] : value
  }));
}

async function handleSubmit(e){
  e.preventDefault()
  console.log("handleSubmit has run")
  const {fact, product} = flashcardData
  try{
    const res = await axios.post("http://localhost:4000/flashcard/create", {fact, product, userId : user.id})
    console.log("THIS IS THE RES: ", res)
    if (res.status === 200)
      console.log("The flashcard was created successfully")
  }catch(err){
    console.log(err)
  } 
  
}

  return (
  <div className={style.componentContainer}>
    <div className={style.titleLinksFormAndChartContainer}>
      <div className={style.titleLinksFormContainer}>
      <p className={style.practice}>Create</p>
      <div>
        
      </div>
      {/* <div className={style.links}>
        {Array(12).fill(null).map((_, index)=>(
          <Link className={style.numberButton} key={index + 1} to={`${index + 1}`}>{index + 1} Facts </Link>
        ))}
      </div>  */}
      <div className={style.formContainer}>
              <form className={style.form} onSubmit={handleSubmit}>
                <select
                    className={style.subject}
                    name="subject"
                    value={flashcardData.subject}
                    onChange={handleChange}
                    required
                >
                  <option className={style.pickSubject}>Pick Subject</option>
                  <option className={style.math} value="math">Math</option>
                  <option className={style.reading} value="reading">Reading</option> 
                </select>
                <select
                    className={style.topic}
                    name="topic"
                    value={flashcardData.topic}
                    onChange={handleChange}
                    required
                >
                  <option className={style.pickTopic}>Pick Topic</option>
                  {topic.map((topic, index)=>(
                    <option key={index} className={style.topic}>{topic}</option>
                  ))} 
                </select>
                { flashcardData.subject === "math" ? 
                <select
                    className={style.subtopic}
                    name="subtopic"
                    value={flashcardData.subtopic}
                    onChange={handleChange}
                    required
                >
                  <option className={style.pickSubtopic}>Pick Subtopic</option>
                  {number.map((number, index)=>(
                    <option key={index} className={style.number}>{number}</option>
                  ))} 
                </select>
                :<></>
                  }
                <input
                    type="text"
                    className={style.question}
                    name="question"
                    value={flashcardData.question}
                    onChange={handleChange}
                    placeholder="Type Question"
                    required
                />
                <input
                    type="text"
                    className={style.answer}
                    name="answer"
                    value={flashcardData.answer}
                    onChange={handleChange}
                    placeholder="Type Answer"
                    required
                />
              </form>
      </div>
    </div>    
    <div className={style.chartContainer}>
          <div className={style.chartImageContainer}>
              { chartImage &&
                <img className={style.image} src={chartImage}/>
              } 
            :<></>
            
          </div>  
      </div>  
    </div>
    <Outlet/>
  </div>
  )
}
  
export default Create
