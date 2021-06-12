import React from "react";
import ReactDOM from "react-dom";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const content = (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to="/" className="brand-link">
        <span className="brand-text font-weight-light">
          Ambika Tyre Service
        </span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}

        {/* SidebarSearch Form */}

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className="nav-item menu-open">
              <Link to="#" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Dashboard
                  <i className="right fas fa-angle-left" />
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/" className="nav-link ">
                    <i className="far fa-circle nav-icon" />
                    <p>Dashboard</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item menu-open">
              <Link to="#" className="nav-link ">
                <i className="nav-icon fas fa-edit" />
                <p>
                  Users
                  <i className="right fas fa-angle-left" />
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/user" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Display Users</p>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item menu-open">
              <Link to="#" className="nav-link ">
                <i className="nav-icon fas fa-edit" />
                <p>
                  Works
                  <i className="right fas fa-angle-left" />
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/work" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Display Works</p>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("sidebar-hook")
  );
};

export default Sidebar;
