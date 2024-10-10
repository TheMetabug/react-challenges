import React, { forwardRef, useRef, useImperativeHandle } from "react";

/**
 * This component contains the controls for playing and stopping the alarm sound.
 * TODO: Perhaps don't use forwardRef and useImperativeHandle, is there another way?
 */
const AlarmSound = forwardRef(function AlarmSound({}, ref) {
    const audioRef = useRef<HTMLDivElement>(null);
    const audioElement: HTMLAudioElement | null = document.getElementById("alarm-sound") as HTMLAudioElement | null;

    /**
     * Plays the alarm sound if it is not already playing.
     */
    const playAudio = () => {
        audioElement?.play();   
        console.log("playAudio called", audioElement);
    }

    /**
     * Stops the alarm sound from playing.
     */
    const stopAudio = () => {
        audioElement?.pause();
        console.log("stopAudio called", audioElement);
    }

    useImperativeHandle(ref, () => ({
        playAudio,
        stopAudio
    }));

    return (
        <div ref={audioRef}>
            <audio
                id="alarm-sound"
                src="./static/resources/alarm.mp3">
                    Your browser does not support the
                    <code>audio</code> element.
            </audio>
        </div>
    )
});

export default AlarmSound