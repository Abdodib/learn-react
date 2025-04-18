
import { createRoot } from "react-dom/client";
import Order from "./Order";
import { StrictMode } from "react";
import PizzaOfTheDay from "./PizzaOfTheDay";


const App = () => {
  return (
    <StrictMode>
    <div>
      <h1 className="logo">padre Gino's - order now</h1>
      <Order />
      <PizzaOfTheDay />
    </div>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>);
 