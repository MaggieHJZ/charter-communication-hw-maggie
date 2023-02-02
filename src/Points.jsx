import React, { useState, useEffect } from "react";

export function Points({ month, transactions }) {
  const [totals, setTotals] = useState({ score: 0, moneySpent: 0 });
  const { moneySpent, score } = totals;
  // data initialization

  const calcScore = (price) => {
    if (price < 50) return 0;
    if (price < 100) return price - 50;
    return (price - 100) * 2 + 50;
  };
  // A customer receives 2 points for every dollar spent over $100
  // in each transaction, plus 1 point for every dollar spent over $50
  // in each transaction

  useEffect(() => {
    const totals = transactions.reduce(
      ({ score, moneySpent }, { purchaseAmount }) => {
        moneySpent += purchaseAmount;
        score += calcScore(purchaseAmount);
        return { score, moneySpent };
      },
      { score: 0, moneySpent: 0 }
    );

    setTotals(totals);
  }, [transactions]);

  return (
    <tr>
      <td>
        <p>{month}</p>
      </td>
      <td>
        <span>{moneySpent}</span>
      </td>
      <td>
        <span>{score}</span>
      </td>
    </tr>
  );
}
