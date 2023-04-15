// import React from "react";
// import { useSelector } from "react-redux";
// import Sidebar from "../../components/sidebar/Sidebar";
// import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

// const Teams = () => {
//   useRedirectLoggedOutUser("/login/?path=teams");

//   const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
//     (state) => state.auth
//   );

//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="dashboard-content">
//         <h1>Welcome to Teams Page!</h1>

//       </div>
//     </div>
//   );
// };

// export default Teams;

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
import "./Teams.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FILTER_USERS,
  selectUsers,
} from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Teams = () => {
  useRedirectLoggedOutUser("/login/?path=teams");
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
  const itemsPerPage = 3;
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
      <div className="teamsContainer">
        <Sidebar />

        <div className="team-list">
          {isLoading && <Spinner />}
          <h1 className="--text-center">Welcome to our Team Members' Page!</h1>
          <div className="table">
            <div className="--flex-between">
              <span>
                <h3>Team Members</h3>
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
              <div className="eachTeamContainer --flex-center --mb">
                {currentItems.map((user, index) => {
                  const { _id, name, email, role, isVerified, photo } = user;

                  return (
                    <table
                      key={_id}
                      className="--flex-center --dir-column --mb"
                    >
                      <tbody>
                        <tr>
                          <img
                            src={photo}
                            alt="Profile Image"
                            style={{
                              resizeMode: "cover",
                              height: 100,
                              width: 100,
                              borderRadius: "50%",
                            }}
                          />
                        </tr>
                        <tr>
                          <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                          {shortenText(name, 8)}
                        </tr>
                        <tr>
                          <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                          {email}
                        </tr>
                        <tr>
                          <span>
                            <FaTrashAlt
                              size={20}
                              color="red"
                              onClick={() => confirmDelete(_id)}
                            />
                          </span>
                        </tr>
                      </tbody>
                    </table>
                  );
                })}
              </div>
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

export default Teams;
