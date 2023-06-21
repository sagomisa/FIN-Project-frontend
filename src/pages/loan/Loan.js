import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import "./Loan.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createLoan,
  getUserLoan,
  resetLoanState,
} from "../../redux/features/loan/loanSlice";
import loanService from "../../redux/features/loan/loanService";
import constantService from "../../redux/features/constant/constantService";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { LoanAdminLink } from "../../components/protect/hiddenLink";
import DisplayLoanUser from "./DisplayLoanUser";


const Loan = () => {
  useRedirectLoggedOutUser("/login/?path=loan");

  const { user } = useSelector((state) => state.auth);
  const { userLoan } = useSelector(
    (state) => state.loan
  );
  const dispatch = useDispatch();

  const [totalDisbursementAmount, setTotalDisbursementAmount] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [isUserAgreementFormChecked, setIsUserAgreementFormChecked] =
    useState(false);
  const [loanAmountError, setLoanAmountError] = useState("");
  const [totalLoanFromBackend, setTotalLoanFromBackend] = useState(0);

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


  const handleDisbursmentUpdate = async () => {
    return confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='disbursment-container'>
            <form className="disbursment-form" onSubmit={e => {
              onClose();
              handleEditTotalDisbursementAmount(e.target[0].value)
            }}>
            <h1>Update Total Disbursment</h1>
              <label className="loan-label" />
                <h3 className="loan-label-title">Disbursment Amount</h3>
                <input
                  className="loan-input"
                  name="newDisbursement"
                  type="number"
                  pattern="[0-9]*"
                  defaultValue={totalDisbursementAmount}
                  required
                />
              <button className="loan-submit-button" type="submit">
                Submit
              </button>
            </form>

          </div>
        );
      }
    });
  }
  // Handle edit total disbursement amount
  const handleEditTotalDisbursementAmount = async (newTotalDisbursementAmount) => {
    if(!newTotalDisbursementAmount || newTotalDisbursementAmount <= 0){
      toast.error("Invalid total disbursement value!");
    }else {
      const loans = await loanService.getAllLoans();

      // Add all loan amount
      let totalLoanAmount = 0;
      loans.forEach((loan) => {
        totalLoanAmount += loan.amount;
      });


      // Update total disbursement amount
      const response = await constantService.updateConstantValue(
        "totalDisbursementAmount",
        newTotalDisbursementAmount
      );

      // Check if total disbursement amount is updated
      if (response.status==200) {
      setTotalDisbursementAmount(parseInt(newTotalDisbursementAmount));
       toast.success("Total disbursement amount is updated.");
      }
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    if (loanAmount === 0 || !loanAmount) {
      setLoanAmountError("Loan Amount is required.");
      return;
    }

    if (loanAmount < 5000) {
      setLoanAmountError(
        `Loan Amount should be minimum ${formatCurrency(5000)}`
      );
      return;
    }

    if (loanAmountError) {
      return;
    }

    if (isLoanAmountLessThanTotalDisbursementAmount(loanAmount)) {
      setLoanAmountError(
        `Loan Amount should be less than ${formatCurrency(
          totalDisbursementAmount
        )}`
      );
      return;
    }
    dispatch(createLoan({ id: user._id, amount: loanAmount }))

    // Reset form
    setIsUserAgreementFormChecked(!isUserAgreementFormChecked);
    setLoanAmountError("");
    setLoanAmount(0);

    // Reset loan state
    dispatch(resetLoanState());
  };

  useEffect(() => {
    setLoanAmountError(loanAmountValidationMessage(loanAmount));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount]);

  // Set the total disbursement amount from backend
  useEffect(() => {
    constantService
      .getAllConstants()
      .then((response) => {
        response.forEach((constant) => {
          if (constant.key === "totalDisbursementAmount") {
            setTotalDisbursementAmount(parseInt(constant.value));
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(getUserLoan());
  }, []);

  return (
    <div className="dashboard">
      
      <Sidebar />
      <div className="dashboard-content">
        {userLoan ? 
        <DisplayLoanUser selectedLoan={userLoan} />
        :
        <>
        <h1>Loan Application Form</h1>
        <div className="loan-container">
          <LoanAdminLink>

          <div className="loan-total">
            <label className="loan-label">
              <h3 className="loan-label-title">Total Disbursement Amount</h3>
              <div className="loan-label-content">
                <input
                  className="loan-input"
                  type="text"
                  disabled
                  value={formatCurrency(totalDisbursementAmount)}
                />
                {user &&
                  (user.role === "admin" || user.role === "loanAdmin") && (
                    <button
                      className="loan-edit-button"
                      onClick={handleDisbursmentUpdate}
                    >
                      Edit
                    </button>
                  )}
              </div>
            </label>
          </div>
          </LoanAdminLink>

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
                  checked={isUserAgreementFormChecked}
                  onChange={(e) =>
                    setIsUserAgreementFormChecked(!isUserAgreementFormChecked)
                  }
                />
                <span>I agree to the terms and conditions</span>
              </label>
            </div>
          </div>

          {isUserAgreementFormChecked ? (
            <form className="loan-form" onSubmit={handleSubmit2}>
              <label className="loan-label">
                <h3 className="loan-label-title">Loan Amount</h3>
                <input
                  className="loan-input"
                  type="number"
                  pattern="[0-9]*"
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
        </>
}
      </div>
    </div>
  );
};

export default Loan;
