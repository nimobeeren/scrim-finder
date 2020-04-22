import React from "react";
import PropTypes from "prop-types";
import "./../../styles/Button.css";

const Button = (props) => {
  const { className, label, href, onClick } = props;
  if (href) {
    return (
      <a href={href}>
        <button className={className} onClick={onClick}>
          {label}
        </button>
      </a>
    );
  } else {
    return (
      <button className={className} onClick={onClick}>
        {label}
      </button>
    );
  }
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
};
Button.defaultProps = {
  label: "Button",
};

export default Button;
