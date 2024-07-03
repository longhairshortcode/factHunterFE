import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext, ToastContext } from "../../../../App";
import style from "./Create.module.css";
import additionChart from "./additionChart.png";
import subtractionChart from "./subtractionChart.png";
import multiplicationChart from "./multiplicationChart.png";
import divisionChart from "./divisionChart.png";
import { Outlet } from "react-router-dom";

function Make() {
  // INITIALIZE CONTEXTS
  const { user } = useContext(AuthContext);
  const { notifySuccess, notifyError } = useContext(ToastContext);

  // STATES
  const [flashcardData, setFlashcardData] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    question: "",
    answer: "",
    userId: user.id ? user.id : null,
  });

  const [flashcards, setFlashcards] = useState([]);
  const [topicsToShow, setTopicsToShow] = useState([]);
  const [subtopicsToShow, setSubtopicsToShow] = useState([]);
  const [chartImage, setChartImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false); // NEW STATE VARIABLE

  // VARIABLE ARRAYS
  const mathTopics = ["addition", "subtraction", "multiplication", "division"];
  const readingTopics = ["vowels", "consonants"];
  const mathSubtopics = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const readingSubtopics = ['long a', 'short a', 'long e', 'short e', 'long i', 'short i', 'long o', 'short o'];

  //USEEFFECTS
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
      flashcardData.topic === "addition" ? additionChart 
      : flashcardData.topic === "subtraction" ? subtractionChart 
      : flashcardData.topic === "multiplication" ? multiplicationChart 
      : flashcardData.topic === "division" ? divisionChart 
      : null
    );
  }, [flashcardData.topic]);

  // Simplified fetchExistingFlashcards function
  useEffect(() => {
    async function fetchExistingFlashcards() {
      try {
        const res = await axios.get(`http://localhost:4000/flashcard/displayCreatedFlashcards/${user.id}`);
        setFlashcards(res.data.createdFlashcardsResult || []);
      } catch (err) {
        console.error("Error fetching existing flashcards:", err);
      }
    }

    if (user.id) {
      fetchExistingFlashcards();
    }
  }, [user.id, fetchTrigger]);

  // EVENT HANDLERS
  function handleChange(e) {
    const { name, value } = e.target;
    setFlashcardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setChartImage(null);
    const { subject, topic, subtopic, question, answer, userId } = flashcardData;

    if ({ ...flashcardData }) {
      try {
        const response = await axios.post(
          "http://localhost:4000/flashcard/createFlashcard",
          {
            subject,
            topic,
            subtopic,
            question,
            answer,
            userID: user.id,
          }
        );
        if (response.status === 201) {
          notifySuccess("The flashcard was created successfully!");
          setFlashcardData({
            question: '',
            answer: '',
            subject: '',
            topic: '',
            subtopic: '',
          });
          setFlashcards((prev) => {
            const checkExistingFlashcard = prev.find(
              (flashcard) =>
                flashcard.subject === subject &&
                flashcard.topic === topic &&
                flashcard.subtopic === subtopic
            );
            if (checkExistingFlashcard) {
              return prev;
            }
            return [...prev, { subject, topic, subtopic, question, answer }];
          });
          setFetchTrigger(prev => !prev); // Toggle fetchTrigger to refetch flashcards
        }
      } catch (err) {
        notifyError("Failed to create flashcard. Please try again.");
        console.log(err);
      }
    }
  }

  //****OTHER FUNCTIONS (NEED TO GO OVER THIS, KIND OF COMPLICATED)
  // Function to render buttons for each unique subtopic under the respective topic
  function renderFlashcardButtons(topic) {
    const filteredFlashcards = flashcards.filter(
      (flashcard) => flashcard.topic === topic
    );
    const uniqueSubtopics = Array.from(
      new Set(filteredFlashcards.map((flashcard) => flashcard.subtopic))
    );

    return uniqueSubtopics.map((subtopic, index) => (
      <button key={index} className={style.flashcardButton}>
        {`${subtopic} Facts`}
      </button>
    ));
  }

  return (
    <div className={style.componentContainer}>
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
            <option className={style.math} value="math">
              Math
            </option>
            <option className={style.reading} value="reading">
              Reading
            </option>
          </select>
          <select
            className={style.topic}
            name="topic"
            value={flashcardData.topic}
            onChange={handleChange}
            required
          >
            <option className={style.pickTopic}>Pick Topic</option>
            {topicsToShow.map((topicToShow, index) => (
              <option key={index} className={style.topicToShow}>
                {topicToShow}
              </option>
            ))}
          </select>
          <select
            className={style.subtopic}
            name="subtopic"
            value={flashcardData.subtopic}
            onChange={handleChange}
            required
          >
            <option className={style.pickSubtopic}>Pick Subtopic</option>
            {subtopicsToShow.map((subtopicToShow, index) => (
              <option key={index} className={style.subtopicToShow}>
                {subtopicToShow}
              </option>
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
// QQQQ IS THIS TOO ADVANCED, DO I NEED SIMPLER CODE?
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
  );
}

export default Make;




















//THIS IS ABOVE W COMMENTS OMMITED

// import axios from "axios";
// import { useState, useContext, useEffect } from "react";
// import { AuthContext, ToastContext } from "../../../../App";
// import style from "./Create.module.css";
// import additionChart from "./additionChart.png";
// import subtractionChart from "./subtractionChart.png";
// import multiplicationChart from "./multiplicationChart.png";
// import divisionChart from "./divisionChart.png";
// import { Outlet } from "react-router-dom";

// function Make() {
// const {user} = useContext(AuthContext);
// const {notifySuccess, notifyError} = useContext(ToastContext)

// const [flashcardData, setFlashcardData] = useState({
//     subject: "",
//     topic: "",
//     subtopic: "",
//     question: "",
//     answer: "",
//     userId: user.id ? user.id : null 
// })

// const [flashcards, setFlashcards] = useState([]);
// const [topicsToShow, setTopicsToShow] = useState([]);
// const [subtopicsToShow, setSubtopicsToShow] = useState([]);
// const [chartImage, setChartImage] = useState(null);

// const mathTopics = ["addition", "subtraction", "multiplication", "division"];
// const readingTopics = ["vowels", "consonants"];
// const mathSubtopics = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// const readingSubtopics = ['long a', 'short a', 'long e', 'short e', 'long i', 'short i', 'long o', 'short o'];

//  useEffect(() => {
//     if (flashcardData.subject === "math") {
//       setTopicsToShow(mathTopics);
//       setSubtopicsToShow(mathSubtopics);
//     } else if (flashcardData.subject === "reading") {
//       setTopicsToShow(readingTopics);
//       setSubtopicsToShow(readingSubtopics);
//     } else {
//       setTopicsToShow([]);
//       setSubtopicsToShow([]);
//     }
//   }, [flashcardData.subject]);

//   useEffect(() => {
//     setChartImage(
//       flashcardData.topic === "addition" ? additionChart :
//       flashcardData.topic === "subtraction" ? subtractionChart :
//       flashcardData.topic === "multiplication" ? multiplicationChart :
//       flashcardData.topic === "division" ? divisionChart : null
//     );
//   }, [flashcardData.topic]);

// async function handleSubmit(e){
//     e.preventDefault();
//     console.log({...flashcardData})
//     setChartImage(null);
//     const { subject, topic, subtopic, question, answer, userId} = flashcardData

//     if ({...flashcardData}){
//         try{
//             const response = await axios.post("http://localhost:4000/flashcard/createFlashcard", {
//                 subject,
//                 topic,
//                 subtopic,
//                 question,
//                 answer,
//                 userID: user.id  
//             });
//             if (response.status === 201){
//                 notifySuccess("The flashcard was created successfully!");   
//                 setFlashcardData({
//                     question: '',
//                     answer: '',
//                     subject: '',
//                     topic: '',
//                     subtopic: '',
//                   });
//                 setFlashcards(prev => {
//                     const checkExistingFlashcard = prev.find(flashcard => flashcard.subject === subject && flashcard.topic === topic && flashcard.subtopic === subtopic);
//                     if (checkExistingFlashcard) {
//                         return prev;
//                     }
//                     return [...prev, {subject, topic, subtopic, question, answer}]
//                 })
//             }
//         }catch(err){
//             notifyError("Failed to create flashcard. Please try again.")
//             console.log(err)
//         }    
//     }
// }

//   return (
//     <div className={style.componentContainer}>
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
//                 <option className={style.pickTopic}>Pick Topic</option>
//                 {topicsToShow.map((topicToShow, index) => (
//                     <option key={index} className={style.topicToShow}>{topicToShow}</option>
//                 ))}
//           </select>
//           <select
//             className={style.subtopic}
//             name="subtopic"
//             value={flashcardData.subtopic}
//             onChange={handleChange}
//             required>
//                 <option className={style.pickSubtopic}>Pick Subtopic</option>
//                 {subtopicsToShow.map((subtopicToShow, index) => (
//                     <option key={index} className={style.subtopicToShow}>{subtopicToShow}</option>
//                 ))}
//           </select>
//           <input
//             className={style.question}
//             type="text"
//             name="question"
//             value={flashcardData.question}
//             onChange={handleChange}
//             placeholder="Type Question"
//             required
//           />
//           <input
//             type="text"
//             className={style.answer}
//             name="answer"
//             value={flashcardData.answer}
//             onChange={handleChange}
//             placeholder="Type Answer"
//             required
//           />
//           <button className={style.button}>Create Flashcard!</button>
//         </form>
//       </div>
//       <div className={style.mathAndReadingButtonContainer}>
//         <button
//           className={style.mathFlashcardsButton}
//           onClick={() => {
//             setChartImage(null);
//           }}
//         >
//           Math Flashcards
//         </button>
        
//         <button
//           className={style.readingFlashcardsButton}
//           onClick={() => {
//             setChartImage(null);
//           }}
//         >
//           Reading Flashcards
//         </button>  
//       </div>

//       <div className={style.chart}>
//         {chartImage && <img src={chartImage} alt={flashcardData.topic} />}
//       </div>
//       <Outlet />
//     </div>
//   )
// }

// export default Make