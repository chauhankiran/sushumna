import { useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation();
    const message = location.state?.message;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-3">
                    <h1 className="mb-4 mt-4">Home</h1>
                    {message && <p className="mb-4 green">{message}</p>}
                </div>
                <div className="col-8"></div>
            </div>
        </div>
    );
};

export default Home;
