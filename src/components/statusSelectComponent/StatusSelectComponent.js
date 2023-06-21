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
    if (!loanStatus) {
      toast.error("Please select a status");
    }else{
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
    }
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
          <option value="approved">approved</option>
          <option value="pending">pending</option>
          <option value="rejected">rejected</option>
          <option value="cancelled">cancelled</option>
          <option value="disbursed">disbursed</option>
        </select>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Please enter the rejection reason"
          style={{
            display: loanStatus === "rejected" ? "block" : "none",
            marginRight: "2%",
            padding: "2%",
          }}
        ></textarea>
        <button className="--btn --btn-primary">
          <FaCheck size={10} />
        </button>
      </form>
    </div>
  );
};

export default StatusSelectComponent;
