import React, { useState } from "react";
import JobCard from "../components/JobCard";

const API_URL = process.env.REACT_APP_API_URL;

// delete after connecting to api later. backend api doesn't send proper job_data format yet
const job_datas = [
	{
		job_id: "1234",
		company: "Google",
		job_title: "Software Developer",
		tags: [
			"Firebase",
			"Javascript",
			"HTML",
			"Github",
			"Python",
			"Golang",
			"Bash",
		],
	},
	{
		job_id: "5678",
		company: "Tulip Retail",
		job_title: "Frontend Developer",
		tags: ["jQuery", "Javascript", "HTML", "CSS", "Github"],
	},
	{
		job_id: "9888",
		company: "NCR",
		job_title: "Software Developer",
		tags: ["Java", "Github", "HTML", "Unit Testing", "Git"],
	},
	{
		job_id: "9995",
		company: "The Cooperators",
		job_title: "Fullstack Developer",
		tags: ["CSS", "Javascript", "Github", "HTML", "Git", "Kafka", "Python"],
	},
	{
		job_id: "9699",
		company: "Mozilla",
		job_title: "Quality Assurance",
		tags: ["Github", "Javascript"],
	},
];

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

			{/* JobCard Container: Renders Four jobs in each row */}
			<div className="row my-4">
				{job_datas.map((job_data) => (
					<div
						className="col-12 col-md-4 col-xl-3"
						key={job_data.job_id}
					>
						<JobCard job_data={job_data} />
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;
