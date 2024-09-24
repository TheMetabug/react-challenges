import React, { useState } from "react";

/**
 * A component that displays a color picker widget and a field that displays
 * the currently selected color. It also includes a button to copy the
 * selected color to the clipboard.
 *
 * @returns A React component that renders a color picker widget and a field
 * that displays the currently selected color.
 */
const HexColorPickerComponent: React.FC = () => {
    const [hexColor, setHexColor] = useState<string>("#00ff00");

    return (
        <div
            className="flex flex-col gap-6 p-10 rounded-lg bg-[#707070]"
            id="counter-module"
        >
            {/* Pick a color title and color 'input'/picker widget */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center">
                    <h2 className="text-3xl font-bold">Pick a color</h2>
                </div>
                <div className="flex items-center justify-center">
                    <input
                        type="color"
                        className="border-2"
                        value={hexColor}
                        onChange={(e) => setHexColor(e.target.value)}
                    />
                </div>
            </div>
            {/* Picked color and copy to clipboard button */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center">
                    <h2 className="text-2xl">Color picked:</h2>
                </div>
                <div className="flex items-center justify-center">
                    <h2 className="text-1xl font-bold">{hexColor}</h2>
                </div>
                <div className="flex items-center justify-center text-[0.9rem] font-bold text-gray-700">
                    <button
                        className=" bg-foreground rounded-lg p-2"
                        onClick={() => navigator.clipboard.writeText(hexColor)}
                    >
                        Copy to clipboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HexColorPickerComponent;
