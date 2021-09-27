import React from "react";
import Image from 'next/image'


function ComparePopUp() {
  return (
    <div className="compare-popup">
      <div>
        <div className="img-wrapper">
          <Image src="#" alt="" />
        </div>
        <div className="compare-popup__name">Samsung S9+</div>
      </div>
      <div>
        <div className="img-wrapper">
          <Image src="#" alt="" />
        </div>
        <div>Samsung S9+</div>
      </div>
      <button>Compare</button>
    </div>
  );
}

export default ComparePopUp;
