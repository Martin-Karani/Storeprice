import React from "react";

function Space({ class1 }) {
  // const styles = {
  //   marginTop: "0px",
  //   marginBottom: "0px",
  // };
  return (
    <div className={`space-wrapper ${class1} flex-row`}>
      <div className="space"></div>
    </div>
  );
}

export default Space;
