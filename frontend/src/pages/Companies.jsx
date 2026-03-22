import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Error from "../components/Error";
import Message from "../components/Message";
import api from "../api";

const Companies = () => {
	const location = useLocation();
	const message = location.state?.message;
	const [companies, setCompanies] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadCompanies = async () => {
			setError("");

			try {
				const res = await api("/companies");

				if (!res) {
					return;
				}

				const data = await res.json();

				if (data?.data) {
					setCompanies(data.data);
				} else {
					setError(data?.error || "Unexpected response from server.");
				}
			} catch (err) {
				console.error("Load companies error:", err);
				setError("An error occurred while loading companies.");
			}
		};

		loadCompanies();
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-1"></div>
				<div className="col-6">
					<h1 className="mb-4 mt-4">Companies</h1>
					<Message message={message} />
					<Error message={error} />
					<p className="mb-4">
						<Link to="/companies/new">New company</Link>
					</p>

					<table className="table mb-4">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th>City</th>
								<th>Website</th>
							</tr>
						</thead>
						<tbody>
							{companies.length === 0 ? (
								<tr>
									<td colSpan="5">No companies found.</td>
								</tr>
							) : (
								companies.map((company) => (
									<tr key={company.id}>
										<td>
											<Link to={`/companies/${company.id}`}>
												{company.name || "-"}
											</Link>
										</td>
										<td>{company.email || "-"}</td>
										<td>{company.phone || "-"}</td>
										<td>{company.city || "-"}</td>
										<td>{company.website || "-"}</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
				<div className="col-5"></div>
			</div>
		</div>
	);
};

export default Companies;
