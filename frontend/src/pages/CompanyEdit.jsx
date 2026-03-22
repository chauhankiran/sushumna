import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../components/Error";
import api from "../api";

const emptyCompany = {
    name: "",
    email: "",
    phone: "",
    mobile: "",
    fax: "",
    website: "",
    employeeSize: "",
    annualRevenue: "",
    description: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    stateId: "",
    zip: "",
    countryId: "",
    statusId: "",
    stageId: "",
    sourceId: "",
    industryId: "",
    typeId: "",
    assigneeId: "",
};

const CompanyEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(emptyCompany);
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
                    setFormFields({
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

    const handleChange = (e) => {
        setError("");
        setFormFields({ ...formFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const body = Object.fromEntries(
            Object.entries(formFields).map(([key, value]) => [
                key,
                value === "" ? undefined : value,
            ]),
        );

        try {
            const res = await api(`/companies/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res) {
                return;
            }

            const data = await res.json();

            if (data?.data) {
                navigate(`/companies/${data.data}`);
            } else {
                setError(data?.error || "Unexpected response from server.");
            }
        } catch (err) {
            console.error("Update company error:", err);
            setError("An error occurred while updating the company.");
        }
    };

    return (
        <div className="container-fluid">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <h1 className="mb-4 mt-4">Edit Company</h1>
                        <Error message={error} />
                    </div>
                    <div className="col-3"></div>
                    <div className="col-5"></div>
                </div>

                <div className="row">
                    <div className="col-1"></div>

                    <div className="col-3">
                        <div className="mb-4">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formFields.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formFields.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formFields.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="mobile">Mobile</label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                value={formFields.mobile}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="fax">Fax</label>
                            <input
                                type="text"
                                id="fax"
                                name="fax"
                                value={formFields.fax}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="website">Website</label>
                            <input
                                type="text"
                                id="website"
                                name="website"
                                value={formFields.website}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="employeeSize">Employee size</label>
                            <input
                                type="number"
                                id="employeeSize"
                                name="employeeSize"
                                min="0"
                                value={formFields.employeeSize}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="annualRevenue">
                                Annual revenue
                            </label>
                            <input
                                type="number"
                                id="annualRevenue"
                                name="annualRevenue"
                                min="0"
                                step="0.01"
                                value={formFields.annualRevenue}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="industryId">Industry</label>
                            <input
                                type="text"
                                id="industryId"
                                name="industryId"
                                value={formFields.industryId}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="typeId">Type</label>
                            <input
                                type="text"
                                id="typeId"
                                name="typeId"
                                value={formFields.typeId}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="mb-4">
                            <label htmlFor="addressLine1">Address line 1</label>
                            <input
                                type="text"
                                id="addressLine1"
                                name="addressLine1"
                                value={formFields.addressLine1}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="addressLine2">Address line 2</label>
                            <input
                                type="text"
                                id="addressLine2"
                                name="addressLine2"
                                value={formFields.addressLine2}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formFields.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="stateId">State</label>
                            <input
                                type="text"
                                id="stateId"
                                name="stateId"
                                value={formFields.stateId}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="zip">Zip</label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                value={formFields.zip}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="countryId">Country</label>
                            <input
                                type="text"
                                id="countryId"
                                name="countryId"
                                value={formFields.countryId}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="statusId">Status</label>
                            <input
                                type="text"
                                id="statusId"
                                name="statusId"
                                value={formFields.statusId}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="stageId">Stage</label>
                            <input
                                type="text"
                                id="stageId"
                                name="stageId"
                                value={formFields.stageId}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="sourceId">Source</label>
                            <input
                                type="text"
                                id="sourceId"
                                name="sourceId"
                                value={formFields.sourceId}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="assigneeId">Assignee</label>
                            <input
                                type="text"
                                id="assigneeId"
                                name="assigneeId"
                                value={formFields.assigneeId}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-5"></div>
                </div>

                <div className="row mb-4">
                    <div className="col-1"></div>
                    <div className="col-6">
                        <div className="mb-4">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                value={formFields.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-5"></div>
                </div>

                <div className="row mb-4">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <button type="submit">Update company</button>
                        <button
                            type="button"
                            className="is-danger ml-2"
                            onClick={handleDelete}
                        >
                            Delete company
                        </button>
                    </div>
                    <div className="col-3"></div>
                    <div className="col-5"></div>
                </div>
            </form>
        </div>
    );
};

export default CompanyEdit;
