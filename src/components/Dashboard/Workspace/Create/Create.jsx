import { Outlet, useNavigate } from "react-router-dom";
import style from './Create.module.css';
import { useState, useContext, useEffect } from "react";
import { AuthContext, ToastContext } from "../../../../App";
import additionChart from "./additionChart.png";
import subtractionChart from "./subtractionChart.png";
import multiplicationChart from "./multiplicationChart.png";
import divisionChart from "./divisionChart.png";
import axios from "axios";





function Create() {





//Initialize Contexts/Navigate Brought In
  const { user } = useContext(AuthContext);
  const { notifySuccess, notifyError } = useContext(ToastContext);
  const navigate = useNavigate();
  





  //STATES
  const [flashcardData, setFlashcardData] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    question: "",
    answer: "",
    userId: user ? user.id : null
  });

  const [topicsToShow, setTopicsToShow] = useState([]);
  const [subtopicsToShow, setSubtopicsToShow] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [chartImage, setChartImage] = useState(null);
  
  




  //Variable Arrays
  const mathTopics = ["addition", "subtraction", "multiplication", "division"];
  const readingTopics = ["vowels", "consonants"];
  const mathSubtopics = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const readingSubtopics = ['long a', 'short a', 'long e', 'short e', 'long i', 'short i', 'long o', 'short o'];






  //useEffects
  useEffect(() => {
    if (flashcardData.subject === "math") {
      setTopicsToShow(mathTopics);
      setSubtopicsToShow(mathSubtopics);
    } else if (flashcardData.subject === "reading") {
      setTopicsToShow(readingTopics);
      setSubtopicsToShow(readingSubtopics);
    } else {
      setTopicsToShow([]);
      setSubtopicsToShow([]);
    }
  }, [flashcardData.subject]);

  useEffect(() => {
    setChartImage(
      flashcardData.topic === "addition" ? additionChart :
      flashcardData.topic === "subtraction" ? subtractionChart :
      flashcardData.topic === "multiplication" ? multiplicationChart :
      flashcardData.topic === "division" ? divisionChart : null
    );
  }, [flashcardData.topic]);


//********************************************* */
  useEffect(() => {
          // Fetch existing flashcards from the database for the logged-in user
          // on mount it defines fetchExistingFlashcards BUT ONLY RUNS after checks if user.id truthy
          async function fetchExistingFlashcards() {
      try {
        const res = await axios.get(`http://localhost:4000/flashcard/displayCreatedFlashcards/${user.id}`, {
          params: {
            subject: flashcardData.subject,
            topic: flashcardData.topic,
            subtopic: flashcardData.subtopic
          }
        });
        // Check if the response contains the expected field
      if (res.data && res.data.createdFlashcardsResult) {
        setFlashcards(res.data.createdFlashcardsResult); // Assuming response structure has a field `createdFlashcardsResult`
      } else {
        setFlashcards([]); // No flashcards found
      }
        // setFlashcards(res.data.createdFlashcardsResult); // Assuming response structure has a field `createdFlashcards`
      } catch (err) {
        console.error("Error fetching existing flashcards:", err);
      }
    }
  
    if (user.id) {
      fetchExistingFlashcards();
    }
  }, [user.id, flashcardData.subject && flashcardData.topic && flashcardData.subtopic]); // Fetch on user.id or flashcardData change







//EVENT HANDLERS/HANDLERS
  function handleChange(e) {
    const { name, value } = e.target;
    setFlashcardData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setChartImage(null);
    const { subject, topic, subtopic, question, answer, userId } = flashcardData;
    try {
      const res = await axios.post("http://localhost:4000/flashcard/createFlashcard", {
        subject,
        topic,
        subtopic,
        question,
        answer,
        userID: user.id
      });
      if (res.status === 201) {
        notifySuccess("The flashcard was created successfully!!!");
        setFlashcardData({
          question: '',
          answer: '',
          subject: '',
          topic: '',
          subtopic: '',
        });
        setFlashcards(prev => {
          const checkExistingFlashcard = prev.find(flashcard => flashcard.subject === subject && flashcard.topic === topic && flashcard.subtopic === subtopic);
          if (checkExistingFlashcard) {
            return prev;
          }
          return [...prev, { subject, topic, subtopic }];
        });
      }
    } catch (err) {
      console.log(err)
      notifyError("Failed to create flashcard. Please try again.");
    }
  }

  function handleFlashcardClick(topic, subtopic) {
    navigate(`/dashboard/create/flashcards/${topic}/${subtopic}`);

  }

  function renderFlashcardButtons(topic) {
        // Render buttons only if flashcards exist for the selected topic
    if (flashcards.length === 0) {
      return null;
    }
        // Filter flashcards for the selected topic and get unique subtopics
    const filteredFlashcards = flashcards.filter(flashcard => flashcard.topic === topic);
    const uniqueSubtopics = Array.from(new Set(filteredFlashcards.map(flashcard => flashcard.subtopic)));

        // Render buttons for each unique subtopic
    const buttons = uniqueSubtopics.map((subtopic, index) => (
      <button
        key={index}
        className={style.flashcardButton}
        onClick={() => handleFlashcardClick(topic, subtopic)}
      >
        {`${subtopic} Facts`}
      </button>
    ));
    
    return (
      <div className={style.subtopicButtonsContainer}>
        {buttons}
      </div>
    );
  }






  
  return (
    <div className={style.componentContainer}>
      <p className={style.create}>Create</p>
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleSubmit}>
          <select
            className={style.subject}
            name="subject"
            value={flashcardData.subject}
            onChange={handleChange}
            required>
            <option className={style.pickSubject}>Pick Subject</option>
            <option className={style.math} value="math">Math</option>
            <option className={style.reading} value="reading">Reading</option>
          </select>
          <select
            className={style.topic}
            name="topic"
            value={flashcardData.topic}
            onChange={handleChange}
            required>
            <option className={style.pickTopic}>Pick Topic</option>
            {topicsToShow.map((topicToShow, index) => (
              <option key={index} className={style.topicToShow}>{topicToShow}</option>
            ))}
          </select>
          <select
            className={style.subtopic}
            name="subtopic"
            value={flashcardData.subtopic}
            onChange={handleChange}
            required>
            <option className={style.pickSubtopic}>Pick Subtopic</option>
            {subtopicsToShow.map((subtopicToShow, index) => (
              <option key={index} className={style.subtopicToShow}>{subtopicToShow}</option>
            ))}
          </select>
          <input
            className={style.question}
            type="text"
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
          <button className={style.button}>Create Flashcard!</button>
        </form>
      </div>

      <div className={style.mathAndReadingButtonContainer}>
        <button
          className={style.mathFlashcardsButton}
          onClick={() => {
            setSelectedCategory("math");
            setChartImage(null);
          }}
        >
          Math Flashcards
        </button>
        
        <button
          className={style.readingFlashcardsButton}
          onClick={() => {
            setSelectedCategory("reading");
            setChartImage(null);
          }}
        >
          Reading Flashcards
        </button>  
      </div>
      
      {selectedCategory && (
      <div className={style.categoriesContainer}>
        {selectedCategory === "math" ? (
          <>
            <div className={style.additionFactsCategoryContainer}>
              <p className={style.additionFactsCategory}>Addition Facts</p>
              {renderFlashcardButtons("addition")}
            </div>
            <div className={style.subtractionFactsCategoryContainer}>
              <p className={style.subtractionFactsCategory}>Subtraction Facts</p>
              {renderFlashcardButtons("subtraction")}
            </div>
            <div className={style.multiplicationFactsCategoryContainer}>
              <p className={style.multiplicationFactsCategory}>Multiplication Facts</p>
              {renderFlashcardButtons("multiplication")}
            </div>
            <div className={style.divisionFactsCategoryContainer}>
              <p className={style.divisionFactsCategory}>Division Facts</p>
              {renderFlashcardButtons("division")}
            </div>
          </>
        ) : (
          <>
            <div className={style.vowelsCategoryContainer}>
              <p className={style.vowelsCategory}>Vowels</p>
              {renderFlashcardButtons("vowels")}
            </div>
            <div className={style.consonantsCategoryContainer}>
              <p className={style.consonantsCategory}>Consonants</p>
              {renderFlashcardButtons("consonants")}
            </div>
          </>
        )}
      </div>
      )}
      <div className={style.chart}>
        {chartImage && <img src={chartImage} alt={flashcardData.topic} />}
      </div>
      <Outlet />
    </div>
  )
}

export default Create;








// import style from "./Create.module.css"
// import axios from "axios"
// import { useState, useContext, useEffect } from "react"
// import { AuthContext, ToastContext  } from "../../../../App"
// import additionChart from "./additionChart.png"
// import subtractionChart from "./subtractionChart.png"
// import multiplicationChart from "./multiplicationChart.png"
// import divisionChart from "./divisionChart.png"
// import {Outlet, useNavigate} from "react-router-dom"
// import {useChart} from "../../../../pages/Dashboard"



// function Create() {

//   const navigate = useNavigate()
//   const { setChartImage, chartImage } = useChart(); // Access the context here
//   const {user} = useContext(AuthContext)
//   // const { flashcards, setFlashcards } = useContext(FlashcardContext);
//   const {notifyError, notifySuccess} = useContext(ToastContext)
//   // const { flashcardData, setFlashcardData } = useContext(FlashcardDataContext);

 
//   const mathTopic = ["addition", "subtraction", "multiplication", "division"]
//   const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] 
//   const sounds = ['long a', 'short a', 'long e', 'short e', 'long i', 'short i', 'long o', 'short o' ]
//   const readingTopic = ["vowels", "consonants"]
  
//   const [displayOperations, setDisplayOperations] = useState(false)
//   const [topic, setTopic] = useState([])
//   // const [subtopic, setSubtopic] = useState(number)
//   //null means empty on purpose for now 
//   // moved to dshabord so create-set can also access it
//   //const [chartImage, setChartImage] = useState(null) 
  
//   // useEffect(()=>{
//   //   navigate("created-set")
//   // },[])


// useEffect(()=>{
// setTopic(flashcardData.subject === "math" ? mathTopic : flashcardData.subject == "reading" ? readingTopic : [])
// }, [flashcardData.subject])

// // useEffect(()=>{
// //   setSubtopic(flashcardData.topic === "addition" ? mathTopic : flashcardData.topic == "reading" ? readingTopic : [])
// // }, [])

// useEffect(()=>{
//   setChartImage(flashcardData.topic === "addition" 
//   ? additionChart 
//   : flashcardData.topic === "subtraction" 
//   ? subtractionChart 
//   : flashcardData.topic === "multiplication" 
//   ? multiplicationChart 
//   : flashcardData.topic === "division" 
//   ? divisionChart 
//   : null) 
// }, [flashcardData.topic])

// function handleChange(e){
//   const {name, value} = e.target 
//   setFlashcardData(prev=>({
//     ...prev,
//     [name] : value
//   }));
// }

// async function handleSubmit(e){
//   e.preventDefault()
//   //change this and move to before catch when sent to db works!!!!!
//   setChartImage(null)
//   console.log("handleSubmit has run")
  
//   const {subject, topic, subtopic, question, answer} = flashcardData
//   const newFlashcard = { subject, topic, subtopic, question, answer };
  
//   // Add new flashcard to state
//     setFlashcards((prev) => [...prev, newFlashcard]);
  


//    // Eventually send data to the server:
//   try{
//     console.log("just before send ", subject, topic, subtopic, question, answer)
//     const res = await axios.post("http://localhost:4000/flashcard/createFlashcard", {
//       subject, 
//       topic, 
//       subtopic, 
//       question, 
//       answer, 
//       userID : user.id})
//     console.log("THIS IS THE RES: ", res)
    
//     if (res.status === 200)
//       console.log("The flashcard was created successfully")
//       // Reset form
//   setFlashcardData({
//     question: '',
//     answer: '', 
//     subject: '',
//     topic: '',
//     subtopic: '',
//   });
//     console.log("qustion ", question)
//       notifySuccess("The flashcard was created successfully!!!")
       
//       // Redirect to the appropriate URL based on subject, topic, and subtopic
//        navigate(`/dashboard/create/created-set/math-flashcards/${subtopic}`);
//       // setChartImage(null)
//   }catch(err){
//     console.log("here is the issue", err)
//     console.log("here is the error message", err.message)
//     notifyError("Failed to create flashcard. Please try again.");
//   } 
  
// }



//   return (
//   <div className={style.componentContainer}>
//     <p className={style.create}>Create</p>
//       <div className={style.formContainer}>
//         <form className={style.form} onSubmit={handleSubmit}>
//           <select
//             className={style.subject}
//             name="subject"
//             value={flashcardData.subject}
//             onChange={handleChange}
//             required>
//             <option className={style.pickSubject}>Pick Subject</option>
//             <option className={style.math} value="math">Math</option>
//             <option className={style.reading} value="reading">Reading</option> 
//           </select>
//           <select
//             className={style.topic}
//             name="topic"
//             value={flashcardData.topic}
//             onChange={handleChange}
//             required>
//           <option className={style.pickTopic}>Pick Topic</option>
//           {topic.map((topic, index)=>(
//             <option key={index} className={style.topic}>{topic}</option>
//             ))} 
//           </select>
//           { flashcardData.subject === "math" ? 
//           <select
//               className={style.subtopic}
//               name="subtopic"
//               value={flashcardData.subtopic}
//               onChange={handleChange}
//               required
//           >
//             <option className={style.pickSubtopic}>Pick Subtopic</option>
//             {number.map((number, index)=>(
//               <option key={index} className={style.number}>{number}</option>
//             ))} 
//           </select>
//           : flashcardData.subject === "reading" ?
//           <select
//               className={style.subtopic}
//               name="subtopic"
//               value={flashcardData.subtopic}
//               onChange={handleChange}
//               required
//           >
//             <option className={style.pickSubtopic}>Pick Subtopic</option>
//             {sounds.map((sound, index)=>(
//               <option key={index} className={style.sound}>{sound}</option>
//             ))} 
//           </select>  
//           :<></>
//             }
//           <input
//               type="text"
//               className={style.question}
//               name="question"
//               value={flashcardData.question}
//               onChange={handleChange}
//               placeholder="Type Question"
//               required
//           />
//           <input
//               type="text"
//               className={style.answer}
//               name="answer"
//               value={flashcardData.answer}
//               onChange={handleChange}
//               placeholder="Type Answer"
//               required
//           />
//           <button className={style.button}>Create Flashcard!</button>
//           </form>
//       </div>
//       <div className={style.mathAndReadingButtonContainer}>
//         <button onClick={() => {setChartImage(null); setDisplayOperations(true)}} className={style.mathFlashcardsButton} >Math Flashcards</button>

//       { displayOperations && 
//       <div className={style.allButtonsContainer}>
//         <div className={style.additionContainer}>
//           <p className={style.additionTitle}>
//             Addition <FaPlus />
//           </p>
//           {/* Map through addition subtopics and render buttons */}
//           {subtopics.addition.map((subtopic) => (
//             <Link
//               key={subtopic}
//               className={style.numberButton}
//               to={`math-addition-${subtopic}`}
//             >
//               {subtopic} Facts
//             </Link>
//           ))}
//         </div>

//         <div className={style.subtractionContainer}>
//           <p className={style.subtractionTitle}>
//             Subtraction <TiMinus />
//           </p>
//           {/* Map through subtraction subtopics and render buttons */}
//           {subtopics.subtraction.map((subtopic) => (
//             <Link
//             key={subtopic}
//             className={style.numberButton}
//             to={`math-subtraction-${subtopic}`}
//           >
//             {subtopic} Facts
//           </Link>
//           ))}
//         </div>

//         <div className={style.multiplicationContainer}>
//           <p className={style.multiplicationTitle}>
//             Multiplication <FaTimes />
//           </p>
//           {/* Map through multiplication subtopics and render buttons */}
//           {subtopics.multiplication.map((subtopic) => (
//             <Link
//             key={subtopic}
//             className={style.numberButton}
//             to={`math-multiplication-${subtopic}`}
//           >
//             {subtopic} Facts
//           </Link>
//           ))}
//         </div>

//         <div className={style.divisionContainer}>
//           <p className={style.divisionTitle}>
//             Division <FaDivide />
//           </p>
//           {/* Map through division subtopics and render buttons */}
//           {subtopics.division.map((subtopic) => (
//             <Link
//             key={subtopic}
//             className={style.numberButton}
//             to={`math-division-${subtopic}`}
//           >
//             {subtopic} Facts
//           </Link>
//           ))}
//         </div>
//       </div>
//     }

//         <button onClick={() => {setChartImage(null)}} className={style.readingFlashcardsButton} >Reading Flashcards</button>
//       </div>
//       <div className={style.chartContainer}>
//           <div className={style.chartImageContainer}>
//               { chartImage &&
//                 <img className={style.image} src={chartImage}/>
//                 // : <></>
//             } 
            
            
//           </div>  
//       </div>        
      
//      <Outlet />    
//   </div>
//   )
// }

// export default Create
