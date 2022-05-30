import { useContext, useState } from "react";
import { Alert, Row, Card, Form, Label, Input, FormGroup, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

import axios from "../axiosInstance";
import UserContext from "../context";


export default function Login() {
  const [ loginInfo, setLoginInfo ] = useState({});
  const [ error, setError ] = useState("");

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
      e.preventDefault();
      axios.post("/login", loginInfo).then((response) => {
          userContext.login(response.data);
          navigate("/");
      }).catch((err) => {
        setError(err.response.data.detail);
      });
  }

  const handleOnChange = (event) => {
      const { target } = event;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const { name } = target;

      setLoginInfo({
          ...loginInfo,
          [name]: value,
      });
  }


  return (
      <Row>
        <Card>
            <Form onSubmit={(e) => handleLogin(e)}>
                {error &&
                    <Alert color="danger">{error}</Alert>
                }
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" name="email" type="text" onChange={(e) => handleOnChange(e)} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" name="password" type="password" onChange={(e) => handleOnChange(e)} />
                </FormGroup>
                <Button color="primary">Login</Button>
            </Form>
        </Card>
    </Row>
  );
}
