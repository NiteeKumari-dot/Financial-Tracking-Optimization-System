import React from "react";
import { Progress, Card, Row, Col, Divider } from "antd";

const Analytics = ({ transactionData }) => {
  // Transaction calculation
  const totalTransaction = transactionData.length;
  const totalIncomeTransaction = transactionData.filter(
    (data) => data.type === "income"
  );
  const totalExpenseTransaction = transactionData.filter(
    (data) => data.type === "expense"
  );

  const incomePercent =
    (totalIncomeTransaction.length / totalTransaction) * 100;

  const expensePercent =
    (totalExpenseTransaction.length / totalTransaction) * 100;

  // Transaction turnover
  const totalTurnover = transactionData.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIncomeTurnOver = transactionData
    .filter((data) => data.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpanseTurnOver = transactionData
    .filter((data) => data.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const incomePercentTurnOver = (totalIncomeTurnOver / totalTurnover) * 100;
  const expensePercentTurnOver = (totalExpanseTurnOver / totalTurnover) * 100;

  const categories = [
    "tip",
    "salary",
    "project",
    "travels",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  return (
    <div className="container py-4">
      <Row gutter={[24, 24]}>
        {/* TOTAL TRANSACTIONS */}
        <Col span={24} md={12} lg={6}>
          <Card
            className="analytics-card"
            styles={{
    header: {
  background: "linear-gradient(135deg, #62A4A8, #76B8BC)",
  color: "white",
  padding: "12px 16px",
  fontWeight: "600",
  fontSize: "16px",
},

  }}
            title={
              <div className="analytics-title">
              📊 Total Transactions</div>
            }
          >
            <div className="analytics-stats">
              <p>
                <span className="stat-label">Income:</span>{" "}
                <span className="stat-green">
                  {totalIncomeTransaction.length}
                </span>
              </p>
              <p>
                <span className="stat-label">Expense:</span>{" "}
                <span className="stat-red">
                  {totalExpenseTransaction.length}
                </span>
              </p>
            </div>

            <Divider />

            {/* CENTERING FIX APPLIED HERE */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                width: "100%",
              }}
            >
              <Progress
                type="circle"
                percent={incomePercent.toFixed(0)}
                strokeColor="#4CAF50"
              />
              <Progress
                type="circle"
                percent={expensePercent.toFixed(0)}
                strokeColor="#F44336"
              />
            </div>
          </Card>
        </Col>

        {/* TOTAL TURNOVER */}
        <Col span={24} md={12} lg={6}>
          <Card
            className="analytics-card"
            styles={{
    header: {
  background: "linear-gradient(135deg, #CBA1B0, #D19CAF)",
  color: "white",
  padding: "12px 16px",
  fontWeight: "600",
  fontSize: "16px",
},

  }}

            title={<div className="analytics-title">💰 Total Turnover</div>}
          >
            <div className="analytics-stats">
              <p>
                <span className="stat-label">Income:</span>{" "}
                <span className="stat-green">{totalIncomeTurnOver}</span>
              </p>
              <p>
                <span className="stat-label">Expense:</span>{" "}
                <span className="stat-red">{totalExpanseTurnOver}</span>
              </p>
            </div>

            <Divider />

            {/* CENTERING FIX */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                width: "100%",
              }}
            >
              <Progress
                type="circle"
                percent={incomePercentTurnOver.toFixed(0)}
                strokeColor="#4CAF50"
              />
              <Progress
                type="circle"
                percent={expensePercentTurnOver.toFixed(0)}
                strokeColor="#F44336"
              />
            </div>
          </Card>
        </Col>

        {/* CATEGORY INCOME */}
        <Col span={24} md={12} lg={6}>
          <Card
            className="analytics-card"
            styles={{
    header: {
  background: "linear-gradient(135deg, #A699C5, #B9A9DF)",
  color: "white",
  padding: "12px 16px",
  fontWeight: "600",
  fontSize: "16px",
},

  }}
            title={<div className="analytics-title">📈 Income Breakdown</div>}
          >
            {categories.map((category) => {
              const amount = transactionData
                .filter((t) => t.type === "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);

              return amount > 0 ? (
                <div key={category} className="category-row">
                  <span className="category-label">
                    {category.toUpperCase()}
                  </span>
                  <Progress
                    percent={((amount / totalIncomeTurnOver) * 100).toFixed(0)}
                    strokeColor="#4CAF50"
                  />
                </div>
              ) : null;
            })}
          </Card>
        </Col>

        {/* CATEGORY EXPENSE */}
        <Col span={24} md={12} lg={6}>
          <Card
            className="analytics-card"
            styles={{
    header: {
  background: "linear-gradient(135deg, #5FAF79, #A6EBBA)",
  color: "white",
  padding: "12px 16px",
  fontWeight: "600",
  fontSize: "16px",
},

  }}
            title={
              <div className="analytics-title">📉 Expense Breakdown</div>
            }
          >
            {categories.map((category) => {
              const amount = transactionData
                .filter((t) => t.type === "expense" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);

              return amount > 0 ? (
                <div key={category} className="category-row">
                  <span className="category-label">
                    {category.toUpperCase()}
                  </span>
                  <Progress
                    percent={((amount / totalExpanseTurnOver) * 100).toFixed(0)}
                    strokeColor="#F44336"
                  />
                </div>
              ) : null;
            })}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;