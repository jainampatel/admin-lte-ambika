import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../shared/components/theme/Footer";
import Header from "../../shared/components/theme/Header";
import Navbar from "../../shared/components/theme/Navbar";
import Sidebar from "../../shared/components/theme/Sidebar";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const DisplayWorks = () => {
  const [loadedWork, setLoadedWork] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const getWorks = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/work"
        );

        setLoadedWork(responseData.works);
      } catch (error) {}
    };
    getWorks();
  }, [sendRequest]);

  // const [showConfirmModal, setShowConfirmModal] = useState(false);

  // const showDeletWarningHandler = () => {
  //   setShowConfirmModal(true);
  // };

  // const cancelDeletWarningHandler = () => {
  //   setShowConfirmModal(false);
  // };

  // const confirmDeletHandler = () => {
  //   // setShowConfirmModal(false);
  //   console.log("deleting..");
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
        <Header heading="Works" />
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
                          <th>Invoice No.</th>
                          <th>Customer Name</th>
                          <th>Date</th>
                          <th>VEHICLE NO.</th>
                          <th>Amount</th>
                          <th>Payment Type</th>
                          <th>Branch</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {!isLoading && loadedWork && (
                        <tbody>
                          {/* {loadedWork.map((numList, i) => (
                            <tr key={i}>
                              {Object.values(numList).map((num, j) => (
                                <td key={`data-${j}`}>{(workId[j] = num)}</td>
                              ))}
                              <td key={`btn-${i}`}>
                                <Link to={`/work/${workId[0]}`}>
                                  <button
                                    className="btn btn-info"
                                    style={{ marginRight: "5px" }}
                                  >
                                    EDIT
                                  </button>
                                </Link>
                                <button
                                  className="btn btn-danger"
                                  onClick={confirmDeletHandler}
                                >
                                  DELETE
                                </button>
                              </td>
                            </tr>
                          ))} */}
                          {loadedWork.map((work) => {
                            return (
                              <tr key={`tr-${work.id}`}>
                                <td key={`id-${work.id}`}>{work.id}</td>
                                <td key={`invoiceno-${work.id}`}>
                                  {work.invoiceno}
                                </td>
                                <td key={`custname-${work.id}`}>
                                  {work.customerName}
                                </td>
                                <td key={`date-${work.id}`}>{work.date}</td>
                                <td key={`carno-${work.id}`}>{work.carNo}</td>
                                <td key={`amount-${work.id}`}>{work.amount}</td>
                                <td key={`paytype-${work.id}`}>
                                  {work.paymentType}
                                </td>
                                <td key={`branch-${work.id}`}>{work.branch}</td>
                                <td key={`btn-${work.id}`}>
                                  <Link to={`/work/update/${work.id}`}>
                                    <button
                                      className="btn btn-info"
                                      style={{ marginRight: "5px" }}
                                    >
                                      EDIT
                                    </button>
                                  </Link>
                                  <Link to={`/work/delete/${work.id}`}>
                                    <button className="btn btn-danger">
                                      DELETE
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      )}
                    </table>
                  </div>

                  <Link to="/work/new" className="btn btn-success">
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

export default DisplayWorks;
