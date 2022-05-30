import { useState, useEffect } from "react";
import { Alert, Card, CardHeader, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function Experiments() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [experiments, setExperiments] = useState([]);
    useEffect(() => {
        axios.get("/experiments/").then((response) => {
            setExperiments(response.data);
            setLoading(false);
        }).catch((err) => {
            setError(err.response.data.detail);
            setLoading(false);
        });
    }, []);


    return (
        <Card>
            <CardHeader>My Experiments</CardHeader>
            <CardBody>
                {loading &&
                    <Alert color="info">Loading...</Alert>
                }
                {error &&
                    <Alert color="danger">{error}</Alert>
                }
                {!loading && !error && !experiments &&
                    <Alert color="info">You have no experiments yet. Create one to start tracking your animals</Alert>
                }
                <ul>
                {experiments.map((experiment) => {
                    return (<li key={experiment.name}>{experiment.name} <Link to={`/experiments/edit/${experiment.id}`}>Edit</Link></li>);
                })}
                </ul>

                <Link to="/experiments/edit">Create Experiment</Link>
            </CardBody>
        </Card>
    );
}

export default Experiments;

