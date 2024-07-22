import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Button = ({ to, className, children, type = "button", onClick, ...props }) => {
    const navigate = useNavigate();

    const handleClick = (event) => {
        if (to) {
            navigate(to);
        }
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <BootstrapButton
            type={type}
            className={`transition ease-in-out delay-150 hover:scale-105 duration-300 ${className}`}
            onClick={handleClick}
            {...props}
        >
            {children}
        </BootstrapButton>
    );
};

export default Button;
