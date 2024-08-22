import React from "react";
import { Bombs } from "./components/Bombs/Bombs";

const App: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bomb Timer Simulation</h1>
      <Bombs /> {/* Rendering the Bombs component */}
    </div>
  );
};

export default App;
