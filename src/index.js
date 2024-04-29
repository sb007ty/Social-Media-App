import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Post from "./components/Post";
import PostList from "./components/PostList";
import PostDetails from "./components/PostDetails";
import { Auth0Provider } from "@auth0/auth0-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "posts",
        element: <PostList />,
      },
      {
        path: "posts/:id",
        element: <PostDetails />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-z8jqlszzmh4dtru0.us.auth0.com"
      clientId="hobaiBMOFDJl25Z6Gzoza8YqeSixf1pp"
      authorizationParams={{
        redirect_uri: window.location.origin + "/posts",
      }}
    >
      <Provider store={store}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
