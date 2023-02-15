import React, {useState, useEffect} from "react";
import TopNav from "../../Components/TopNav";
import { phrases } from "../../constants/phrases";
import LottieWebPlayer from "../../Components/LottieWebPlayer";
import { stringify } from "querystring";

const Home: React.FC = () => {
  const [currentEnglishPhrase, setCurrentEnglishPhrase] = useState("");
  const [translation, setTranslation] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [bestGuess, setBestGuess] = useState("");

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

  // const initialPhrases =() => {
  //   const engPhrases: string[] = [];
  //   Object.values(phrases).map((categoryObject: Record<string, string>) => {
  //     engPhrases.concat(Object.keys(categoryObject))
  //   });
  //   return engPhrases
  // }
  // const [englishPhrases] = useState(initialPhrases);

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
    setTranslation("");
    const randomPhrase = englishPhrases[Math.floor(Math.random() * englishPhrases.length)];
    setCurrentEnglishPhrase(randomPhrase);
  }

  const onChange = (_field: string, value: string) => {
    setBestGuess(value);
  }

  useEffect(() => {
    const randomPhrase = englishPhrases[Math.floor(Math.random() * englishPhrases.length)];
    setCurrentEnglishPhrase(randomPhrase);
  }, [])

  useEffect(() => {
    setConfetti(false);
    setWrongAnswer(false);
    setBestGuess("");
  }, [translation, currentEnglishPhrase])


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
              placeholder={"input guess here"}
              id={translation ? "englishGuess" : "italianGuess"}
              onChange={(e) => onChange(translation ? "englishGuess" : "italianGuess", e.currentTarget.value)}
              maxLength={128}
            />
            <button className={`${confetti ? "correct-answer": ""} ${wrongAnswer ? "wrong-answer" : ""}`} onClick={onCheckGuess}>Check</button>
            </div>
            {translation ? <button className="next-phrase" onClick={onNextClick}>{"Next Phrase >"}</button> : <></>}  
        </div>
        </div>
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
