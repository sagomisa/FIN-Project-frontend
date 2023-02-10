import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_ADMIN,
  CALC_LOANADMIN,
  CALC_MEMBERS,
  CALC_VERIFIED_USER,
} from "../../redux/features/auth/authSlice";
import InfoBox from "../infoBox/InfoBox";
import "./UserStats.scss";

//Icons
const icon = <FaUsers size={40} color="#fff" />;
const UserStats = () => {
  const dispatch = useDispatch();
  const { users, verifiedUsers, membersCount, loanAdminCount, adminCount } =
    useSelector((state) => state.auth);

  const unverifiedUsers = users.length - verifiedUsers;

  useEffect(() => {
    dispatch(CALC_VERIFIED_USER());
    dispatch(CALC_MEMBERS());
    dispatch(CALC_LOANADMIN());
    dispatch(CALC_ADMIN());
  }, [dispatch, users]);

  return (
    <div className="user-summary">
      <h3 className="--mt">User Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={icon}
          title={"Total Users"}
          count={users.length}
          bgColor="card1"
        />
        <InfoBox
          icon={icon}
          title={"Members"}
          count={membersCount}
          bgColor="card2"
        />
        <InfoBox
          icon={icon}
          title={"Loan Admin"}
          count={loanAdminCount}
          bgColor="card3"
        />
        <InfoBox
          icon={icon}
          title={"Admin"}
          count={adminCount}
          bgColor="card4"
        />
        <InfoBox
          icon={icon}
          title={"Verified Users"}
          count={verifiedUsers}
          bgColor="card1"
        />
        <InfoBox
          icon={icon}
          title={"Unverified Users"}
          count={unverifiedUsers}
          bgColor="card2"
        />
      </div>
    </div>
  );
};

export default UserStats;
