// This is the main page to contain all the challenge tab pages
// which can be switched by clicking on the buttons

"use client";
import React, { useState } from "react";
import CounterChallenge from "./counter/script";
import DynamicListChallenge from "./dynamicList/script";
import HexColorPickerChallenge from "./hexColorPicker/script";
import PasswordStrengthChallenge from "./passwordStrengthChecker/script";
import CountdownTimerChallenge from "./countdownTimer/script";

enum TabNames {
    Counter = 0,
    DynamicList = 1,
    HexColorPicker = 2,
    PasswordStrength = 3,
    CountdownTimer = 4,
}

const TabNameKeys: string[] = Object.keys(TabNames).filter(
    (key) => !isNaN(Number(key))
);

const getTabName = (index: number): string => {
    if (index < 0 && TabNameKeys.length - 1 > index) {
        return "404 Tab not found";
    }

    return TabNames[index];
};

const Pages = () => {
    const [currentTab, changeTab] = useState(0);
    const [currentTitle, changeTitle] = useState(getTabName(currentTab));

    const nextTab = () => {
        if (currentTab + 1 > TabNameKeys.length - 1) return;

        changeTab(currentTab + 1);
        changeTitle(getTabName(currentTab + 1));
    };

    const previousTab = () => {
        if (currentTab == 0) return;

        changeTab(currentTab - 1);
        changeTitle(getTabName(currentTab - 1));
    };

    const currentTabComponent = () => {
        switch (currentTab) {
            default:
            case 0:
                return <CounterChallenge />;
            case 1:
                return <DynamicListChallenge />;
            case 2:
                return <HexColorPickerChallenge />;
            case 3:
                return <PasswordStrengthChallenge />;
            case 4:
                return <CountdownTimerChallenge />;
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <header className="flex h-16 my-4 justify-center items-center">
                <div className="flex justify-center items-center">
                    <button
                        className="rounded-full border border-solid border-transparent transition-colors justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                        rel="noopener noreferrer"
                        onClick={previousTab}
                    >
                        Previous tab
                    </button>
                    <div className="justify-center items-center">
                        <h1 className="xl:text-3xl sm:text-2xl xl:w-80 sm:w-60 w-40 font-bold text-center">
                            {currentTab + " - " + currentTitle}
                        </h1>
                    </div>
                    <button
                        className="rounded-full border border-solid border-transparent transition-colors justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                        rel="noopener noreferrer"
                        onClick={nextTab}
                    >
                        Next tab
                    </button>
                </div>
            </header>
            <div className="flex-1 flex mx-16 my-8 justify-center items-center rounded-xl border border-solid border-transparent bg-[#313131]">
                {currentTabComponent()}
            </div>
        </div>
    );
};

export default Pages;
