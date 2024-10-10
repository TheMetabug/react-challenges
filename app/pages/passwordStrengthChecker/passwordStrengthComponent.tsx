import React, { useState } from "react";

const PasswordStrengthTypes = [
    { name: "Empty", color: "border-white-500" },
    { name: "Weak", color: "border-red-500" },
    { name: "Normal", color: "border-yellow-500" },
    { name: "Strong", color: "border-green-500" },
];

/**
 * A component that renders a password input field and displays the strength of the entered password.
 * The strength is determined by the length of the password and is categorized.
 * The component also sets the border color of the input field according to the strength of the password.
 */
const PasswordStrengthComponent: React.FC = () => {
    const [password, setPassword] = useState<{
        value: string;
        strengthType: { name: string; color: string };
    }>({ value: "", strengthType: PasswordStrengthTypes[0] });

    /**
     * Checks the strength of the given password and set the state.
     * The strength is determined by the length of the password and
     * is categorized into PasswordStrengthTypes.
     * @param value The password to check.
     */
    const checkPasswordStrength = (value: string) => {
        let result: { name: string; color: string } = PasswordStrengthTypes[0];

        if (value.length > 0 && value.length < 8) {
            result = PasswordStrengthTypes[1];
        } else if (value.length >= 8 && value.length < 12) {
            result = PasswordStrengthTypes[2];
        } else if (value.length >= 12) {
            result = PasswordStrengthTypes[3];
        }

        setPassword({
            value: value,
            strengthType: result,
        });
    };

    return (
        <div className="flex flex-col justify-center items-center w-[20rem]">
            <label className="flex flex-col">
                {/* Password label */}
                <div className="text-1xl font-bold my-5">
                    <span>Enter your password</span>
                </div>
                {/* Password input field and strength text */}
                <div className="flex flex-col gap-1">
                    <input
                        className={`text-gray-500 border-4 rounded-lg outline-none p-1 ${password.strengthType.color}`}
                        type="text"
                        onChange={(e) => checkPasswordStrength(e.target.value)}
                        value={password.value}
                    ></input>
                    <span className="text-xs">
                        {password.strengthType.name != "Empty"
                            ? `Password strength: ${password.strengthType.name}`
                            : "Please enter a password"}
                    </span>
                </div>
            </label>
        </div>
    );
};

export default PasswordStrengthComponent;
