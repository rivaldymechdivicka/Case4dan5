import React, { useEffect } from "react";
import { Toast } from "react-bootstrap";

const Alert = ({ message, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(onClose, 3000);
		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<Toast
			style={{
				position: "fixed",
				top: "1rem",
				left: "50%",
				transform: "translateX(-50%)",
				zIndex: 1050 
			}}
			onClose={onClose}
			bg="primary"
			className="text-white"
		>
			<Toast.Body>{message}</Toast.Body>
		</Toast>
	);
};

export default Alert;
