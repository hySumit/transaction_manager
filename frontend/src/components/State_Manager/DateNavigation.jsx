import React from "react";
import PropTypes from "prop-types";

const DateNavigation = ({ currentMonth, onPrevMonth, onNextMonth }) => {
  return (
    <div className="flex justify-between">
      <button onClick={onPrevMonth}>Previous</button>
      <span>{currentMonth}</span>
      <button onClick={onNextMonth}>Next</button>
    </div>
  );
};

DateNavigation.propTypes = {
  currentMonth: PropTypes.string.isRequired,
  onPrevMonth: PropTypes.func.isRequired,
  onNextMonth: PropTypes.func.isRequired,
};

export default DateNavigation;
