import React from "react";
import PropTypes from "prop-types";

const StrikeLetter = ({ letter }) => {
  return (
    <span key={letter}>
      {letter}
    </span>
  );
};

StrikeLetter.propTypes = {
  letter: PropTypes.string,
};

export default StrikeLetter;