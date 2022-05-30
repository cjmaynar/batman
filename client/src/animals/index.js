import { useState, useEffect } from "react";
import { Alert, Card, CardHeader, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function Animals() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [animals, setAnimals] = useState([]);
    useEffect(() => {
        axios.get("/animals/").then((response) => {
            setAnimals(response.data);
            setLoading(false);
        }).catch((err) => {
            setError(err.response.data.detail);
            setLoading(false);
        });
    }, []);


    return (
        <Card>
            <CardHeader>My Animals</CardHeader>
            <CardBody>
                {loading &&
                    <Alert color="info">Loading...</Alert>
                }
                {error &&
                    <Alert color="danger">{error}</Alert>
                }
                {!loading && !error && !animals &&
                    <Alert color="info">You have no animals yet. Create one to start tracking your animals</Alert>
                }
                <ul>
                {animals.map((animal) => {
                    return (<li key={animal.name}><Link to={`/animals/${animal.id}`}>{animal.name}</Link> - <Link to={`/animals/edit/${animal.id}`}>Edit</Link></li>);
                })}
                </ul>

                <Link to="/animals/edit">Add Animal</Link>
            </CardBody>
        </Card>
    );
}

export default Animals;
