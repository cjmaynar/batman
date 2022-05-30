import { Alert, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";

import axios from "../axiosInstance";
import UserContext from "../context";

import "react-datepicker/dist/react-datepicker.css";

const AnimalsEdit = () => {
    const {user } = useContext(UserContext);
    const [ formData, setFormData ] = useState({
        birthdate: new Date(),
        name: "",
        experiments: [],
        primary_caretaker: user.id,
    });
  const [ experimentOptions, setExperimentOptions] = useState([]);
  const [ error, setError ] = useState("");
  const navigate = useNavigate();
  const { id: animalID } = useParams();
  const [ isLoading, setIsLoading ] = useState(Boolean(animalID));

  useEffect(() => {
    axios.get("/experiments/").then((response) => {
        const experiments = response.data.map((experiment) => {
            return {value: experiment.id, label: experiment.name}
        });
        setExperimentOptions(experiments);
    });
  }, []);

  useEffect(() => {
        if (animalID) {
            axios.get(`/animals/${animalID}/`).then((response) => {
                setFormData({
                    ...formData,
                    name: response.data.name,
                    start: new Date(response.data.start),
                    end: response.data.end ? new Date(response.data.end) : undefined,
                });
                setIsLoading(false);
            });
        }
  }, [animalID]);

  const handleOnChange = (event, field) => {
      if (field === "experiments") {
          setFormData({
              ...formData,
              experiments: event.map((selection) => selection.value),
          });
      } else {
          const { target } = event;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          field = target.name;

          setFormData({
              ...formData,
              [field]: value,
          });
      }
  }

    const getFormattedDate = (date) => {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

  const handleSubmit = (e) => {
      e.preventDefault();

      let url = "/animals/";
      let axiosAction = axios.post;
      if (animalID) {
          url += `${animalID}/`;
          axiosAction = axios.put
      }

      const formCopy = formData;
      if (formData.birthdate) {
          formCopy.birthdate = getFormattedDate(formData.birthdate);
      }
      axiosAction(url, formCopy).then((response) => {
          navigate("/animals");
      }).catch((err) => {
        setError(err.response.data.detail);
      });
  }

    const action = animalID ? "Edit" : "Add";
    return (
        <Card>
            <CardHeader>{action} Animal</CardHeader>
            <CardBody>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    {error &&
                        <Alert color="danger">{error}</Alert>
                    }

                    {isLoading ?
                        <Alert color="info">Loading...</Alert>
                    :
                        <>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" name="name" type="text" value={formData.name} onChange={(e) => handleOnChange(e, "name")} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="start">Birth Date</Label>
                            <DatePicker dateFormat="yyyy-MM-dd" selected={formData.birthdate} id="birth" name="birth" onSelect={(e) => handleOnChange(e, "birthdate")} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="experiments">Experiments</Label>
                            <Select isMulti options={experimentOptions} onChange={(value) =>handleOnChange(value, "experiments")} />
                        </FormGroup>
                        <Button color="primary">{action}</Button>
                        </>
                    }
                </Form>
            </CardBody>
        </Card>
    );
}

export default AnimalsEdit;

