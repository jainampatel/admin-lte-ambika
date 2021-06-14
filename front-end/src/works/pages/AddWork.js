import React, { useContext } from "react";
import { Link } from "react-router-dom";
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

const AddWork = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
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

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/work",
        "POST",
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
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Navbar />
      <Sidebar />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="content-wrapper">
        <Header heading="Add Users" />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {/* left column */}
              <div className="col-md-10">
                {/* general form elements */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Add Users</h3>
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
                        onInput={inputHandler}
                        divClass="form-group"
                      />
                      <Input
                        id="date"
                        element="input"
                        type="date"
                        label="Date"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter valid date."
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
                        onInput={inputHandler}
                        divClass="form-group"
                      />
                      <label>Payment Type</label>
                      <select id="paymentType" className="form-control select2">
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

                      <Link
                        to="/work"
                        className="btn btn-success"
                        style={{ marginLeft: "10px" }}
                      >
                        Display
                      </Link>
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
  );
};

export default AddWork;
