import { Router, useNavigate } from "react-router";
import "./Home.css";
import { useEffect, useState } from "react";
export default function Home() {
  const navigate = useNavigate();
  const local = JSON.parse(localStorage.getItem("goalsData")) || {};
  const [currentBalance, setCurrentBalance] = useState(0);

  function renderCurrentBalance() {
    const balance = Object.values(local).reduce((acc, valor) => {
      return acc + valor.reduce((acc, i) => acc + i, 0);
    }, 0);

    setCurrentBalance(balance);
  }

  useEffect(() => {
    renderCurrentBalance();
  }, []);

  function goToGoal(e) {
    navigate(`/goals`, {
      state: {
        goal: e.currentTarget.dataset.value,
      },
    });
  }

  return (
    <div className="container">
      <h1>One Million</h1>

      <h1>Goals</h1>

      <div className="goals">
        {Array.from({ length: 11 }, (_, i) => (
          <div
            key={i}
            className="goal"
            data-value={100 + i * 50}
            onClick={(e) => goToGoal(e)}
          >
            {100 + i * 50}
          </div>
        ))}
      </div>

      <h1>current balance</h1>
      <h1>
        {currentBalance.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </h1>
    </div>
  );
}
