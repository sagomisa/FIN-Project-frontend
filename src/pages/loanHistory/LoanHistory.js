import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../components/loader/Loader";
import Search from "../../components/search/Search";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { getUsers } from "../../redux/features/auth/authSlice";
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
  updateLoan,
} from "../../redux/features/loan/loanSlice";
import { BiEdit } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";

const loanFormState = {
  status: "",
};
const LoanHistory = () => {
  useRedirectLoggedOutUser("/login/?path=applications");

  const [openPopup, setOpenPopup] = useState(false);
  const [loanForm, setLoanForm] = useState(loanFormState);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { users, isLoading } = useSelector((state) => state.auth);
  const filteredUsers = useSelector(selectUsers);
  const { loans } = useSelector((state) => state.loan);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllLoans());
  }, [dispatch]);

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users, search]);

  const getAllLoansWithUser = () => {
    const allLoans = loans.map((loan) => {
      const user = users.find((user) => user._id === loan.user);
      return { ...loan, user };
    });
    return allLoans;
  };

  const allLoans = getAllLoansWithUser();

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

  const handleLoanFormChange = (e) => {
    setLoanForm({
      ...loanForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleLoanFormSubmit = (e) => {
    e.preventDefault();

    dispatch(updateLoan(loanFormState));

    // Close the popup
    setOpenPopup(false);
  };

  React.useEffect(() => {
    // Reset the form
    setLoanForm(loanFormState);
  }, [openPopup]);

  const eventFormPopup = () => {
    return (
      <div className="eventFormPopup">
        <div className="eventFormPopup__content">
          <div className="eventFormPopup__header">
            <h2>Edit Loan</h2>
            <span
              className="eventFormPopup__closeBtn"
              onClick={() => setOpenPopup(false)}
            >
              <AiOutlineCloseCircle size={20} />
            </span>
          </div>
          <div className="eventFormPopup__body">
            <form onSubmit={handleLoanFormSubmit}>
              <div className="form-group">
                <label htmlFor="title">Status</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={loanForm.status}
                  onChange={handleLoanFormChange}
                />
              </div>
              <div className="form-group">
                <button className="form-button">Done</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

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
            {!isLoading && users.length === 0 ? (
              <p>No user found...</p>
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
                    <th>Action</th>
                    {/* <th>ID</th> */}
                  </tr>
                </thead>
                <tbody>
                  {allLoans.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.user?.name}</td>
                        <td>{item.user?.email}</td>
                        <td>{formatCurrency(item.amount)}</td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td>{item.status}</td>

                        <td>
                          <span>
                            <FaTrashAlt
                              size={20}
                              color="red"
                              onClick={() => confirmDelete(item._id)}
                            />
                          </span>
                          <span>
                            <BiEdit
                              size={20}
                              color="red"
                              style={{ marginLeft: "10%" }}
                              onClick={() => setOpenPopup(true)}
                            />
                          </span>
                        </td>
                        {/* <td>{item._id}</td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <hr />
          </div>
          {openPopup && eventFormPopup()}
        </div>
      </div>
    </section>
  );
};

export default LoanHistory;
