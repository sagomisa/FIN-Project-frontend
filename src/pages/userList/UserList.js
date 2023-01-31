import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import ChangeRole from "../../components/changeRole/ChangeRole";
import Search from "../../components/search/Search";
import Sidebar from "../../components/sidebar/Sidebar";
import TabComponent from "../../components/tabs/TabComponent";
import UserStats from "../../components/userStats/UserStats";
import "./UserList.scss";

const UserList = () => {
  return (
    <section>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <UserStats />

          <div className="user-list">
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

              <table>
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Change Role</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Nisha</td>
                    <td>Nisha@gmail.com</td>
                    <td>Member</td>
                    <td>
                      <ChangeRole />
                    </td>
                    <td>ChangeRole</td>
                    <td>
                      <span>
                        <FaTrashAlt size={20} color="red" />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserList;
