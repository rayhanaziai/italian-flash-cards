import React, { useState, useEffect, useRef } from "react";
import TopNav from "../../Components/TopNav";
import { phrases } from "../../constants/phrases";
import LottieWebPlayer from "../../Components/LottieWebPlayer";
import { stringify } from "querystring";
import { autoFocusInput } from "../../helpers";

const Home: React.FC = () => {
  const [currentEnglishPhrase, setCurrentEnglishPhrase] = useState("");
  const [translation, setTranslation] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [bestGuess, setBestGuess] = useState("");
  const [completedPhrases, setCompletedPhrases] = useState([currentEnglishPhrase]);
  const [allPhrasesViewed, setAllPhrasesViewed] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const phraseObject = () => {
    const masterPhraseObj: Record<string, string>= {}
    Object.values(phrases).map((categoryObject: Record<string, string>) => {
      Object.keys(categoryObject).map((phrase) => {
        masterPhraseObj[phrase] = categoryObject[phrase]
      })
    })
    return masterPhraseObj;
  }

  const allPhrases = phraseObject()
  const englishPhrases = Object.keys(allPhrases)

  const showItalian = () => {
    if (translation) {
      setTranslation("");
    } else {
      const italian = allPhrases[currentEnglishPhrase];
      setTranslation(italian);
    }
  }

  const onCheckGuess = () => {
    if (translation) {
      if (bestGuess.toLowerCase() === currentEnglishPhrase.toLowerCase()) {
        setConfetti(true);
        setWrongAnswer(false)
      } else {
        setConfetti(false)
        setWrongAnswer(true);
      }
    } else {
      if (bestGuess.toLowerCase() === allPhrases[currentEnglishPhrase].toLowerCase()) {
        setConfetti(true);
        setWrongAnswer(false)
      } else {
        setConfetti(false)
        setWrongAnswer(true);
      }
    }
  }

  const onNextClick = () => {
    setCompletedPhrases((v) => [
      ...v,
      currentEnglishPhrase
    ])
    setTranslation("");
    if (completedPhrases.length >= englishPhrases.length) {
      setAllPhrasesViewed(true);
    } else {
      let randomPhrase = englishPhrases[Math.floor(Math.random() * englishPhrases.length)];
      while (completedPhrases.includes(randomPhrase)) {
        randomPhrase = englishPhrases[Math.floor(Math.random() * englishPhrases.length)];
      }
      setCurrentEnglishPhrase(randomPhrase);
    }

  }

  const onChange = (_field: string, value: string) => {
    setBestGuess(value);
  }

  useEffect(() => {
    autoFocusInput(inputRef, 1);
  }, [currentEnglishPhrase]);

  useEffect(() => {
    const randomPhrase = englishPhrases[Math.floor(Math.random() * englishPhrases.length)];
    setCurrentEnglishPhrase(randomPhrase);
  }, [])

  useEffect(() => {
    setConfetti(false);
    setWrongAnswer(false);
    setBestGuess("");
  }, [translation, currentEnglishPhrase])

  useEffect(() => {
    const afterTimer = () => {
      setConfetti(false);
      onNextClick();
    }
    if (confetti) {
      setTimeout(afterTimer, 1000);
    }
  }, [confetti, onNextClick])

  return (
    <div>
    <TopNav/>
      <header className="App-header">
        <div className="home-container">
        <h2>Italian Phrases</h2>
        <div className="card card--accent">
            {translation ? <img className="flag" src={require("../../Images/italian-flag.png")} alt="italian-flag"/> : <img className="flag" src={require("../../Images/british-flag.png")} alt="british-flag"/>}
            <div className="phrase">
            {translation ? <h2>{translation}</h2> : <h2>{currentEnglishPhrase}</h2>}  
            </div>
            <div className="button-container">
            <button onClick={showItalian}>See Translation</button>
            </div>
            <div className="input-section">
             <input
              type={"text"}
              value={bestGuess}
              placeholder={"type translation here..."}
              id={translation ? "englishGuess" : "italianGuess"}
              onChange={(e) => onChange(translation ? "englishGuess" : "italianGuess", e.currentTarget.value)}
              maxLength={128}
              ref={inputRef}
            />
            <button className={`${confetti ? "correct-answer": ""} ${wrongAnswer ? "wrong-answer" : ""}`} onClick={onCheckGuess}>Check Answer</button>
            </div>
            {translation ? <button className="next-phrase" onClick={onNextClick}>{"Next Phrase >"}</button> : <></>}  
        </div>
        </div>
        {allPhrasesViewed && <h1>OOPS! ALL PHRASES HAVE BEEN TESTED ALREADY</h1>}
        {allPhrasesViewed && <h1>Refresh the page to reset!</h1>}
        {confetti &&
            <LottieWebPlayer
              className="lottie-container-confetti"
              image={"https://assets5.lottiefiles.com/packages/lf20_m9vbvplh.json"}
              showControls={false}
              style={{
                height: "800px",
                width: "800px",
              }}
            />}
      </header>
    </div>
  );
};

export default Home;
