import React, { useState } from "react";

const CountdownTimerComponent: React.FC = () => {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [duration, setDuration] = useState(1000);

    return (
        <div className="flex flex-col">
            {/* Timer input field and start/stop button */}
            <div className="flex flex-col">
                <label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                    />
                    <button
                        onClick={() => {
                            setIsRunning(!isRunning);
                            setTimer(duration);
                        }}
                    >
                        {isRunning ? "Stop" : "Start"}
                    </button>
                </label>
            </div>
            {/* Timer clock */}
            <div className="flex flex-col border-5-[#707070] rounded-lg">
                <p>{timer}</p>
            </div>
        </div>
    );
};

export default CountdownTimerComponent;
