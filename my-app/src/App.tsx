import cuteMoney from "./assets/cute-money.png";
import { PurchaseHistory } from "./components/PurchaseHistory";
import "./App.css";

function App() {
  return (
    <>
      <section id="center">
        <div className="hero">
          <img
            src={cuteMoney}
            className="base"
            width="170"
            height="150"
            alt="a cartoon drawing of a piece of cash money."
          />
        </div>
        <div>
          <h1>The Little Ledger</h1>
        </div>
      </section>

      <section id="current-budget">
        <div className="purchase-history">
          <h2>Your Purchase History</h2>
          <PurchaseHistory />
        </div>
      </section>
    </>
  );
}

export default App;
