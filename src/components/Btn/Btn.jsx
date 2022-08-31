import React from "react";
import { func, bool, string } from "prop-types";

const Btn = ({
    text,
    loading,
    className,
    disabled,
    onClick,
    danger,
    type,
    icon,
    id,
    test_id,
    style,
}) => {
    return (
        <button
            id={id}
            data-cy={test_id}
            className={` ${
                danger ? "btn-danger" : "bg-theme"
            } btn btn-log text-white  ${className ? className : ""}`}
            disabled={disabled || loading}
            onClick={onClick}
            type={type}
            style={{
                fontSize: "17px",
                paddingLeft: "20px",
                paddingRight: "20px",
                ...style,
            }}
        >
            {loading ? (
                "Loading..."
            ) : (
                <>
                    <i className={icon}></i> {text}
                </>
            )}
        </button>
    );
};

Btn.propTypes = {
    text: func.isRequired,
    loading: bool,
    className: string,
    disabled: bool,
    onClick: func.isRequired,
    danger: bool,
    type: string,
};

export default Btn;
