import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import InfoBox from "../infoBox/InfoBox";
import "./depositStats.scss";
import { getStatus } from "../../redux/features/deposit/depositStatusSlice";

//Icons
const icon = <FaUsers size={40} color="#fff" />;
const DepositStats = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.depositStatus);


  useEffect(() => {
    dispatch(getStatus());
  }, [dispatch]);

  return (
    <div className="user-summary">
      <h3 className="--mt">Depost Stats for {new Date().toLocaleString(
      "default",
      { month: "long", year: "numeric" }
    )}</h3>
      <div className="info-summary">
        <InfoBox
          icon={icon}
          title={"Paid"}
          count={status.paidDepositsCurrentMonth}
          bgColor="paid"
        />
        <InfoBox
          icon={icon}
          title={"Unpaid"}
          count={status.pendingDepositsCurrentMonth}
          bgColor="unpaid"
        />
        <InfoBox
          icon={icon}
          title={"Previous Unpaid"}
          count={status.pendingDepositsPreviousMonths}
          bgColor="unpaid-old"
        />
      </div>
    </div>
  );
};

export default DepositStats;
