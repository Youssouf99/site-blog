import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage";
import Header from "./Header";
import Login from "../User/Login";
import Signup from "../User/Signup";
import UserList from "../User/UserList";
import UserCreate from "../User/UserCreate";
import UserUpdate from "../User/UserUpdate";
import UserDelete from "../User/UserDelete";
import UserDetail from "../User/UserDetail";
import Logout from "../User/Logout";
import ArticleList from "../Articles/ArticleList";
import ArticleDetail from "../Articles/ArticleDetail";
import ArticleUpdate from "../Articles/ArticleUpdate";
import ArticleDelete from "../Articles/ArticleDelete";
import TokenChecker from "./TokenChecker";
//import Footer from "./Footer";

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <TokenChecker setIsAuthenticated={setIsAuthenticated} />

      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      >
        <main>
          <Routes>
            <Route
              path="/"
              element={<ArticleList isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/signup"
              element={<Signup setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/blog"
              element={<ArticleList isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/blog/:id"
              element={<ArticleDetail isAuthenticated={isAuthenticated} />}
            />
            <Route path="/blog/:id/edit" element={<ArticleUpdate />} />
            <Route
              path="/blog/:id/delete?firstName=:firstName?lastName=:lastName"
              element={<ArticleDelete />}
            />
            <Route path="/blog/:id/delete" element={<ArticleDelete />} />

            <Route
              path="/blog/new"
              element={<ArticleList isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/blog/:id/comments"
              element={<ArticleList isAuthenticated={isAuthenticated} />}
            />

            <Route path="/logout" element={<Logout />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/create" element={<UserCreate />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/users/:id/edit" element={<UserUpdate />} />
            <Route path="/users/:id/delete" element={<UserDelete />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Header>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default AppRouter;
