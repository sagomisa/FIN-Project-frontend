import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  changeLoanStatus,
  getAllLoans,
} from "../../redux/features/loan/loanSlice";

const StatusSelectComponent = ({ _id, email, amount, name }) => {
  console.log(`email>>>>>${email}`);
  const [loanStatus, setLoanStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  const dispatch = useDispatch();

  //Change user role
  const changeStatus = async (e) => {
    e.preventDefault();
    console.log(`clickkkkkkkkk`);
    if (!loanStatus) {
      toast.error("Please select a status");
    }

    const loanData = {
      status: loanStatus,
      id: _id,
      amount: amount,
      remarks: remarks,
      name: name,
      email: email,
    };

    console.log(`loandata>>>${JSON.stringify(loanData)}`);
    await dispatch(changeLoanStatus(loanData));
    await dispatch(getAllLoans());
  };
  return (
    <div className="sort">
      <form
        className="--flex-start"
        onSubmit={(e) => changeStatus(e, _id, loanStatus)}
      >
        <select
          value={loanStatus}
          onChange={(e) => setLoanStatus(e.target.value)}
        >
          <option value="">-- select --</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button className="--btn --btn-primary">
          <FaCheck size={10} />
        </button>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          style={{ display: loanStatus === "Rejected" ? "block" : "none" }}
        ></textarea>
      </form>
    </div>
  );
};

export default StatusSelectComponent;
