import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../components/loader/Loader";
import Search from "../../components/search/Search";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import "./LoanHistory.scss";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FILTER_USERS,
  selectUsers,
} from "../../redux/features/auth/filterSlice";
import { confirmAlert } from "react-confirm-alert";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  deleteLoan,
  getAllLoans,
} from "../../redux/features/loan/loanSlice";
import StatusSelectComponent from "../../components/statusSelectComponent/StatusSelectComponent";
import DisplayLoanAdmin from "../loan/DisplayLoanAdmin";

const LoanHistory = (props) => {
  useRedirectLoggedOutUser("/login/?path=applications");

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);

  const { users, isLoading } = useSelector((state) => state.auth);
  const filteredUsers = useSelector(selectUsers);
  const { loans } = useSelector((state) => state.loan);


  useEffect(() => {
    dispatch(getAllLoans());
  }, [dispatch]);

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users, search]);


  const removeLoan = async (id) => {
    await dispatch(deleteLoan(id));
    await dispatch(getAllLoans());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This Loan",
      message: "Are you sure to do delete this loan?",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            removeLoan(id);
          },
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);

  return (
    <section>
      <div className="users">
        <Sidebar />

        <div className="user-list">
          {isLoading && <Spinner />}
          <div className="table">
            <div className="--flex-between">
              <span>
                <h3>All Loans</h3>
              </span>
              <span>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
            </div>
            {/* Table */}
            {!isLoading && loans.length === 0 ? (
              <p>No loan found...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Loan Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Change status</th>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((item, index) => {
                    const { _id, status } = item;
                    // console.log(`fetchdata>>>${JSON.stringify(item)}`);
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{item.user?.name}</td>
                        <td>{item.user?.email}</td>
                        <td>{formatCurrency(item.amount)}</td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td>{item.status}</td>
                        <td>
                          <span>
                            <StatusSelectComponent
                              _id={_id}
                              email={item.user?.email}
                              amount={item.amount}
                              name={item.user?.name}
                            />
                          </span>                         
                        </td>
                        <td>
                          <button className="--btn --btn-primary" onClick={() => setSelectedLoan(item)}>View</button>
                          {process.env.REACT_APP_ENVIRONMENT == "development" && 
                          <span>
                            <FaTrashAlt
                              size={20}
                              color="red"
                              onClick={() => confirmDelete(item._id)}
                            />
                          </span>
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <hr />
          </div>
        </div>
      </div>
      <DisplayLoanAdmin selectedLoan={selectedLoan} setSelectedLoan={setSelectedLoan}/>
    </section>
  );
};

export default LoanHistory;
