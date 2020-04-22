import React from "react";
import PropTypes from "prop-types";
import ChevronToggle from "./ChevronToggle";
import "../../styles/ReplyCount.css";

const ReplyCount = ({ count, expanded, onClick }) => {
  return (
    <div className="reply-count" onClick={onClick}>
      <div className="reply-count__label">
        {count} repl{count === 1 ? "y" : "ies"}
      </div>
      <ChevronToggle pointUp={expanded} />
    </div>
  );
};

ReplyCount.propTypes = {
  count: PropTypes.number,
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
};
ReplyCount.defaultProps = {
  count: 0,
  expanded: false,
};

export default ReplyCount;
