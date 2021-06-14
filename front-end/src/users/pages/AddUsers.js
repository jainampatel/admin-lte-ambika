import React from "react";
import { Link } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Footer from "../../shared/components/theme/Footer";
import Header from "../../shared/components/theme/Header";
import Navbar from "../../shared/components/theme/Navbar";
import Sidebar from "../../shared/components/theme/Sidebar";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

const AddUsers = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
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
        "http://localhost:5000/api/user",
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: event.target.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (error) {}
    console.log(formState.inputs);
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
                        id="name"
                        element="input"
                        type="text"
                        label="Name"
                        placeholder="Enter Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter valid name"
                        onInput={inputHandler}
                        divClass="form-group"
                      />
                      <Input
                        id="email"
                        element="input"
                        type="email"
                        label="Email"
                        placeholder="Enter Email"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                        errorText="Please enter valid email"
                        onInput={inputHandler}
                        divClass="form-group"
                      />
                      <Input
                        id="password"
                        element="input"
                        type="password"
                        label="Password"
                        placeholder="Enter Password"
                        validators={[VALIDATOR_MINLENGTH(8)]}
                        errorText="Please enter valid email"
                        onInput={inputHandler}
                        divClass="form-group"
                      />
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
                        to="/user"
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

export default AddUsers;
