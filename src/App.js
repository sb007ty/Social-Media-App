import logo from "./logo.svg";
import "./App.css";
import PostList from "./components/PostList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectUser } from "./redux/features/usersSlice";
import Test from "./components/Test";
import Header from "./components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./components/LoginPage";

import LogoutPage from "./components/LogoutPage";

function App() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log(user, " currentUser");
  const navigate = useNavigate();
  return (
    <div className="App">
      {!isAuthenticated && <LoginPage />}
      {isAuthenticated && (
        <>
          <Header />
          <Outlet />
        </>
      )}

      {/* <Test /> */}
    </div>
  );
}

export default App;
