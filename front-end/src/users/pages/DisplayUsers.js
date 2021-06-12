import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../shared/components/theme/Footer";
import Header from "../../shared/components/theme/Header";
import Navbar from "../../shared/components/theme/Navbar";
import Sidebar from "../../shared/components/theme/Sidebar";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const DisplayUsers = () => {
  const [loadedUser, setLoadedUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/user"
        );

        setLoadedUser(responseData.users);
      } catch (error) {}
    };
    getUsers();
  }, [sendRequest]);

  // const [showConfirmModal, setShowConfirmModal] = useState(false);

  // const showDeletWarningHandler = () => {
  //   setShowConfirmModal(true);
  // };

  // const cancelDeletWarningHandler = () => {
  //   setShowConfirmModal(false);
  // };

  return (
    <React.Fragment>
      {/* <Modal
        show={showConfirmModal}
        onCancel={cancelDeletWarningHandler}
        header="Are you sure?"
        footer={
          <React.Fragment>
            <button className="btn" onClick={cancelDeletWarningHandler}>
              CANCEL
            </button>
            <button className="btn btn-danger" onClick={confirmDeletHandler}>
              DELETE
            </button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to procees and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal> */}
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <Navbar />

      <Sidebar />
      <div className="content-wrapper">
        <Header heading="Users" />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  {/* /.card-header */}
                  <div className="card-body">
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Password</th>
                        </tr>
                      </thead>
                      {!isLoading && loadedUser && (
                        <tbody>
                          {loadedUser.map((user) => (
                            <tr key={`tr-${user.id}`}>
                              <td key={`id-${user.id}`}>{user.id}</td>
                              <td key={`name-${user.id}`}>{user.name}</td>
                              <td key={`custname-${user.id}`}>{user.email}</td>
                              <td key={`date-${user.id}`}>{user.password}</td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </table>
                  </div>
                  <Link to="/user/new" className="btn btn-success">
                    Add
                  </Link>
                  {/* /.card-body */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default DisplayUsers;
