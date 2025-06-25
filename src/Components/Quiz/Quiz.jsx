import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'

const Quiz = () => {
    let [Index, setIndex] = useState(0)
    let [Question, setQuestion] = useState(data[Index])
    let [Lock, setLock] = useState(false)
    let [Score, setScore] = useState(0)
    let [Result, setResult] = useState(false)

    const Option1 = useRef(null)
    const Option2 = useRef(null)
    const Option3 = useRef(null)
    const Option4 = useRef(null)

    const optArr = [Option1, Option2, Option3, Option4]

    const checkAns = (e, answer) => {
        if (Lock === false) {
            if (Question.ans === answer) {
                e.target.classList.add("correct")
                setLock(true)
                setScore(prev => prev + 1)
            } else {
                e.target.classList.add("wrong")
                setLock(true)
                optArr[Question.ans - 1].current.classList.add("correct")
            }
        }
    }

    const next = () => {
        if (Lock === true) {
            if (Index === data.length - 1) {
                setResult(true)
                return 0
            }
            setIndex(++Index)
            setQuestion(data[Index])
            setLock(false)
            optArr.map((Option) => {
                Option.current.classList.remove("correct")
                Option.current.classList.remove("wrong")
                return null
            })
        }
    }

    const reset = () => {
        setIndex(0)
        setQuestion(data[0])
        setLock(false)
        setScore(0)
        setResult(false)
    }
    return (
        <div className='container'>
            <div className="title">
                <h1>Quiz App</h1>
            </div>
            <hr />
            {Result ? <></> : <>
                <h2>{Index + 1}. {Question.question}</h2>
                <ul>
                    <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{Question.option1}</li>
                    <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{Question.option2}</li>
                    <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{Question.option3}</li>
                    <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{Question.option4}</li>
                </ul>
                <button onClick={next}>Next</button>
                <div className="index">{Index + 1} of {data.length} Questions</div>
            </>}
            {/* {Result?<>
             <h2>You Scored {Score} out of {data.length}🎊🎉</h2>
            <button onClick={reset}>Reset</button>
            </>:<></>} */}

            {Result && (
                <>
                    <h2>You Scored {Score} out of {data.length} 🎊🎉</h2>

                    {Score > 8 && <h2>You are in the Top 80%!🔥</h2>}
                    {Score > 6 && Score <= 8 && <h2>You are in the Top 60%!👏</h2>}
                    {Score <= 6 && <h2>Not bad, keep it up!👍</h2>}

                    <button onClick={reset}>Reset</button>
                </>
            )}


        </div>
    )
}

export default Quiz