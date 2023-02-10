import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChangeRole from "../../components/changeRole/ChangeRole";
import { Spinner } from "../../components/loader/Loader";
import Search from "../../components/search/Search";
import Sidebar from "../../components/sidebar/Sidebar";
import UserStats from "../../components/userStats/UserStats";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { getUsers } from "../../redux/features/auth/authSlice";
import { shortenText } from "../profile/Profile";
import "./UserList.scss";

const UserList = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { users, isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <section>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <UserStats />

          <div className="user-list">
            {isLoading && <Spinner />}
            <div className="table">
              <div className="--flex-between">
                <span>
                  <h3>All Users</h3>
                </span>
                <span>
                  <Search />
                </span>
                <span>
                  <Link to="/register">
                    <button className="button --btn-lg --btn-primary">
                      <AiOutlinePlus />
                      Add Users
                    </button>
                  </Link>
                </span>
              </div>

              {/* {Table} */}
              {!isLoading && users.length === 0 ? (
                <p>No user found...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>S.N</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Change Role</th>
                      {/* <th>Image</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => {
                      const { _id, name, email, role, photo } = user;

                      return (
                        <tr key={_id}>
                          <td>{index + 1}</td>
                          <td>{shortenText(name, 8)}</td>
                          <td>{email}</td>
                          <td>{role}</td>
                          <td>
                            <ChangeRole />
                          </td>
                          {/* <td>{photo}</td> */}

                          <td>
                            <span>
                              <FaTrashAlt size={20} color="red" />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserList;
