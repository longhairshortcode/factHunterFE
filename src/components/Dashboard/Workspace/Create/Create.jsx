import style from "./Create.module.css"
import axios from "axios"
import { useState, useContext } from "react"
import { AuthContext } from "../../../../App"


function Create() {
const {user} = useContext(AuthContext)

const [flashcardData, setFlashcardData] = useState({
  question: "",
  answer: "",
  id: "",
  category: "",
})

const math = ["addition", "subtration", "multiplication", "division"]
const reading = ["vowels", "consonants"]

const [subCategory, setSubCategory] = useState(flash.category == "math" ? math : flash.category == "reading" ? reading : [])



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
            <div className={style.formContainer}>
              <form className={style.form} onSubmit={handleSubmit}>
                <select
                    className={style.category}
                    name="category"
                    value={flashcardData.category}
                    onChange={handleChange}
                    required
                >
                  <option className={style.pickSubject}>Pick Subject</option>
                  <option className={style.math} value="math">Math</option>
                  <option className={style.reading} value="reading">Reading</option> 
                </select>
                <input
                    type="text"
                    className={style.question}
                    name="fact"
                    value={flashcardData.question}
                    onChange={handleChange}
                    placeholder="Fact:"
                    required
                />
                <input
                    type="text"
                    className={style.answer}
                    name="product"
                    value={flashcardData.answer}
                    onChange={handleChange}
                    placeholder="Product:"
                    required
                />
              </form>
            </div>
    </div>
  )
}
  
export default Create
