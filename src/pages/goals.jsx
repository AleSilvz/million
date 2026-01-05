import { useLocation } from "react-router";
import "./Goals.css";
import { useEffect, useState } from "react";

export default function Goals() {
  const goal = useLocation().state?.goal;
  const local = JSON.parse(localStorage.getItem("goalsData")) || {};
  const [balance, setBalance] = useState(0);

  function updateBalance() {
    setBalance((local[goal] || []).reduce((acc, e) => acc + Number(e), 0));
  }

  useEffect(() => {
    updateBalance();
  }, []);

  function addValue(e) {
    const valueDeposite = Number(e.currentTarget.dataset.value);

    if (!local[goal]) {
      local[goal] = [];
    }

    const set = new Set(local[goal] || []);

    set.has(valueDeposite) ? set.delete(valueDeposite) : set.add(valueDeposite);

    local[goal] = [...set];

    localStorage.setItem("goalsData", JSON.stringify(local));
    updateBalance();
  }

  return (
    <div className="container-g">
      <div className="header-g">
        <h1>
          Goals {goal} - current balance{" "}
          {balance.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h1>
      </div>

      <div className="content-g">
        {Array.from({ length: goal }, (_, i) => {
          const value = i + 1;
          const select = local[goal] || [];

          return (
            <div
              key={i}
              className={select.includes(value) ? "goal-c" : "goal-g"}
              data-value={value}
              onClick={(e) => addValue(e)}
            >
              {select.includes(value) ? "✔" : value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
