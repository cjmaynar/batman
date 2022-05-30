import React, { Suspense, useEffect, useState} from "react";
import { Container } from "reactstrap";
import axios from "./axiosInstance";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserContext from "./context";
import ErrorBoundary from "./ErrorBoundary";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./Header";

const Dashboard = React.lazy(() => import("./dashboard"));
const Animals = React.lazy(() => import("./animals"));
const AnimalsEdit = React.lazy(() => import("./animals/Edit.js"));
const AnimalDetail = React.lazy(() => import("./animals/Detail.js"));
const Experiments = React.lazy(() => import("./experiments"));
const ExperimentsEdit = React.lazy(() => import("./experiments/Edit.js"));
const Login = React.lazy(() => import("./account/Login"));
const NotFound = React.lazy(() => import("./NotFound"));


function App() {
    const [user, setUser] = useState({});
    useEffect(() => {
        axios.get("/account/user").then((response) => {
           setUser(response.data);
        })
            .catch((err) => {
                window.console.error(err);
            });
    }, [])


    const logout = () => {
        setUser({});
    }

    const login = (user) => {
        setUser(user);
    }

  const contextValue = {
      user,
      logout,
      login,
  };

  return (
    <Container>
        <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                    <UserContext.Provider value={contextValue}>
                        {user.authenticated ?
                            <>
                            <Header />
                            <Routes>
                                <Route path="*" element={<NotFound />} />
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/animals" element={<Animals />} />
                                <Route path="/animals/:id" element={<AnimalDetail />} />
                                <Route path="/animals/edit" element={<AnimalsEdit />} />
                                <Route path="/animals/edit/:id" element={<AnimalsEdit />} />
                                <Route path="/experiments" element={<Experiments />} />
                                <Route path="/experiments/edit" element={<ExperimentsEdit />} />
                                <Route path="/experiments/edit/:id" element={<ExperimentsEdit />} />
                            </Routes>
                            </>
                        :
                            <Routes>
                                <Route path="*" element={<NotFound />} />
                                <Route path="/" element={<Login />} />
                            </Routes>
                        }
                    </UserContext.Provider>
            </Router>
        </Suspense>
    </ErrorBoundary>
    </Container>
  );
}

export default App;
