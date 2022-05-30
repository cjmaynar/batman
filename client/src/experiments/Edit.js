import { Alert, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";

import axios from "../axiosInstance";

import "react-datepicker/dist/react-datepicker.css";

const ExperimentsEdit = () => {
    const [ formData, setFormData ] = useState({
        start: new Date(),
        end: undefined,
        name: "",
        summary: "",
        people: [],
    });
  const [ userOptions, setUserOptions] = useState([]);
  const [ error, setError ] = useState("");
  const navigate = useNavigate();
  const { id: experimentID } = useParams();
  const [ isLoading, setIsLoading ] = useState(Boolean(experimentID));

  useEffect(() => {
    axios.get("/users/").then((response) => {
        setUserOptions(response.data);
    });
  }, []);

  useEffect(() => {
        if (experimentID) {
            axios.get(`/experiments/${experimentID}/`).then((response) => {
                const currentPeople = response.data.people.map((person) => {
                    return userOptions.find((user) => user.value === person);
                });

                setFormData({
                    name: response.data.name,
                    summary: response.data.summary,
                    people: currentPeople,
                    start: new Date(response.data.start),
                    end: response.data.end ? new Date(response.data.end) : undefined,
                });
                setIsLoading(false);
            });
        }
  }, [experimentID]);

  const handleOnChange = (event, field) => {
      let value;
      if (["start", "end"].indexOf(field) !== -1) {
          value = event;
      } else {
          const { target } = event;
          value = target.type === 'checkbox' ? target.checked : target.value;
          field = target.name;
      }

      setFormData({
          ...formData,
          [field]: value,
      });
  }

    const getFormattedDate = (date) => {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

  const handleSubmit = (e) => {
      e.preventDefault();

      let url = "/experiments/";
      let axiosAction = axios.post;
      if (experimentID) {
          url += `${experimentID}/`;
          axiosAction = axios.put
      }

      const formCopy = formData;
      formCopy.start = getFormattedDate(formData.start);
      if (formData.end) {
          formCopy.end = getFormattedDate(formData.end);
      }
      axiosAction(url, formCopy).then((response) => {
          navigate("/experiments");
      }).catch((err) => {
        setError(err.response.data.detail);
      });
  }

    const action = experimentID ? "Edit" : "Create";
    return (
        <Card>
            <CardHeader>{action} Experiment</CardHeader>
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
                            <Label for="start">Start Date</Label>
                            <DatePicker dateFormat="yyyy-MM-dd" selected={formData.start} id="start" name="start" onSelect={(e) => handleOnChange(e, "start")} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="end">End Date</Label>
                            <DatePicker dateFormat="yyyy-MM-dd" selected={formData.end} id="end" name="end" onSelect={(e) => handleOnChange(e, "end")} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="summary">Summary</Label>
                            <Input type="textarea" name="summary" value={formData.summary} onChange={(e) => handleOnChange(e, "summary")} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="people">People</Label>
                            <Select isMulti={true} options={userOptions} defaultValue={formData.people} />
                        </FormGroup>
                        <Button color="primary">{action}</Button>
                        </>
                    }
                </Form>
            </CardBody>
        </Card>
    );
}

export default ExperimentsEdit;
