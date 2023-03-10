import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import "./Loan.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createLoan,
  resetLoanState,
} from "../../redux/features/loan/loanSlice";

const Loan = () => {
  useRedirectLoggedOutUser("/login/?path=loan");

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.loan
  );
  const dispatch = useDispatch();

  const [totalDisbursementAmount, setTotalDisbursementAmount] = useState(50000);
  const [loanAmount, setLoanAmount] = useState(0);
  const [isUserAgreementFormChecked, setIsUserAgreementFormChecked] =
    useState(false);
  const [loanAmountError, setLoanAmountError] = useState("");

  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // Loan Amount should be minimum 5000 and maximum 10000
  const loanAmountValidationMessage = (amount) => {
    if (amount < 5000) {
      return `Loan Amount should be minimum ${formatCurrency(5000)}`;
    } else if (amount > 10000) {
      return `Loan Amount should be maximum ${formatCurrency(10000)}`;
    }
    return "";
  };

  // Loan amount should be less than total disbursement amount
  const isLoanAmountLessThanTotalDisbursementAmount = (amount) => {
    return amount > totalDisbursementAmount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoanAmountLessThanTotalDisbursementAmount(loanAmount)) {
      setLoanAmountError(
        `Loan Amount should be less than ${formatCurrency(
          totalDisbursementAmount
        )}`
      );
      return;
    }

    dispatch(
      createLoan({
        id: user._id,
        amount: loanAmount,
      })
    );

    // Reset form
    setIsUserAgreementFormChecked(false);
    setLoanAmountError("");
    setLoanAmount(0);

    // Reset loan state
    dispatch(resetLoanState());
  };

  useEffect(() => {
    setLoanAmountError(loanAmountValidationMessage(loanAmount));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Loan Application Form</h1>
        <div className="loan-container">
          <div className="loan-total">
            <label className="loan-label">
              <h3 className="loan-label-title">Total Disbursement Amount</h3>
              <input
                className="loan-input"
                type="text" 
                disabled
                value={formatCurrency(totalDisbursementAmount)}
              />
            </label>
          </div>

          <div className="user-agreement-form">
            <h3 className="user-agreement-form-title">User Agreement Form</h3>
            <div className="user-agreement-form-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tincidunt, nisl eget aliquam tincidunt, nisl nisl aliquam
                tortor, eget aliquam nisl nisl eget nisl. Sed tincidunt, nisl
                eget aliquam tincidunt, nisl nisl aliquam tortor, eget aliquam
                nisl nisl eget nisl. Sed tincidunt, nisl eget aliquam tincidunt,
              </p>
            </div>
            <div className="user-agreement-form-checkbox">
              <label>
                <input
                  type="checkbox"
                  value={isUserAgreementFormChecked}
                  onChange={(e) =>
                    setIsUserAgreementFormChecked(!isUserAgreementFormChecked)
                  }
                />
                <span>I agree to the terms and conditions</span>
              </label>
            </div>
          </div>

          {isUserAgreementFormChecked ? (
            <form className="loan-form" onSubmit={handleSubmit}>
              <label className="loan-label">
                <h3 className="loan-label-title">Loan Amount</h3>
                <input
                  className="loan-input"
                  type="text"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  required
                />
              </label>
              {loanAmountError && (
                <p className="loan-error-message">{loanAmountError}</p>
              )}
              <button className="loan-submit-button" type="submit">
                Submit
              </button>
            </form>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loan;
