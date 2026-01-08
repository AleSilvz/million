import { useLocation, useNavigate } from "react-router";
import "./Goals.css";
import { useEffect, useState } from "react";

export default function Goals() {
  const goal = Number(useLocation().state?.goal);
  const localGoal = Number(JSON.parse(localStorage.getItem("goal")));
  const goalsReal = (localGoal * (localGoal + 1)) / 2;
  const local = JSON.parse(localStorage.getItem("goalsData")) || {};
  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();

  if (!localGoal) {
    navigate("/");
  }

  function updateBalance() {
    setBalance((local[localGoal] || []).reduce((acc, e) => acc + Number(e), 0));
  }

  useEffect(() => {
    updateBalance();
  }, []);

  function addValue(e) {
    const valueDeposite = Number(e.currentTarget.dataset.value);

    if (!local[localGoal]) {
      local[localGoal] = [];
    }

    const set = new Set(local[localGoal] || []);

    set.has(valueDeposite) ? set.delete(valueDeposite) : set.add(valueDeposite);

    local[localGoal] = [...set];

    localStorage.setItem("goalsData", JSON.stringify(local));
    updateBalance();
  }

  return (
    <div className="container-g">
      <div className="header-g">
        <h1>Goals {localGoal}</h1>
        <h1>
          {goalsReal?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h1>
        <h1>
          Current Balance:{" "}
          {balance.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h1>
      </div>

      <div className="content-g">
        {Array.from({ length: localGoal }, (_, i) => {
          const value = i + 1;
          const select = local[localGoal] || [];

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
