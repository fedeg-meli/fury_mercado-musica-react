import React, { Component } from "react";
import styled from "styled-components";
import Button from "@andes/button";
import Card from "@andes/card";
import TextField, { Password } from "@andes/textfield";
import Spinner from "@andes/spinner";
import Snackbar from "@andes/snackbar";
import { fetchRequest } from "../helpers/navigation";
import ENDPOINTS from "../helpers/ENDPOINTS";

const ContainerLogin = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -120px;
  .andes-card {
    width: 300px;
    .title {
      font-weight: 500;
      line-height: 1.5;
      margin: 0;
      margin-bottom: 15px;
    }
    .login-button {
      font-family: "proxima_novasemibold", Arial, Helvetica, sans-serif;
      margin-top: 15px;
      &.full-width {
        width: 100%;
      }
    }
  }
`;

export default class Login extends Component {
  state = {
    email: "",
    showPassword: false,
    password: "",
    loading: false,
    error: ""
  };

  componentDidMount() {
    const ls = localStorage;
    const user = ls.getItem("user");
    if (user) {
      document.location.href = "/home";
    }
  }

  handleEmail = e => {
    const email = e.target.value;
    this.setState({
      email
    });
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        showPassword: true
      });
    } else {
      this.setState({
        showPassword: false
      });
    }
  };

  handlePassword = e => {
    const password = e.target.value;
    this.setState({
      password
    });
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  clearError = () => {
    this.setState({
      error: ""
    });
  };

  displayError = error => {
    this.setState({
      error: error.data.error
    });
  };

  tryLogin = () => {
    this.toggleLoading();
    this.clearError();
    fetchRequest({
      method: "post",
      url: ENDPOINTS.login,
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(response => {
        this.login(response);
      })
      .catch(error => {
        this.toggleLoading();
        this.displayError(error);
      });
  };

  login = user => {
    const ls = localStorage;
    ls.setItem("user", JSON.stringify(user));
    document.location.href = "/home";
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        {this.state.loading && <Spinner />}
        <Snackbar
          message={this.state.error}
          type="error"
          show={this.state.error !== ""}
          delay={5000}
        />
        <ContainerLogin>
          <Card paddingSize={64}>
            <h2 className="title">
              ¡Hola! Ingresá para disfrutar la mejor música
            </h2>
            <TextField
              label="Tu correo"
              value={this.state.email}
              onChange={this.handleEmail}
              autoFocus
              message=""
            />
            {this.state.showPassword && (
              <Password
                label="Tu contraseña"
                value={this.state.password}
                onChange={this.handlePassword}
              />
            )}
            <Button
              disabled={email === "" || password === ""}
              modifier="filled"
              className="login-button full-width"
              onClick={this.tryLogin}
            >
              Continuar
            </Button>
          </Card>
        </ContainerLogin>
      </div>
    );
  }
}
