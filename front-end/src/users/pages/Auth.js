import React, { useContext, useState } from "react";

import Card from "../../shared/components/theme/Card";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const [formState, inputHandler, setFormData] = useForm(
    {
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

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/user/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.userId, responseData.token);
        history.push("/");
      } catch (error) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/user/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
        history.push("/");
      } catch (error) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication card-outline card-primary">
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="login-logo">
          <h2>{isLoginMode ? "LOGIN" : "SIGNUP"}</h2>
        </div>
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid password, at least 8 characters."
            onInput={inputHandler}
          />

          <button
            type="submit"
            disabled={!formState.isValid}
            style={{
              marginTop: "20px",
              borderRadius: "0.5rem",
              boxShadow: "0 5px 10px rgba(0, 0, 0, 0.26)",
            }}
            className="btn btn-primary"
          >
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </button>
        </form>
        <div class="mb-0">
          <button
            onClick={switchModeHandler}
            style={{
              borderRadius: "0.5rem",
              boxShadow: "0 5px 10px rgba(0, 0, 0, 0.26)",
            }}
            className="btn btn-success"
          >
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
