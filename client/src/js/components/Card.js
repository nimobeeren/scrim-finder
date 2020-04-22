import React from "react";
import PropTypes from "prop-types";
import "./../../styles/Card.css";

const Card = ({ className, title, note, subtitle, children }) => (
  <div className={className}>
    {title && <h3>{title}</h3>}
    {note && <span className="card__note">{note}</span>}
    {subtitle && <div className="card__subtitle">{subtitle}</div>}
    {children}
  </div>
);

Card.propTypes = {
  title: PropTypes.string,
  note: PropTypes.string,
  subtitle: PropTypes.string
};

export default Card;
