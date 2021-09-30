import React from "react";
import Image from "next/image";
import Oops from "../public/oops.jpg";

function Empty({ error }) {
  return (
    <div className="empty flex-row align-center">
      <Image src={Oops} alt="" width="50px" height="50px" />

      <p className="error">{error}</p>
    </div>
  );
}

export default Empty;
