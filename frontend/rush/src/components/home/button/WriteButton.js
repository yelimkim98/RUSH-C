import React from 'react';
import {Link} from "react-router-dom";

const WriteButton = () => {
  return (
      <Link to="/writing/step1">
        <button style={{
          position: "fixed",
          zIndex: 10,
          bottom: 0,
          right: 0,
          width: "100px",
          height: "50px",
          margin: "10px",
        }}> 글쓰기 </button>
      </Link>
  );
};

export default WriteButton;