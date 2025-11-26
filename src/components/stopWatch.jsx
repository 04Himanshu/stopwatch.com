import { useState, useRef } from "react";
import "../styles/stopWatch.css";

function Stopwatch() {
    const [secondsTimer, setSecondsTimer] = useState(0);
    const [minutesTimer, setMinutesTimer] = useState(0);
    const [hoursTimer, setHoursTimer] = useState(0);
    const [dark, setDark] = useState(false);

    const timerRef = useRef(null);

    const startTimer = () => {
        if (timerRef.current !== null) return;

        timerRef.current = setInterval(() => {
            setSecondsTimer((prev) => {
                if (prev === 59) {
                    setMinutesTimer((m) => {
                        if (m === 59) {
                            setHoursTimer((h) => h + 1);
                            return 0;
                        }
                        return m + 1;
                    });
                    return 0;
                }
                return prev + 1;
            });
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
    };

    const resetTimer = () => {
        stopTimer();
        setSecondsTimer(0);
        setMinutesTimer(0);
        setHoursTimer(0);
    };

    return (
        <div className={dark ? "stopwatch-wrapper dark" : "stopwatch-wrapper"}>
            <div className="stopwatch-card glass">
                <div className="top-bar">
                    <h1 className="title">Stopwatch</h1>
                    <button onClick={() => setDark(!dark)} className="toggle">
                        {dark ? "☀️" : "🌙"}
                    </button>
                </div>

                <div className="time-display">
                    {hoursTimer.toString().padStart(2, "0")} :
                    {minutesTimer.toString().padStart(2, "0")} :
                    {secondsTimer.toString().padStart(2, "0")}
                </div>

                <div className="btn-group">
                    <button onClick={startTimer} className="btn start">Start</button>
                    <button onClick={stopTimer} className="btn stop">Stop</button>
                    <button onClick={resetTimer} className="btn reset">Reset</button>
                </div>
            </div>
        </div>
    );
}

export default Stopwatch;
