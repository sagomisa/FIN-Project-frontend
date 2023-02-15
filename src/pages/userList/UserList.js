import React, { useEffect, useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ChangeRole from "../../components/changeRole/ChangeRole";
import { Spinner } from "../../components/loader/Loader";
import Search from "../../components/search/Search";
import UserStats from "../../components/userStats/UserStats";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { deleteUser, getUsers } from "../../redux/features/auth/authSlice";
import { shortenText } from "../profile/Profile";
import "./UserList.scss";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FILTER_USERS,
  selectUsers,
} from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { users, isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const filteredUsers = useSelector(selectUsers);

  const goToRegister = () => {
    navigate("/register");
  };
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const removeUser = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This User",
      message: "Are you sure to do delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users, search]);

  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

  //End Pagination

  return (
    <section>
      <div className="users">
        <Sidebar />
        <div className="user-list">
          <UserStats />
          {isLoading && <Spinner />}
          <div className="table">
            <div className="--flex-between">
              <span>
                <h3>All Users</h3>
              </span>
              <span>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
              <span className="addUserBtn">
                <button
                  className="addUserButton --btn --btn-primary --btn-lg"
                  onClick={goToRegister}
                >
                  <FaPlus size={20} color="white" id="addIcon" />
                  Add User
                </button>
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
                    <th>Role</th>
                    <th>Change Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, index) => {
                    const { _id, name, email, role, isVerified } = user;
                    const verifiedStatus = (e) => {
                      if (isVerified) {
                        return "verified";
                      } else {
                        return "unverified";
                      }
                    };
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{shortenText(name, 8)}</td>
                        <td>{email}</td>
                        <td>{role}</td>
                        <td>
                          <ChangeRole _id={_id} email={email} />
                        </td>
                        <td>{verifiedStatus()}</td>
                        <td>
                          <span>
                            <FaTrashAlt
                              size={20}
                              color="red"
                              onClick={() => confirmDelete(_id)}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
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
    </section>
  );
};

export default UserList;
