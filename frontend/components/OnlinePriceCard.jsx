import  { useState } from "react";
import { ReactComponent as RightArrow } from "../public/right-arrow.svg";
import { ReactComponent as DownArrow } from "../public/down-arrow.svg";
import { ReactComponent as Tick } from "../public/tick.svg";
import Empty from "./Empty";

const OnlinePriceCard = ({ onlinePrices }) => {
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    setInput({
      [e.target.value]: e.target.checked,
    });
  };

  return (
    <div className="stores__online space-bottom">
      <h3 className="online-store-name category-name">Online Shops</h3>
      <div className="inStore__filterSort flex-row justify-space-btwn">
        <div className="region-filter">
          <span>Filter</span>
          <select>
            <option value="Nairobi">Nairobi</option>
          </select>
        </div>
        <div className="region-filter">
          <span>Sorted By</span>
          <select>
            <option value="Nairobi">Price</option>
          </select>
        </div>
      </div>
      {onlinePrices.length > 0 ? (
        onlinePrices.map(({ _id, onlineSite, storeName, price }, index) => (
          <div className="stores__online-cardFull" key={index}>
            <form className="stores__online-card">
              <label className="more-icon">
                <DownArrow style={{ height: "10px", width: "10px" }} />
                <input
                  type="checkbox"
                  name="more"
                  value={_id}
                  onClick={handleChange}
                />
              </label>
              <div className="stores__online-card__right">
                <div className="flex-row align-center">
                  <div className="img-wrapper">
                    <img src="#" alt="" />
                  </div>
                  <div>
                    <p className="stores__online-name">{onlineSite}</p>
                    <p className="stores__online-store">{storeName}</p>
                  </div>
                </div>
                <div></div>
              </div>
              <div className="stores__online-card__left">
                <p className="stores__online-price">Ksh {price}</p>
                <div className="flex-row align-center">
                  <div className="stores__online-seeMore">See More</div>
                  <div className="stores__online-arrow svg-wrapper">
                    <RightArrow style={{ height: "10px", width: "10px" }} />
                  </div>
                </div>
              </div>
            </form>

            {input[_id] && (
              <ul className="stores-showMore ">
                <li className="flex-row align-center">
                  <div>
                    <Tick className="tick" />
                  </div>
                  <span>Free Delivery</span>
                </li>
                <li className="flex-row align-center">
                  <div>
                    <Tick className="tick" />
                  </div>
                  <span>Free Installation</span>
                </li>
              </ul>
            )}
          </div>
        ))
      ) : (
        <Empty error="OOPs no Online Store Prices" />
      )}
    </div>
  );
};

export default OnlinePriceCard;
