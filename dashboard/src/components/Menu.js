import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/auth/check", {
        credentials: "include"
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.authenticated) {
                setUser(data.user);
            }
        })
        .catch((err) => {
            console.error("Failed to fetch user:", err);
        });
}, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

 const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
};

const handleLogout = async () => {
    try {
        await fetch("/logout", {
            method: "POST",
            credentials: "include",
        });

        window.location.href = "/";;
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="dashlogo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          {/* <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li> */}
        </ul>
        <hr />
     <div className="profile-wrapper">

          <div className="profile" onClick={handleProfileClick}>
                <div className="avatar">
                    {user?.name
                        ? user.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()
                        : "U"}
                </div>

                <p className="username">
                    {user?.name || "User"}
                </p>
          </div>

            {isProfileDropdownOpen && (
                <div className="profile-dropdown">

                    <div className="profile-dropdown-header">
                        <strong>{user?.name || "User"}</strong>
                        <span>{user?.email || ""}</span>
                    </div>

                    <hr />

                    <Link to="/profile">My Profile</Link>
                    <Link to="/account">My Account</Link>
                    <Link to="/funds">Funds</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/holdings">Holdings</Link>
                    <Link to="/positions">Positions</Link>
                    <Link to="/apps">Apps</Link>
                    <Link to="/reports">Reports</Link>
                    <Link to="/notifications">Notifications</Link>
                    <Link to="/settings">Settings</Link>
                    <Link to="/support">Help & Support</Link>
                    <Link to="/shortcuts">Keyboard Shortcuts</Link>
                    <hr />
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default Menu;
