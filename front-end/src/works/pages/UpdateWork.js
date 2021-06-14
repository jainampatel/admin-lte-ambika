import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Input from "../../shared/components/FormElements/Input";
import Footer from "../../shared/components/theme/Footer";
import Header from "../../shared/components/theme/Header";
import Navbar from "../../shared/components/theme/Navbar";
import Sidebar from "../../shared/components/theme/Sidebar";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

const UpdateWork = () => {
  const workId = useParams().workId;
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [loadedWork, setLoadedWork] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      invoiceno: {
        value: "",
        isValid: false,
      },
      customerName: {
        value: "",
        isValid: false,
      },
      date: {
        value: "",
        isValid: false,
      },
      carNo: {
        value: "",
        isValid: false,
      },
      amount: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const getWork = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/work/${workId}`
        );
        setLoadedWork(responseData.work);
        setFormData(
          {
            invoiceno: {
              value: responseData.work.invoiceno,
              isValid: true,
            },
            customerName: {
              value: responseData.work.customerName,
              isValid: true,
            },
            date: {
              value: responseData.work.date.split("T")[0],
              isValid: true,
            },
            carNo: {
              value: responseData.work.carNo,
              isValid: true,
            },
            amount: {
              value: responseData.work.amount,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    getWork();
  }, [sendRequest, workId, setFormData, auth]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/work/${workId}`,
        "PATCH",
        JSON.stringify({
          invoiceno: formState.inputs.invoiceno.value,
          customerName: formState.inputs.customerName.value,
          date: formState.inputs.date.value,
          carNo: formState.inputs.carNo.value,
          amount: formState.inputs.amount.value,
          paymentType: event.target.paymentType.value,
          branch: event.target.branch.value,
        }),
        {
          "Content-Type": "application/json",
          // eslint-disable-next-line
          Authorization: "Bearer" + " " + auth.token,
        }
      );
      history.push("/work");
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedWork && !error) {
    return (
      <React.Fragment>
        <Navbar />
        <Sidebar />
        <div className="content-wrapper">
          <Header />
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {/* left column */}
                <div className="col-md-10">
                  {/* general form elements */}
                  <div className="card card-danger">
                    <div className="card-header">
                      <h3 className="card-title">
                        Could not find the work by provided id!
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedWork && (
        <React.Fragment>
          <Navbar />
          <Sidebar />
          <div className="content-wrapper">
            <Header heading="Update User" />
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  {/* left column */}
                  <div className="col-md-10">
                    {/* general form elements */}
                    <div className="card card-primary">
                      <div className="card-header">
                        <h3 className="card-title">Update Work</h3>
                      </div>
                      {/* /.card-header */}
                      {/* form start */}
                      <form onSubmit={submitHandler}>
                        <div className="card-body">
                          <Input
                            id="invoiceno"
                            element="input"
                            type="number"
                            label="Invoice No"
                            placeholder="Enter Invoice no."
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter valid invoice no"
                            onInput={inputHandler}
                            initialValue={loadedWork.invoiceno}
                            initialValid={true}
                            divClass="form-group"
                          />
                          <Input
                            id="customerName"
                            element="input"
                            type="text"
                            label="Customer Name"
                            placeholder="Enter Customer name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter valid name"
                            initialValue={loadedWork.customerName}
                            initialValid={true}
                            onInput={inputHandler}
                            divClass="form-group"
                          />
                          <Input
                            id="date"
                            element="input"
                            type="date"
                            label="Date"
                            placeholder="Enter Date"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter valid date"
                            initialValue={loadedWork.date.split("T")[0]}
                            initialValid={true}
                            onInput={inputHandler}
                            divClass="form-group"
                          />
                          <Input
                            id="carNo"
                            element="input"
                            type="number"
                            label="Vehicle No"
                            placeholder="Enter Vehicle Number"
                            validators={[
                              VALIDATOR_MINLENGTH(4),
                              VALIDATOR_MAXLENGTH(4),
                            ]}
                            initialValue={loadedWork.carNo}
                            initialValid={true}
                            errorText="Please enter valid vehicle no, atleast 4 characters required."
                            onInput={inputHandler}
                            divClass="form-group"
                          />
                          <Input
                            id="amount"
                            element="input"
                            type="number"
                            label="Amount"
                            placeholder="Enter Amount"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter valid amount"
                            initialValue={loadedWork.amount}
                            initialValid={true}
                            onInput={inputHandler}
                            divClass="form-group"
                          />
                          <label>Payment Type</label>
                          <select
                            id="paymentType"
                            className="form-control select2"
                          >
                            <option value="cash">Cash</option>
                            <option value="pending">Pending</option>
                          </select>
                          <label style={{ marginTop: "12px" }}>Branch</label>
                          <select id="branch" className="form-control select2">
                            <option value="bhatt">Bhatt</option>
                            <option value="sanand">Sanand</option>
                          </select>
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!formState.isValid}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default UpdateWork;
