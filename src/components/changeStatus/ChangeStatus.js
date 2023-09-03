import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDeposits,
  upgradeDepositStatus,
} from "../../redux/features/deposit/depositSlice";
import { BsCheck2Square } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import { getStatus, sendDepositReminderUser } from "../../redux/features/deposit/depositStatusSlice";
import "./changeStatus.scss";

const ChangeStatus = ({_id, depositStatus}) => {
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  //Change user status
  const changeDepositStatus = async (e) => {
    e.preventDefault();

    if (!status) {
      toast.error("Please select a status");
    }

    const depositData = {
      status: status,
      id: _id,
    };

    await dispatch(upgradeDepositStatus(depositData));
    await dispatch(getAllDeposits());
    await dispatch(getStatus());
  };

  const sendDepositReminder = async () => {
    // alert("SS")
    await dispatch(sendDepositReminderUser({deposit_id: _id}))
  }

  return (
    <div className="sort deposit-status-container">
      <form
        className="--flex-start"
        onSubmit={(e) => changeDepositStatus(e, user._id, status)}
      >
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">-- select --</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
        <button className="--btn --btn-secondary" title="Change Status">
          <BsCheck2Square
            size={15}
            onClick={(e) => {
              changeDepositStatus(e);
            }}
          />
        </button>
      </form>
      {depositStatus === "unpaid" && (
        <button className="--btn --btn-secondary" title="Send reminder email"  onClick={sendDepositReminder}>
          <FaEnvelope size={13} />
        </button>
      )}
    </div>
  );
};

export default ChangeStatus;
