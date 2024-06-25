import style from "./MathFlashcards.module.css";
import { Link, Outlet, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { FaDivide } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { FlashcardContext } from "../../../../../App";

function MathFlashcards() {
  const { singleMathFlashcardId } = useParams();
  const { flashcards } = useContext(FlashcardContext);
  const [subtopics, setSubtopics] = useState({
    addition: [],
    subtraction: [],
    multiplication: [],
    division: [],
  });

  useEffect(() => {
    // Initialize subtopics object with empty arrays for each operation
    const initialSubtopics = {
      addition: [],
      subtraction: [],
      multiplication: [],
      division: [],
    };

    // Use a Set to keep track of seen subtopics for each operation
    const seenSubtopics = {
      addition: new Set(),
      subtraction: new Set(),
      multiplication: new Set(),
      division: new Set(),
    };

    // Group flashcards by operation topic and ensure no duplicates
    flashcards.forEach((card) => {
      if (card.subject === "math" && card.subtopic !== "") {
        if (!seenSubtopics[card.topic].has(card.subtopic)) {
          initialSubtopics[card.topic].push(card.subtopic);
          seenSubtopics[card.topic].add(card.subtopic);
        }
      }
    });

    // Update state with the grouped subtopics
    setSubtopics(initialSubtopics);
  }, [flashcards]);

  return (
    <div className={style.conponentContainer}>
      <div className={style.allButtonsContainer}>
        <div className={style.additionContainer}>
          <p className={style.additionTitle}>
            Addition <FaPlus />
          </p>
          {/* Map through addition subtopics and render buttons */}
          {subtopics.addition.map((subtopic) => (
            <Link
              key={subtopic}
              className={style.numberButton}
              to={`${subtopic}`}
            >
              {subtopic} Facts
            </Link>
          ))}
        </div>

        <div className={style.subtractionContainer}>
          <p className={style.subtractionTitle}>
            Subtraction <TiMinus />
          </p>
          {/* Map through subtraction subtopics and render buttons */}
          {subtopics.subtraction.map((subtopic) => (
            <Link
              key={subtopic}
              className={style.numberButton}
              to={`${subtopic}`}
            >
              {subtopic} Facts
            </Link>
          ))}
        </div>

        <div className={style.multiplicationContainer}>
          <p className={style.multiplicationTitle}>
            Multiplication <FaTimes />
          </p>
          {/* Map through multiplication subtopics and render buttons */}
          {subtopics.multiplication.map((subtopic) => (
            <Link
              key={subtopic}
              className={style.numberButton}
              to={`${subtopic}`}
            >
              {subtopic} Facts
            </Link>
          ))}
        </div>

        <div className={style.divisionContainer}>
          <p className={style.divisionTitle}>
            Division <FaDivide />
          </p>
          {/* Map through division subtopics and render buttons */}
          {subtopics.division.map((subtopic) => (
            <Link
              key={subtopic}
              className={style.numberButton}
              to={`${subtopic}`}
            >
              {subtopic} Facts
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default MathFlashcards;