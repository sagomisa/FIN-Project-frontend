import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const ChangeRole = () => {
  const [userRole, setUserRole] = useState("");
  return (
    <div className="sort">
      <form className="--flex-start">
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value="">-- select --</option>
          <option value="members">Members</option>
          <option value="loan-officer">Loan Officer</option>
          <option value="admin">Admin</option>
        </select>
        <button className="--btn --btn-primary">
          <FaCheck size={10} />
        </button>
      </form>
    </div>
  );
};

export default ChangeRole;
