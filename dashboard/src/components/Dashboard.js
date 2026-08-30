import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3002/auth/check", {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Not authenticated");
                }

                return res.json();
            })
           .then((data) => {
                setAuthenticated(data.authenticated);
                setUser(data.user);
                setCheckingAuth(false);
            })
            .catch(() => {
                setAuthenticated(false);
                setCheckingAuth(false);
            });
    }, []);

    if (checkingAuth) {
        return <h2>Checking authentication...</h2>;
    }

    if (!authenticated) {
       window.location.href = "http://localhost:3000/login";
        return null;
    }

  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary user={user} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          {/* <Route path="/apps" element={<Apps />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
