import React, { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { cancelLoan } from "../../redux/features/loan/loanSlice";
import { useDispatch } from "react-redux";

const DisplayLoanUser = ({ selectedLoan })=>{
  const dispatch = useDispatch();


  const confirmCancel = (id) => {
    confirmAlert({
      title: "Cancel This Loan",
      message: "Are you sure to do Cancel this loan?",
      buttons: [
        {
          label: "Cancel",
          onClick: () => {
            dispatch(cancelLoan(id));          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };


  return (
    <div id="display-loan-admin-container">
      <h2>Loan {new Date(selectedLoan?.createdAt).toLocaleDateString()}</h2>
      <table className="loan-display-table">
        <tbody>
          <tr>
            <td>User Name</td>
            <td>{selectedLoan?.user.name}</td>
          </tr>
          <tr>
            <td>Loan Status</td>
            <td>{selectedLoan?.status}</td>
          </tr>
          {selectedLoan.status === "rejected" && (
            <tr>
              <td>Remarks</td>
              <td>{selectedLoan?.remarks}</td>
            </tr>
          )}
          <tr>
            <td>Email</td>
            <td>{selectedLoan?.user.email}</td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>{selectedLoan?.amount}</td>
          </tr>
          <tr>
            <td>Applied Date</td>
            <td>{new Date(selectedLoan?.createdAt).toLocaleString()}</td>
          </tr>
          <tr>
            <td>Approved Date</td>
            <td>
              {selectedLoan?.approved_date &&
                new Date(selectedLoan?.approved_date).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td>Disbursed Date</td>
            <td>
              {selectedLoan?.disbursed_date &&
                new Date(selectedLoan?.disbursed_date).toLocaleString()}
            </td>
          </tr>
          {["pending", "approved"].includes(selectedLoan.status) && (
            <tr>
              <td>Action</td>
              <td>
                <button
                  className="--btn --btn-primary"
                  onClick={() => confirmCancel(selectedLoan._id)}
                >
                  Cancel Loan
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default DisplayLoanUser;
