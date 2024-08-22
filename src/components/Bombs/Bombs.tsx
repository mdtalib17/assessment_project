import React, { useState, useEffect } from "react";
import "./bombsStyle.css";
// Define the types for the state objects
type TimersState = {
  bombA: number;
  bombB: number;
  bombC: number;
  bombD: number;
};

type ExplodedState = {
  bombA: boolean;
  bombB: boolean;
  bombC: boolean;
  bombD: boolean;
};

export const Bombs: React.FC = () => {
  const initialTimers: TimersState = {
    bombA: 20,
    bombB: 13,
    bombC: 14,
    bombD: 10,
  };
  const initialExploded: ExplodedState = {
    bombA: false,
    bombB: false,
    bombC: false,
    bombD: false,
  };

  const [timers, setTimers] = useState<TimersState>(initialTimers);
  const [exploded, setExploded] = useState<ExplodedState>(initialExploded);
  const [started, setStarted] = useState<boolean>(false);

  const handleExplode = () => setStarted(true);

  const allBombsExploded = () => Object.values(exploded).every(Boolean);

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        setTimers((prevTimers) => {
          const newTimers = { ...prevTimers };
          Object.keys(newTimers).forEach((bomb) => {
            if (newTimers[bomb as keyof TimersState] > 0) {
              newTimers[bomb as keyof TimersState] -= 1;
            } else if (!exploded[bomb as keyof ExplodedState]) {
              setExploded((prev) => ({ ...prev, [bomb]: true }));
            }
          });
          return newTimers;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [started, exploded]);

  const getButtonText = () => {
    if (!started) return "Explode";
    if (allBombsExploded()) return "All bombs exploded";
    return "Waiting to explode...";
  };

  return (
    <div className="container-element">
      {["A", "B", "C", "D"].map((bomb) => (
        <div
          key={bomb}
          style={{
            border: "1px solid black",
            padding: "20px",
            marginBottom: bomb === "D" ? "0" : "1rem",
            backgroundColor: "#e1e1e6",
          }}
        >
          <span>Bomb {bomb}</span>
          <span
            style={{
              float: "right",
              color: exploded[`bomb${bomb}` as keyof ExplodedState]
                ? "#f55f5f"
                : "black",
            }}
          >
            {exploded[`bomb${bomb}` as keyof ExplodedState]
              ? " (Exploded)"
              : ` ${timers[`bomb${bomb}` as keyof TimersState]} seconds`}
          </span>
        </div>
      ))}
      <button
        className="btn-explode"
        style={{ backgroundColor: allBombsExploded() ? "#f55f5f" : "#b1aee8" }}
        onClick={handleExplode}
        disabled={started}
      >
        {getButtonText()}
      </button>
    </div>
  );
};
