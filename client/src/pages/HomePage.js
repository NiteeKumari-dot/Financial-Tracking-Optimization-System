import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { MessageOutlined } from "@ant-design/icons";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Form, Input, Modal, Select, Table, message, DatePicker } from "antd";
import axios from "axios";
import Spinner from "./../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showChat, setShowChat] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loding, setLoding] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [frequency, setFrequency] = useState("365");
  const [selectDate, setSelectDate] = useState("");
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [get, setGet] = useState(false);

  const getTransactionData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoding(true);
      const data = await axios.post("/api/v1/transaction/get-transaction", {
        userId: user._id,
        frequency,
        selectDate,
        type,
      });

      setLoding(false);

      setTransactionData(data.data.transaction);
    } catch (error) {
      setLoding(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactionData();
  }, [frequency, selectDate, type, get]);

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (editable) {
        setLoding(true);
        await axios.post("/api/v1/transaction/edit-transaction", {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });
        setLoding(false);
        setShowModal(false);
        setGet(!get);

        message.success("Transaction Update SuccessFully");
      } else {
        setLoding(true);
        await axios.post("/api/v1/transaction/add-transaction", {
          ...values,
          userId: user._id,
        });
        setLoding(false);
        setShowModal(false);
        setGet(!get); // <— ADD THIS
        message.success("Transaction Added SuccessFully");
      }
    } catch (error) {
      setLoding(false);
      console.log(error);
    }
  };

  const deleteHandler = async (record) => {
    try {
      setLoding(true);
      await axios.post("/api/v1/transaction/delete-transaction", {
        transactionId: record._id,
      });
      setGet(!get);
      message.success("Transaction Delete SuccessFully");
    } catch (error) {
      setLoding(false);
      message.error("Error in delete Transaction");
    }
  };

  const column = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },

    {
      title: "Action",
      render: (text, record) => (
        <div>
          <EditOutlined
            className="text-primary"
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2 text-danger"
            onClick={() => deleteHandler(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {loding && <Spinner />}

      <div className="container mt-4">
        {/* FILTER SECTION */}
        <div className="d-flex flex-wrap align-items-center gap-4 mb-4 p-3 bg-white shadow-sm rounded-3">
          {/* Frequency Selector */}
          <div className="d-flex flex-column">
            <label className="fw-semibold mb-1">Select Frequency</label>
            <Select
              className="w-100"
              value={frequency}
              onChange={(values) => setFrequency(values)}
            >
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                className="mt-2"
                value={selectDate}
                onChange={(values) => setSelectDate(values)}
              />
            )}
          </div>

          {/* Type Selector */}
          <div className="d-flex flex-column">
            <label className="fw-semibold mb-1">Select Type</label>
            <Select
              className="w-100"
              value={type}
              onChange={(values) => setType(values)}
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>

          {/* View Selector (Center aligned) */}
          <div className="d-flex flex-column justify-content-center">
            <label className="fw-semibold mb-1 text-center">View</label>
            <div className="d-flex justify-content-center align-items-center">
              <UnorderedListOutlined
                className={`mx-2 fs-4 pointer ${
                  viewData === "table" ? "text-primary" : "text-secondary"
                }`}
                onClick={() => setViewData("table")}
              />
              <AreaChartOutlined
                className={`mx-2 fs-4 pointer ${
                  viewData === "analytics" ? "text-primary" : "text-secondary"
                }`}
                onClick={() => setViewData("analytics")}
              />
            </div>
          </div>

          {/* Add Transaction Button */}
          <div className="ms-auto d-flex">
            <button
              className="btn btn-success px-4 py-2 fw-semibold"
              onClick={() => setShowModal(true)}
            >
              + Add Transaction
            </button>
          </div>
        </div>

        {/* DATA SECTION */}
        <div className="bg-white p-3 rounded-3 shadow-sm">
          {viewData === "table" ? (
            <Table
              className="table-striped"
              columns={column}
              dataSource={transactionData}
              pagination={{ pageSize: 6 }}
            />
          ) : (
            <Analytics transactionData={transactionData} />
          )}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        title={
          <h3 className="fw-bold text-center mb-0">
            {editable ? "Edit Transaction" : "Add Transaction"}
          </h3>
        }
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        centered
        className="rounded-4"
        bodyStyle={{
          padding: "24px 28px",
          borderRadius: "12px",
          background: "#f9fafb",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            border: "1px solid #f0f0f0",
          }}
        >
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={editable}
            className="fw-semibold"
          >
            <Form.Item
              label={<span className="fw-bold">Amount</span>}
              name="amount"
              required
            >
              <Input
                type="number"
                placeholder="Enter amount"
                className="p-2"
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>

            <Form.Item
              label={<span className="fw-bold">Transaction Type</span>}
              name="type"
            >
              <Select
                placeholder="Select type"
                style={{ borderRadius: "8px" }}
                className="p-1"
              >
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="fw-bold">Category</span>}
              name="category"
            >
              <Select
                placeholder="Select category"
                style={{ borderRadius: "8px" }}
                className="p-1"
              >
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="travels">Travels</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fee">Fee</Select.Option>
                <Select.Option value="tax">Tax</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="fw-bold">Date</span>}
              name="date"
            >
              <Input
                type="date"
                className="p-2"
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>

            <Form.Item
              label={<span className="fw-bold">Reference Note</span>}
              name="reference"
            >
              <Input
                placeholder="Enter reference"
                className="p-2"
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>

            <div className="d-flex justify-content-end mt-3">
              <button
                type="submit"
                className="btn btn-dark px-4 py-2 fw-bold"
                style={{
                  borderRadius: "8px",
                  letterSpacing: ".5px",
                }}
              >
                SAVE
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </Layout>
  );
};

export default HomePage;