import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from "../components/Error";
import api from "../api";

const DisplayField = ({ label, value }) => {
    return (
        <div className="mb-4">
            <label>{label}</label>
            <p>{value || "-"}</p>
        </div>
    );
};

const emptyCompany = {
    name: "",
    email: "",
    phone: "",
    mobile: "",
    fax: "",
    website: "",
    employeeSize: "",
    annualRevenue: "",
    industryId: "",
    typeId: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    stateId: "",
    zip: "",
    countryId: "",
    statusId: "",
    stageId: "",
    sourceId: "",
    assigneeId: "",
    description: "",
};

const CompanyShow = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(emptyCompany);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this company?",
        );

        if (!confirmed) {
            return;
        }

        setError("");

        try {
            const res = await api(`/companies/${id}`, {
                method: "DELETE",
            });

            if (!res) {
                return;
            }

            const data = await res.json();

            if (data?.data) {
                navigate("/dashboard", {
                    state: {
                        message: "Company deleted successfully.",
                    },
                });
            } else {
                setError(data?.error || "Unexpected response from server.");
            }
        } catch (err) {
            console.error("Delete company error:", err);
            setError("An error occurred while deleting the company.");
        }
    };

    useEffect(() => {
        const loadCompany = async () => {
            setError("");

            try {
                const res = await api(`/companies/${id}`);

                if (!res) {
                    return;
                }

                const data = await res.json();

                if (data?.data) {
                    setCompany({
                        ...emptyCompany,
                        ...Object.fromEntries(
                            Object.entries(data.data).map(([key, value]) => [
                                key,
                                value ?? "",
                            ]),
                        ),
                    });
                } else {
                    setError(data?.error || "Unexpected response from server.");
                }
            } catch (err) {
                console.error("Load company error:", err);
                setError("An error occurred while loading the company.");
            }
        };

        loadCompany();
    }, [id]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-3">
                    <h1 className="mb-4 mt-4">Company</h1>
                    <Error message={error} />
                    {!error && (
                        <p className="mb-4">
                            <Link to={`/companies/${id}/edit`}>Edit company</Link>
                            {" | "}
                            <button
                                type="button"
                                className="btn-link is-danger"
                                onClick={handleDelete}
                            >
                                Delete company
                            </button>
                        </p>
                    )}
                </div>
                <div className="col-3"></div>
                <div className="col-5"></div>
            </div>

            <div className="row">
                <div className="col-1"></div>

                <div className="col-3">
                    <DisplayField label="Name" value={company.name} />
                    <DisplayField label="Email" value={company.email} />
                    <DisplayField label="Phone" value={company.phone} />
                    <DisplayField label="Mobile" value={company.mobile} />
                    <DisplayField label="Fax" value={company.fax} />
                    <DisplayField label="Website" value={company.website} />
                    <DisplayField
                        label="Employee size"
                        value={company.employeeSize}
                    />
                    <DisplayField
                        label="Annual revenue"
                        value={company.annualRevenue}
                    />
                    <DisplayField label="Industry" value={company.industryId} />
                    <DisplayField label="Type" value={company.typeId} />
                </div>

                <div className="col-3">
                    <DisplayField
                        label="Address line 1"
                        value={company.addressLine1}
                    />
                    <DisplayField
                        label="Address line 2"
                        value={company.addressLine2}
                    />
                    <DisplayField label="City" value={company.city} />
                    <DisplayField label="State" value={company.stateId} />
                    <DisplayField label="Zip" value={company.zip} />
                    <DisplayField label="Country" value={company.countryId} />
                    <DisplayField label="Status" value={company.statusId} />
                    <DisplayField label="Stage" value={company.stageId} />
                    <DisplayField label="Source" value={company.sourceId} />
                    <DisplayField label="Assignee" value={company.assigneeId} />
                </div>

                <div className="col-5"></div>
            </div>

            <div className="row mb-4">
                <div className="col-1"></div>
                <div className="col-6">
                    <DisplayField
                        label="Description"
                        value={company.description}
                    />
                </div>
                <div className="col-5"></div>
            </div>
        </div>
    );
};

export default CompanyShow;
