import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const PaginationSelector = ({ value, onChange }) => {
	const [selectedLimit, setSelectedLimit] = useState(value || "60000");

	useEffect(() => {
		setSelectedLimit(value);
	}, [value]);

	const handleChange = (event) => {
		const newValue = event.target.value;
		setSelectedLimit(newValue);
		if (onChange) onChange(newValue);
	};

	return (
		<div className="d-flex align-items-center">
			<p className="font-weight-bold text-secondary mr-2">Set time</p>
			<Form.Select
				value={selectedLimit}
				onChange={handleChange}
				className="border border-gray-300 rounded shadow-sm"
			>
				<option value="60000">1 Minute</option>
				<option value="180000">3 Minutes</option>
				<option value="300000">5 Minutes</option>
				<option value="600000">10 Minutes</option>
				<option value="900000">15 Minutes</option>
			</Form.Select>
		</div>
	);
};

export default PaginationSelector;
