import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./shared/components/theme/Footer";
import Navbar from "./shared/components/theme/Navbar";
import Sidebar from "./shared/components/theme/Sidebar";
import ErrorModal from "./shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "./shared/hooks/http-hook";

const Dashboard = () => {
  const [loadedWorkCount, setLoadedWorkCount] = useState();
  const [loadedUserCount, setLoadedUserCount] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const getUsersCount = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/count/users"
        );

        setLoadedUserCount(responseData.usersCount);
      } catch (error) {}
    };

    const getWorksCount = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/count/works"
        );

        setLoadedWorkCount(responseData.worksCount);
      } catch (error) {}
    };

    getUsersCount();
    getWorksCount();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              {/* /.col */}

              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        {!isLoading && loadedUserCount && loadedWorkCount && (
          <section className="content">
            <div className="container-fluid">
              {/* Small boxes (Stat box) */}
              <div className="row">
                <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{loadedWorkCount}</h3>
                      <p>Total Works</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag" />
                    </div>
                    <Link to="/work" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{loadedUserCount}</h3>
                      <p>Total Users</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                    <Link to="/user" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
                {/* ./col */}

                {/* ./col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
        )}
        {/* /.content */}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Dashboard;
