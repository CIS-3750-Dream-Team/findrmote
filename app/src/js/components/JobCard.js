import React from "react";
import "../../scss/jobCard.scss";

/**
 * @description The Job Card component with job title, company, job details.
 * @param {Object} props The properties sent to the component
 * @param {string} props.jobID the ID of the job that the card represents
 * @returns {ReactElement} The Job Card component with job title, company, job details.
 */
export default function JobCard({ jobID }) {
	const techlist = [
		"Firebase",
		"Javascript",
		"HTML",
		"Github",
		"Python",
		"Golang",
		"Bash",
	];
	return (
		<div className="card jobcard my-5 shdw-lg">
			<div className="card-body jobcard--body">
				<h5 className="jobcard--company">Google</h5>
				<h1 className="card-title jobcard--title">
					Software Developer
				</h1>
				<TechnologyList techlist={techlist} />
			</div>
		</div>
	);
}

/**
 * @description Renders a list of technologies for the job
 * @param {Object} props The properties sent to the component
 * @param {string} props.techlist The list of technologies that needs to be displayed as tags
 * @returns {ReactElement} The Techlogoy List component with the technology tag.
 */
function TechnologyList({ techlist }) {
	return (
		<ul className="jobcard--techlist d-flex flex-row flex-wrap align-items-center">
			{techlist.map((tech, i) => (
				<li key={i}>{tech}</li>
			))}
		</ul>
	);
}
