import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import "./Loan.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createLoan,
  resetLoanState,
} from "../../redux/features/loan/loanSlice";
import loanService from "../../redux/features/loan/loanService";
import constantService from "../../redux/features/constant/constantService";
import { toast } from "react-toastify";

const Loan = () => {
  useRedirectLoggedOutUser("/login/?path=loan");

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isSuccess, isError, message } = useSelector(
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

  // Handle edit total disbursement amount
  const handleEditTotalDisbursementAmount = async () => {
    const newTotalDisbursementAmount = prompt(
      "Enter new total disbursement amount"
    );

    if (newTotalDisbursementAmount) {
      const loans = await loanService.getAllLoans();

      // Add all loan amount
      let totalLoanAmount = 0;
      loans.forEach((loan) => {
        totalLoanAmount += loan.amount;
      });

      console.log(`totalLoanAmount>>>>>>>>${totalLoanAmount}`);

      // Wait for the total amount of loans to be fetched from backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if total loan amount is greater than total disbursement amount
      if (totalLoanAmount > newTotalDisbursementAmount) {
        alert(
          `Total loan amount is greater than new total disbursement amount. Please try again.`
        );
        return;
      }
      console.log(
        `newTotalDisbursementAmount>>>>${newTotalDisbursementAmount}`
      );
      // Update total disbursement amount
      const response = await constantService.updateConstantValue(
        "totalDisbursementAmount",
        newTotalDisbursementAmount
      );

      // Wait for the total disbursement amount to be updated
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if total disbursement amount is updated
      if (response) {
        console.log("Total disbursement amount is updated.");
      }

      // Get constant by key and set total disbursement amount
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
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (loanAmount === 0 || !loanAmount) {
  //     setLoanAmountError("Loan Amount is required.");
  //     return;
  //   }

  //   if (loanAmount < 5000) {
  //     setLoanAmountError(
  //       `Loan Amount should be minimum ${formatCurrency(5000)}`
  //     );
  //     return;
  //   }

  //   if (loanAmountError) {
  //     return;
  //   }

  //   if (isLoanAmountLessThanTotalDisbursementAmount(loanAmount)) {
  //     setLoanAmountError(
  //       `Loan Amount should be less than ${formatCurrency(
  //         totalDisbursementAmount
  //       )}`
  //     );
  //     return;
  //   }

  //   // Get all loans from backend
  //   loanService
  //     .getAllLoans()
  //     .then((response) => {
  //       response.forEach((loan) => {
  //         setTotalLoanFromBackend((prev) => prev + loan.amount);
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   // Check if total loan amount is greater than total disbursement amount
  //   if (totalLoanFromBackend + loanAmount > totalDisbursementAmount) {
  //     setLoanAmountError(
  //       `Loan Amount should be less than ${formatCurrency(
  //         totalDisbursementAmount - totalLoanFromBackend
  //       )}`
  //     );
  //     return;
  //   }
  //   console.log(`totalDisbursementAmount2>>>>>>>${totalDisbursementAmount}`);
  //   console.log(`loanAmount2>>>>>>>${loanAmount}`);

  //   // Update total disbursement amount
  //   constantService
  //     .updateConstantValue(
  //       "totalDisbursementAmount",
  //       parseInt(totalDisbursementAmount - loanAmount)
  //     )
  //     .then((response) => {
  //       console.log("Response: ", response);
  //       // Create loan
  //       dispatch(
  //         createLoan({
  //           id: user._id,
  //           amount: loanAmount,
  //         })
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   // Get constant by key and set total disbursement amount
  //   constantService
  //     .getAllConstants()
  //     .then((response) => {
  //       response.forEach((constant) => {
  //         if (constant.key === "totalDisbursementAmount") {
  //           setTotalDisbursementAmount(parseInt(constant.value));
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   // Reset form
  //   setIsUserAgreementFormChecked(!isUserAgreementFormChecked);
  //   setLoanAmountError("");
  //   setLoanAmount(0);

  //   // Reset loan state
  //   dispatch(resetLoanState());
  // };

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
    loanService
      .createLoan({ id: user._id, amount: loanAmount })
      .then((response) => {
        if (response.message === "You already have a loan") {
          toast.error(response.message);
        } else {
          toast.success(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Loan Application Form</h1>
        <div className="loan-container">
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
                      onClick={handleEditTotalDisbursementAmount}
                    >
                      Edit
                    </button>
                  )}
              </div>
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
