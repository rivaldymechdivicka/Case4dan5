import React, { useState, useEffect } from "react";

const ButtonAutoSave = ({ initialState = false, onToggle }) => {
	const [isOn, setIsOn] = useState(initialState);

	useEffect(() => {
		setIsOn(initialState);
	}, [initialState]);

	const handleToggle = () => {
		setIsOn((prevState) => {
			const newState = !prevState;
			if (onToggle) onToggle(newState);
			return newState;
		});
	};

	return (
		<div className="flex w-full max-w-md ">
			<label className="flex items-center cursor-pointer">
				<p className="mr-2">Autosave </p>
				<div className="relative">
					<input
						type="checkbox"
						checked={isOn}
						onChange={handleToggle}
						className="sr-only"
					/>
					<div
						className={`block w-16 h-8 rounded-full transition-colors duration-300 ${
							isOn ? "bg-blue-600" : "bg-gray-400"
						}`}
					></div>
					<div
						className={`absolute top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
							isOn ? "translate-x-8" : ""
						}`}
					></div>
				</div>
				<span
					className={`ml-3 text-gray-700 font-semibold ${
						isOn ? "text-blue-600" : "text-gray-500"
					}`}
				>
					{isOn ? "On" : "Off"}
				</span>
			</label>
		</div>
	);
};

export default ButtonAutoSave;
