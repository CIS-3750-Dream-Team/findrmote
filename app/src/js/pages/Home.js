import React, { useState } from "react";
import JobCard from "../components/JobCard";

const API_URL = process.env.REACT_APP_API_URL;

function Home(props) {
	const [apiURL, setURL] = useState(API_URL);

	const send = (e) => {
		fetch(`${apiURL}/jobs`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((job_data) => {
				console.log(job_data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div id="home">
			<h3> Home </h3>

			<div className="d-flex mt-3 w-50">
				<input
					className="form-control me-4"
					value={apiURL}
					onChange={(e) => setURL(e.target.value)}
					type="text"
				/>

				<button
					className="btn btn-outline-primary"
					onClick={send}
					type="button"
				>
					Send
				</button>
			</div>
			<JobCard />
		</div>
	);
}

export default Home;
