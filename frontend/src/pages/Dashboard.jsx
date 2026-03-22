import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";

const Dashboard = () => {
    const location = useLocation();
    const message = location.state?.message;
    const [data, setData] = useState(null);

    useEffect(() => {
        api("/dashboard")
            .then((res) => {
                if (!res) return;
                return res.json();
            })
            .then((json) => {
                if (json) {
                    setData(json.data);
                }
            })
            .catch((err) => {
                console.error("Dashboard error:", err);
            });
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-3">
                    <h1 className="mb-4 mt-4">Dashboard</h1>
                    {message && <p className="mb-4 green">{message}</p>}
                </div>
                <div className="col-8"></div>
            </div>
        </div>
    );
};

export default Dashboard;
