import Pizza from "../pizza";
import Cart from "../Cart";
import { useState, useEffect, useContext } from "react"; 
import { CartContext } from "../contexts";
import { createLazyFileRoute } from "@tanstack/react-router";


export const Route = createLazyFileRoute("/order")({
  component: Order,
});

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Order(){
  
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("medium");



  let price, selectedPizza;
  if(!loading){
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id)
    price = intl.format(selectedPizza.sizes[pizzaSize])
  }

useEffect(() => {
  fetchPizzaTypes();
}, []);

async function fetchPizzaTypes() {
  const pizzasRes = await fetch("/api/pizzas");
  const pizzasJson = await pizzasRes.json();
  setPizzaTypes(pizzasJson);
  setLoading(false);
}
    return (
<div className="order">
      <h2>Create Order</h2>
      <form
  onSubmit={(e) => {
    e.preventDefault();
    setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
  }}
>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
  onChange={(e) => {setPizzaType(e.target.value);
  }}
  name="pizza-type"
  value={pizzaType}>

              {
                pizzaTypes.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))}

            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                onChange={(e) => setPizzaSize(e.target.value)}
                  checked={pizzaSize === "S"}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                onChange={(e) => setPizzaSize(e.target.value)}
                  checked={pizzaSize === "M"}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                onChange={(e) => setPizzaSize(e.target.value)}
                  checked={pizzaSize === "L"}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        {
    loading ? (
      <h3>Loading...</h3>
    ) : (
      <div className="order-pizza">
        <Pizza
          name={selectedPizza.name}
          description={selectedPizza.description}
          image={selectedPizza.image}
        />
        <p>{price}</p>
      </div>
    )
  }
      </form>
      {
        loading ? <h2>loading....</h2> : <Cart cart = {cart} />
      }
    </div>
    );
}
export default Order;
