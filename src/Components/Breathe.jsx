import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Breathe = ({ duration }) => {
  const handleBreathingComplete = useCallback(() => {
    console.log("Breathing exercise completed");
    // Add any logic for when the breathing exercise is complete
  }, []);

  return (
    <div>
      <h2>Breathe</h2>
      <p>Duration: {duration} seconds</p>
      {/* Add your breathing exercise content here */}
      <button onClick={handleBreathingComplete}>Complete</button>
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
};

// Breathe.propTypes = {
//   duration: PropTypes.number.isRequired,
// };

export default React.memo(Breathe);
