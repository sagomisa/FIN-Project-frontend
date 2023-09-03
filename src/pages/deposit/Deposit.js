import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Deposit.scss";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import Search from "../../components/search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_USERS,
} from "../../redux/features/auth/filterSlice";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { shortenText } from "../profile/Profile";
import "react-datepicker/dist/react-datepicker.css";
import ChangeStatus from "../../components/changeStatus/ChangeStatus";
import { getAllDeposits } from "../../redux/features/deposit/depositSlice";
import { FaEnvelope } from "react-icons/fa";
import DepositStats from "../../components/DepositStats/depositStats";
import { sendDepositReminderAllUser } from "../../redux/features/deposit/depositStatusSlice";

const Deposit = () => {
  useRedirectLoggedOutUser("/login/?path=deposit");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { users, isLoading } = useSelector(
    (state) => state.auth
  );

  const { deposits } = useSelector((state) => state.deposit);

  useEffect(() => {
    dispatch(getAllDeposits())
  }, [dispatch]);

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users, search]);


  // Begin Pagination
  const itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = deposits.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(deposits.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % deposits.length;
    setItemOffset(newOffset);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('default', { month: 'long', year: 'numeric' });;
  };

  const sendDepositReminder = async () => {
    await dispatch(sendDepositReminderAllUser())
  }

  //End Pagination
  return (
    <div className="deposit">
      {/* <Sidebar /> */}
      <Sidebar />

      <div className="deposit-list">
        <DepositStats />
        <div className="table">
          <div className="--flex-between">
            <span>
              <h3>All Deposits</h3>
            </span>
            <span>
              <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </span>
          </div>
          {/* Table */}
          {!isLoading && deposits.length === 0 ? (
            <p>No deposit found...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Deposit For</th>
                  <th>Amount</th>
                  <th>Deposited Date</th>
                  <th>Status</th>
                  <th>
                    Action( &nbsp;
                    {
                      <button
                        className="--btn --btn-secondary inline-form btn-remind-all"
                        title="Remind all current month unpaid user"
                        onClick={sendDepositReminder}
                      >
                        <FaEnvelope size={10} /> Remind All
                      </button>
                    }
                    )
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(
                  (
                    { _id, user, amount, status, deposit_for, deposited_date },
                    index
                  ) => {
                    const { name, email } = user;

                    return (
                      <tr key={index}>
                        <td>{itemOffset + index + 1}</td>
                        <td>{shortenText(name, 8)}</td>
                        <td>{email}</td>
                        <td>{deposit_for && formatDate(deposit_for)}</td>
                        <td>{amount}</td>
                        <td>
                          {deposited_date &&
                            new Date(deposited_date).toLocaleDateString()}
                        </td>
                        <td>{status}</td>
                        <td>
                          <ChangeStatus _id={_id} depositStatus={status} />
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          )}
          <hr />
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default Deposit;
