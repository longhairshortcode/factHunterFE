import style from "./Create.module.css"
import { useState, useContext } from "react"
import { AuthContext } from "../../../../App"
import axios from "axios"

function Create() {
const {user} = useContext(AuthContext)

const [flashcardData, setFlashcardData] = useState({
  fact: "",
  product: "",
})

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
                <input
                    type="text"
                    className={style.fact}
                    name="fact"
                    value={flashcardData.fact}
                    onChange={handleChange}
                    placeholder="Fact:"
                    required
                />
                <input
                    type="text"
                    className={style.product}
                    name="product"
                    value={flashcardData.product}
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
