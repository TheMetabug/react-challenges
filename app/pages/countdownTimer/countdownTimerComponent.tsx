import React, { useRef, useState, MutableRefObject, useCallback } from "react";
import moment from "moment";

const CountdownTimerComponent: React.FC = () => {
    const [timer, setTimer] = useState(600000);
    const [timerInput, setTimerInput] = useState("10:00");
    const [isRunning, setIsRunning] = useState(false);
    const intervalId: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

    const setTimerCallback = useCallback(() => {
        setTimer((prevTimer) => prevTimer - 1000);  
    }, [])

    /**
     * Starts the countdown timer.
     *
     * Every second, the `timer` state is decremented by 1 second.
     * When the timer reaches 0, a sound is played and the timer is stopped.
     */
    const startTimer = () => {
        // Set running to true and set timer value
        console.log(timerInput,timer);
        setIsRunning(true);
        const [minute, seconds] = timerInput.split(':');
        setTimer(moment({minute: parseInt(minute), seconds: parseInt(seconds)}).milliseconds());
        console.log(timerInput, timer, minute, seconds);

        intervalId.current = setInterval(() => {
            console.log("Interval callback");
            setTimerCallback();

            // Play audio when timer reaches zero and stop timer
            if (timer === 0) {
                const sound = new Audio("./alarm.mp3");
                sound.play();
                stopTimer();
            }
        }, 1000);
    };

    /**
     * Stops the countdown timer.
     *
     * If the timer is currently running, stop it and clear the interval.
     */
    const stopTimer = () => {
        setIsRunning(false);
        clearInterval(intervalId.current!);
        setTimerInput(moment.utc(timer).format("mm:ss").toString());
    };

    const verifyTimerInput = (newInput: string) => {
        // Make full input with only numbers to correct format
        if (newInput.match(/^\d{4}$/)) {
            setTimerInput(
                `${newInput[0]}${newInput[1]}:${newInput[2]}${newInput[3]}`
            );
        }

        // Allow to timer update only with numbers
        else if (newInput.match(/^\d{0,3}$/)) {
            setTimerInput(newInput);
        }

        // Allow to timer update only with numbers with : between them
        else if (newInput.match(/^\d{0,2}:\d{0,2}$/)) {
            setTimerInput(newInput);
        }
    };

    return (
        <div className="flex flex-col items-center">
            {
                /* Switch between input and display text based on isRunning state */
                isRunning ? (
                    <div
                        /* Timer display text*/
                        className={`flex bg-black-100 w-[25rem] bg-transparent p-4 text-8xl font-bold justify-center outline-none`}
                    >
                        {moment.utc(timer).format("mm:ss")}
                    </div>
                ) : (
                    /* Timer input field */
                    <input
                        className={`flex bg-black-100 w-[25rem] bg-transparent p-4 text-8xl font-bold text-center outline-none`}
                        type="text"
                        value={timerInput}
                        onChange={(e) => verifyTimerInput(e.target.value)}
                    />
                )
            }
            {/* Start/stop button */}
            <button
                className={`w-[10rem] p-4 text-2xl font-bold rounded-lg ${
                    isRunning ? "bg-red-500" : "bg-green-500"
                }`}
                onClick={() => {
                    isRunning ? stopTimer() : startTimer();
                }}
            >
                {isRunning ? "Stop" : "Start"}
            </button>
        </div>
    );
};

export default CountdownTimerComponent;
