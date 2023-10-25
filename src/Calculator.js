import React, { useState } from "react";
import "./Calculator.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Calculator = () => {
  const [financialValue, setFinancialValue] = useState(""); 
  const [countryValue, setCountryValue] = useState("");
  const [annualIncomeRange, setAnnualIncomeRange] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [investmentType, setInvestmentType] = useState("");
  const [discount, setDiscount] = useState(0); // Combine discount for both short and long term
  const [netCapitalGains, setNetCapitalGains] = useState(0);
  const [taxToBePaid, setTaxToBePaid] = useState(0);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "financialValue") {
      setFinancialValue(value);
    } else if (name === "countryValue") {
      setCountryValue(value);
    }
  };

  const handlePurchasePriceChange = (e) => {
    setPurchasePrice(e.target.value);
  };

  const handleSalePriceChange = (e) => {
    setSalePrice(e.target.value);
  };

  const handleExpensesChange = (e) => {
    setExpenses(e.target.value);
  };

  const handleAnnualIncomeChange = (e) => {
    const selectedRange = e.target.value;

    // Map selected range to numeric value
    const incomeRanges = {
      "$0 - $16,200": 16200,
      "$16,201 - $45,000": 45000,
      "$45,001 - $120,000": 120000,
      "$120,001 - $180,000": 180000,
      "$180,001+": 180001,
    };
    const annualIncome = incomeRanges[selectedRange] || 0;

    const calculatedTaxRate = calculateTaxRate(annualIncome);
    setAnnualIncomeRange(selectedRange);
    setTaxRate(calculatedTaxRate);
  };

  const handleCalculateClick = () => {
    console.log("Button clicked");

    if (
      !purchasePrice ||
      !salePrice ||
      !expenses ||
      !investmentType ||
      !annualIncomeRange
    ) {
      // Check if any of the required fields are empty
      alert("Please fill in all required fields before calculating.");
      return;
    }

    const calculatedCapitalGains = calculateCapitalGains(
      parseFloat(purchasePrice),
      parseFloat(salePrice),
      parseFloat(expenses)
    );

    // const calculatedCapitalGains = calculateCapitalGains(purchase, sale, expense);
    const calculatedDiscount = calculateDiscount(
      calculatedCapitalGains,
      investmentType
    );

    // Function to calculate net capital gains
    const calculatedNetCapitalGains = calculateNetCapitalGains(
      calculatedCapitalGains,
      calculatedDiscount
    );

    // Function to calculate tax to be paid
    const calculatedTax = calculateTaxToBePaid(
      calculatedNetCapitalGains,
      taxRate
    );

    setDiscount(calculatedDiscount);
    setNetCapitalGains(calculatedNetCapitalGains);
    setTaxToBePaid(calculatedTax);
  };

  // Function to calculate capital gains
  function calculateCapitalGains(purchasePrice, salePrice, expenses) {
    return salePrice - purchasePrice - expenses;
  }

  function calculateDiscount(capitalGainsAmount, investmentType) {
    console.log("Investment Type:", investmentType);
    console.log("Capital Gains Amount:", capitalGainsAmount);

    if (investmentType === "Long Term" && capitalGainsAmount > 0) {
      return capitalGainsAmount * 0.5; // Long-term discount
    } else if (investmentType === "Short Term" && capitalGainsAmount > 0) {
      return capitalGainsAmount * 0.3; // Short-term discount
    } else {
      return 0;
    }
  }

  // Function to calculate tax rate based on annual income
  function calculateTaxRate(annualIncome) {
    if (annualIncome <= 16200) {
      return 19;
    } else if (annualIncome <= 45000) {
      return 32.5;
    } else if (annualIncome <= 120000) {
      return 37;
    } else if (annualIncome <= 180000) {
      return 29;
    } else {
      return 45;
    }
  }

  function calculateNetCapitalGains(capitalGainsAmount, discount) {
    return capitalGainsAmount - discount;
  }

  function calculateTaxToBePaid(netCapitalGains, taxRate) {
    return (netCapitalGains * (taxRate / 100)).toFixed(2);
  }

  //reset the values
  const handleReset = () => {
    setFinancialValue("");
    setCountryValue("");
    setAnnualIncomeRange("");
    setTaxRate(0);
    setPurchasePrice("");
    setSalePrice("");
    setExpenses("");
    setInvestmentType("");
    setDiscount(0);
    setNetCapitalGains(0);
    setTaxToBePaid(0);
  };

  return (
    <div className="container mt-5">
      <h2>Free Crypto Tax Calculator for Australia</h2>
      <div className="calculator d-flex align-items-center justify-content-center w-100">
        <form className="row g-2">
          <div className="col-md-6">
            <label
              style={{ fontSize: "20px", color: "gray" }}
              htmlFor="financialValue"
              className="form-label"
            >
              Financial Year
            </label>
            <select
              className="form-select"
              id="financialValue"
              name="financialValue"
              style={{ width: "50%", marginLeft: "25%" }}
              value={financialValue}
              onChange={handleSelectChange}
              required
            >
              <option disabled value="">
                Choose...
              </option>
              <option value="FY 2023-24">FY 2023-24</option>
              <option value="FY 2022-23">FY 2022-23</option>
            </select>
          </div>
          <div className="col-md-6">
            <label
              style={{ fontSize: "20px", color: "gray" }}
              htmlFor="countryValue"
              className="form-label"
            >
              Country
            </label>
            <select
              className="form-select"
              id="countryValue"
              name="countryValue"
              style={{ width: "50%", marginLeft: "25%" }}
              value={countryValue}
              onChange={handleSelectChange}
              required
            >
              <option disabled value="">
                Choose...
              </option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <hr />

          <div className="col-md-4">
            <label
              style={{ fontSize: "18px", color: "gray" }}
              htmlFor="purchaseValue"
              className="form-label"
            >
              Enter purchase price of Crypto($)
            </label>
            <input
              type="number"
              className="form-control"
              id="purchaseValue"
              name="purchaseValue"
              value={purchasePrice}
              onChange={handlePurchasePriceChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label
              style={{ fontSize: "18px", color: "gray" }}
              htmlFor="saleValue"
              className="form-label"
            >
              Enter Sale price of Crypto($)
            </label>
            <input
              type="number"
              className="form-control"
              id="saleValue"
              name="salePrice"
              value={salePrice}
              onChange={handleSalePriceChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label
              style={{ fontSize: "18px", color: "gray" }}
              htmlFor="expensesValue"
              className="form-label"
            >
              Enter your Expenses($)
            </label>
            <input
              type="number"
              className="form-control"
              id="expensesValue"
              name="expensesValue"
              value={expenses}
              onChange={handleExpensesChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label
              style={{ fontSize: "18px", color: "gray" }}
              htmlFor="investmentType"
              className="form-label"
            >
              Investment Type
            </label>
            <select
              className="form-select"
              id="investmentType"
              name="investmentType"
              required
              onChange={(e) => setInvestmentType(e.target.value)}
              value={investmentType}
            >
              <option disabled value="">
                Choose...
              </option>
              <option
                style={{ fontSize: "18px", color: "gray" }}
                value="Long Term"
              >
                Long Term
              </option>
              <option
                style={{ fontSize: "18px", color: "gray" }}
                value="Short Term"
              >
                Short Term
              </option>
            </select>
          </div>
          <div className="col-md-4">
            <label
              style={{ fontSize: "18px", color: "gray" }}
              htmlFor="annualIncome"
              className="form-label"
            >
              Select your Annual Income
            </label>
            <select
              className="form-select"
              id="annualIncomeRange"
              name="annualIncomeRange"
              onChange={handleAnnualIncomeChange}
              value={annualIncomeRange}
              required
            >
              <option disabled value="">
                Choose...
              </option>
              <option style={{ fontSize: "18px", color: "gray" }}>
                $0 - $16,200
              </option>
              <option style={{ fontSize: "18px", color: "gray" }}>
                $16,201 - $45,000
              </option>
              <option style={{ fontSize: "18px", color: "gray" }}>
                $45,001 - $120,000
              </option>
              <option style={{ fontSize: "18px", color: "gray" }}>
                $120,001 - $180,000
              </option>
              <option style={{ fontSize: "18px", color: "gray" }}>
                $180,001+
              </option>
            </select>
          </div>

          <div className="col-md-4">
            <label
              style={{ fontSize: "18px", color: "gray" }}
              className="form-label"
            >
              Tax Rate(%)
            </label>
            <br />
          
            <input
              type="number"
              className="form-control"
              value={taxRate}
              style={{ fontSize: "20px", color: "purple", textAlign: "center" }}
              required
              readOnly
            />
          </div>
          <div className="col-12 ">
            <button
              className="btn btn-primary m-2"
              type="button"
              onClick={handleCalculateClick}
            >
              Calculate
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>

          <div className="col-md-4 ">
            <label
              style={{ fontSize: "18px", color: "gray" }}
              className="form-label "
            >
              Discount for Gains($)
            </label>
            <br />
         
            <input
              type="text"
              className="form-control"
              value={discount}
              style={{ fontSize: "18px", color: "blue", textAlign: "center" }}
              required
              readOnly
            />
          </div>
          <div className="col-md-4 otp">
            <label
              style={{ fontSize: "18px", color: "gray" }}
              className="form-label"
            >
              Net Capital Gains($)
            </label>
            <br />
            
            <input
              type="text"
              className="form-control"
              value={netCapitalGains}
              style={{ fontSize: "18px", color: "green", textAlign: "center" }}
              required
              readOnly
            />
          </div>
          <div className="col-md-4 otp ">
            <label
              style={{ fontSize: "18px", color: "gray" }}
              className="form-label"
            >
              Tax to be Paid($)
            </label>
            <br />
           
            <input
              type="text"
              className="form-control"
              value={taxToBePaid}
              style={{ fontSize: "18px", color: "red", textAlign: "center" }}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Calculator;
