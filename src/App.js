import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import LoginWithCode from "./pages/auth/LoginWithCode";
import Profile from "./pages/profile/Profile";
import Verify from "./pages/auth/Verify";
import ChangePassword from "./pages/changePassword/ChangePassword";
import Layout from "./components/layout/Layout";
import UserList from "./pages/userList/UserList";
import OurInvestment from "./pages/ourInvestment/OurInvestment";
import Dashboard from "./pages/dashboard/Dashboard";
import Loan from "./pages/loan/Loan";
import Gallery from "./pages/gallery/Gallery";
import Teams from "./pages/teams/Teams";
import Events from "./pages/events/Events";
import Deposit from "./pages/deposit/Deposit";
import Blogs from "./pages/blogs/Blogs";
import TermsOfUse from "./pages/termsOfUse/TermsOfUse";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import LoanHistory from "./pages/loanHistory/LoanHistory";
import NotFound from "./components/notFound/NotFound";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import UsefulLinks from "./pages/usefulLinks/UsefulLinks";
import { VerifiedOnlyLink } from "./components/protect/hiddenLink";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/our-investments"
            element={
              <Layout>
                <VerifiedOnlyLink>
                  <OurInvestment />
                </VerifiedOnlyLink>
              </Layout>
            }
          />
          <Route
            path="/about#about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />

          <Route
            path="/blogs"
            element={
              <Layout>
                <Blogs />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/termsOfUse"
            element={
              <Layout>
                <TermsOfUse />
              </Layout>
            }
          />
          <Route
            path="/privacyPolicy"
            element={
              <Layout>
                <PrivacyPolicy />
              </Layout>
            }
          />
          <Route
            path="/usefulLinks"
            element={
              <Layout>
                <UsefulLinks />
              </Layout>
            }
          />
          <Route
            path="/login/:path?"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/forgot"
            element={
              <Layout>
                <Forgot />
              </Layout>
            }
          />
          <Route
            path="/resetPassword/:resetToken"
            element={
              <Layout>
                <Reset />
              </Layout>
            }
          />

          <Route
            path="/profile"
            element={
              <Layout>
                <VerifiedOnlyLink>
                  <Profile />
                </VerifiedOnlyLink>
              </Layout>
            }
          />
          <Route
            path="/changePassword"
            element={
              <Layout>
                <VerifiedOnlyLink>
                  <ChangePassword />
                </VerifiedOnlyLink>
              </Layout>
            }
          />
          <Route
            path="/verify/:verificationToken"
            element={
              <Layout>
                <Verify />
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <VerifiedOnlyLink>
                  <UserList />
                </VerifiedOnlyLink>
              </Layout>
            }
          />
          <Route
            path="/dashboard/:path?"
            element={
              <Layout>
                <VerifiedOnlyLink>
                  <Dashboard />
                </VerifiedOnlyLink>
              </Layout>
            }
          />
          <Route
            path="/loan"
            element={
              <Layout>
                <VerifiedOnlyLink>
                  <Loan />
                </VerifiedOnlyLink>
              </Layout>
            }
          />
          <Route
            path="/applications"
            element={
              <Layout>
                <VerifiedOnlyLink>
                  <LoanHistory />
                </VerifiedOnlyLink>
              </Layout>
            }
          />
          <Route
            path="/deposit"
            element={
              <Layout>
                <VerifiedOnlyLink>
                  <Deposit />
                </VerifiedOnlyLink>
              </Layout>
            }
          />
          <Route
            path="/gallery"
            element={
              <Layout>
                <VerifiedOnlyLink>
                  <Gallery />
                </VerifiedOnlyLink>
              </Layout>
            }
          />
          <Route
            path="/teams"
            element={
              <Layout>
                <VerifiedOnlyLink>
                  <Teams />
                </VerifiedOnlyLink>
              </Layout>
            }
          />
          <Route
            path="/events"
            element={
              <Layout>
                <VerifiedOnlyLink>
                  <Events />
                </VerifiedOnlyLink>
              </Layout>
            }
          />
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
