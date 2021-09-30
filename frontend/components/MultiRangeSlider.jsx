import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "../styles/MultiRangeSlider.module.css";
const MultiRangeSlider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const range = useRef(null);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => {
      Math.round(((value - min) / (max - min)) * 100);
    },
    [min, max]
  );
  const handleVal = (e) => {
    if (e.target.name === "minVal") {
      setMinVal(e.target.value);
    } else {
      setMaxVal(e.target.value);
    }
  };
  // Set width of the range to change from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to change from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);
  return (
    <div className={styles["range-wrapper"]}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className={`${styles["thumb"]} ${styles["thumb--left"]}`}
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className={`${styles["thumb"]} ${styles["thumb--right"]}`}
      />
      <div className={styles["slider"]}>
        <div className={styles["slider__track"]} />
        <div ref={range} className={styles["slider__range"]} />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <input
            type="number"
            name="minVal"
            className={styles["slider__left-input"]}
            value={minVal}
            onChange={handleVal}
          />
          <p className={styles["to"]}>To</p>
          <input
            type="number"
            name="maxVal"
            className={styles["slider__right-input"]}
            value={maxVal}
            onChange={handleVal}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
