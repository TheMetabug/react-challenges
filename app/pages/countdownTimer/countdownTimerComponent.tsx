import React, { useRef, useState, MutableRefObject } from "react";
import moment from "moment";
import AlarmSound from "./alarmSound";

/**
 * A React component that displays a countdown timer.
 *
 * The timer can be started and stopped by a button.
 * When the timer is running, the time is displayed in mm:ss format.
 * When the timer is stopped, an input field is shown to allow the user to set the timer.
 * The timer can be set by inputting a number of seconds or a time in mm:ss format.
 * When the timer reaches 0, a sound is played and the timer is stopped.
 */
const CountdownTimerComponent: React.FC = () => {
    const [timer, setTimer] = useState(600000);
    const [timerInput, setTimerInput] = useState("10:00");
    const [isRunning, setIsRunning] = useState(false);
    const intervalId: MutableRefObject<NodeJS.Timeout | null> = useRef(null);
    const alarmSoundRef = useRef<Alarmsound>(null);
    const zeroTime = moment("00:00", "mm:ss");

    /**
     * Callback function for interval to update the timer.
     * If the time is greater than 0, reduce the time by 1 second.
     * If the time is 0, stop the timer and play the alarm sound.
     */
    const setTimerCallback = () => {
        setTimer((prevTimer) => {
            if (prevTimer <= 0) {
                return prevTimer;
            }

            // Calculate new time by reducing the previous time by 1 second
            const newTime = prevTimer - 1000;

            // Then check if the new time is 0, if so, stop the timer and play the alarm
            const momentObj = moment(String(newTime), "x");
            const newTimeSeconds =
                Number(momentObj.format("x")) - Number(zeroTime.format("x"));
            if (newTimeSeconds <= 0) {
                clearInterval(intervalId.current!);
                alarmSoundRef.current?.playAudio();
            }

            return newTime;
        });
    };

    /**
     * Starts the countdown timer.
     *
     * Every second, the `timer` state is decremented by 1 second.
     * When the timer reaches 0, a sound is played and the timer is stopped.
     */
    const startTimer = () => {
        // Set running to true and set timer value
        setIsRunning(true);
        const momentObj = moment(timerInput, "mm:ss");
        setTimer(Number(momentObj.format("x")));

        intervalId.current = setInterval(setTimerCallback, 1000);
    };

    /**
     * Stops the countdown timer.
     *
     * If the timer is currently running, stop it and clear the interval.
     */
    const stopTimer = () => {
        setIsRunning(false);
        clearInterval(intervalId.current!);
        setTimerInput("00:00");
        alarmSoundRef.current?.stopAudio();
    };

    /**
     * Verifies the timer input and updates it if valid.
     *
     * Allows timer input to be updated only if it is a number or a string with
     * a colon in the middle. If the input is four digits, it is formatted to
     * mm:ss format.
     *
     * @param newInput The new timer input to verify and update.
     */
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
            {/* Include alarm sound component */}
            <AlarmSound ref={alarmSoundRef} />
        </div>
    );
};

export default CountdownTimerComponent;
