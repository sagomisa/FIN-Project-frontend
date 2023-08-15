import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDeposits,
  upgradeDepositStatus,
} from "../../redux/features/deposit/depositSlice";
import { BsCheck2Square } from "react-icons/bs";
import { toast } from "react-toastify";

const ChangeStatus = ({_id}) => {
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
  };
  return (
    <div className="sort">
      <form
        className="--flex-start"
        onSubmit={(e) => changeDepositStatus(e, user._id, status)}
      >
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">-- select --</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
        <button className="--btn --btn-secondary">
          <BsCheck2Square
            size={10}
            onClick={(e) => {
              changeDepositStatus(e);
            }}
          />
        </button>
      </form>
    </div>
  );
};

export default ChangeStatus;
