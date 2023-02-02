import { useState, useEffect } from "react";
import { Points } from "./Points";

export default function Records() {
  const monthsTotal = 12; // assuming we have 12 months data
  const [months, setMonths] = useState([]);
  // console.log(months);

  const getStartDate = (monthsTotal) => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - Math.max(monthsTotal, 1) + 1);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);
    return startDate;
  };
  // calculate the start date

  const monthReducer = (acc, { month, ...transaction }) => {
    const arr = acc[month] || [];
    arr.push(transaction);
    acc[month] = arr;
    return acc;
  };

  const reduceTransactionByMonth = (transactions) =>
    Array.from(Object.entries(transactions.reduce(monthReducer, {})));

  const generateData = (startDate) => {
    const [mn, mx] = [25, 200];
    const length = 200;
    const endDate = new Date();
    const startM = startDate.getTime();
    const spanMs = endDate.getTime() - startM;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return Array.from(
      { length },
      () => startM + Math.round(Math.random() * spanMs)
    )
      .sort((a, b) => a - b)
      .map((date) => ({
        date,
        month: months[new Date(date).getMonth()],
        purchaseAmount: (mn + Math.random() * (mx - mn)) | 0
      }));
  };

  const getTransactionsSince = async (startDate) =>
    reduceTransactionByMonth(generateData(startDate));

  useEffect(() => {
    getTransactionsSince(getStartDate(monthsTotal)).then((res) =>
      setMonths(res)
    );
  }, [monthsTotal]);

  // set the database

  return (
    <div className="records">
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Purchase</th>
            <th>Points Earned</th>
          </tr>
        </thead>
        <tbody>
          {months.map(([month, transactions]) => (
            <Points key={month} month={month} transactions={transactions} />
          ))}
        </tbody>
      </table>
      {/* display the data in one table */}
    </div>
  );
}
