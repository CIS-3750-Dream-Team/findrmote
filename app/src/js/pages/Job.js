import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { HiArrowNarrowLeft, HiExternalLink } from 'react-icons/hi';

import JobControl from '../components/JobControl';

import '../../scss/job.scss';


const jobdata = {
  id: "64c4da30-33d0-4056-bf83-bac661a99209",
  type: "Full time",
  company: "Tulip Retail",
  title: "Frontend Developer",
  description: "<p>Harvard University</p>\n<p>Applications Developer\nHarvard Law School\n53617BR</p>\n<p>Job Summary</p>\n<p>Independently perform complex applications/web development for projects of large to very large size and complexity; typically work as part of a team to implement business solutions. Responsible for all aspects of application development cycle. Code advanced and complex software solutions.</p>\n<p>Job Code\nI0757P Applications Professional III</p>\n<p>Job-Specific Responsibilities</p>\n<p>The Applications Developer is a member of the ITS Business Solutions team, contributing to the full development lifecycle of applications targeting areas such as Admissions, Student Services, Executive Education and the academic program. The successful candidate will thrive in a nimble, Agile development environment, enjoy working directly with our business partners, and be comfortable moving between technologies based on business requirements and emerging trends. Projects range from React and Node, to C#/.Net, hosted both in on-premises and SaaS environments.</p>\n<p>As an Applications Developer you will:</p>\n<ul>\n<li>\n</ul>\n<p>Work in partnership with clients to implement and maintain practical, innovative, integrated, and reliable solutions\n*\nParticipate on project teams, utilizing Agile, rapid development processes\n*\nLead Agile Scrum ceremonies, such as backlog grooming, sprint planning, daily stand-ups, and retrospectives\n*\nBuild integrations between systems\n*\nEngage with vendors on new feature implementations, and to resolve product issues\n*\nTriage bugs with clients, to ensure accurate detail and prioritization</p>\n<p>Typical Core Duties</p>\n<ul>\n<li>Participate fully in software development life cycle</li>\n<li>Implement and support technical solutions to deliver business requirements</li>\n<li>Identify and evaluate opportunities to improve services</li>\n<li>Contribute ideas to coding best practices and new technologies</li>\n<li>Draw on relationship and technical skills to act as technical liaison to internal and external clients</li>\n<li>Abide by and follow the Harvard University IT technical standards, policies and Code of Conduct</li>\n</ul>\n<p>Basic Qualifications</p>\n<ul>\n<li>Minimum of two years' post-secondary education or relevant work experience</li>\n</ul>\n<p>Additional Qualifications and Skills</p>\n<ul>\n<li>\n</ul>\n<p>Solid understanding of a variety of programming constructs, software design patterns, and their uses in common tasks\n*\nComfort working in a variety of operating systems, technical architectures and programming languages\n*\nExperience working on teams utilizing Agile development methodologies\n*\nSolid organizational skills, including time management and prioritization\n*\nSelf-starter with ability to work with diverse technical and non-technical clients\n*\nStrong team player with a positive attitude, and committed to the success of the overall team\n*\nAbility to accept constructive feedback, and act on it\n*\nDemonstrated team performance skills, service mindset approach, and the ability to act as a trusted advisor</p>\n<p>Additional Information</p>\n<p>Be a part of excellence and leadership in legal education and scholarship at Harvard Law School. We are a community of talented people from diverse backgrounds, lived experiences, and perspectives, dedicated to advancing the cause of justice all over the world. We value our differences and our diversity as a source of strength. We are committed to developing and inspiring our students and our workforce. Whoever you are, whatever you do, however you do it, Harvard Law School is a place where you can thrive.</p>\n<p>All offers to be made by HLS Human Resources.</p>\n<p>Job Function\nInformation Technology</p>\n<h2>Sub Unit</h2>\n<p>Location\nUSA - MA - Cambridge</p>\n<p>Department\nITS Business Solutions</p>\n<p>Time Status\nFull-time</p>\n<p>Union\n00 - Non Union, Exempt or Temporary</p>\n<p>Salary Grade\n057</p>\n<p>Pre-Employment Screening\nCriminal, Identity</p>\n<p>Schedule\n35h; Monday through Friday - 9am to 5pm</p>\n<p>EEO Statement\nWe are an equal opportunity employer and all qualified applicants will receive consideration for employment without regard to race, color, religion, sex, national origin, disability status, protected veteran status, gender identity, sexual orientation, pregnancy and pregnancy-related conditions, or any other characteristic protected by law.</p>\n<p>Apply Here: <a href=\"https://www.click2apply.net/6eqgb1tWBzBPu1NVHrGXy\">https://www.click2apply.net/6eqgb1tWBzBPu1NVHrGXy</a></p>\n<p>PI132178968</p>\n",
  __html: "<p>Harvard University</p>\n<p>Applications Developer\nHarvard Law School\n53617BR</p>\n<p>Job Summary</p>\n<p>Independently perform complex applications/web development for projects of large to very large size and complexity; typically work as part of a team to implement business solutions. Responsible for all aspects of application development cycle. Code advanced and complex software solutions.</p>\n<p>Job Code\nI0757P Applications Professional III</p>\n<p>Job-Specific Responsibilities</p>\n<p>The Applications Developer is a member of the ITS Business Solutions team, contributing to the full development lifecycle of applications targeting areas such as Admissions, Student Services, Executive Education and the academic program. The successful candidate will thrive in a nimble, Agile development environment, enjoy working directly with our business partners, and be comfortable moving between technologies based on business requirements and emerging trends. Projects range from React and Node, to C#/.Net, hosted both in on-premises and SaaS environments.</p>\n<p>As an Applications Developer you will:</p>\n<ul>\n<li>\n</ul>\n<p>Work in partnership with clients to implement and maintain practical, innovative, integrated, and reliable solutions\n*\nParticipate on project teams, utilizing Agile, rapid development processes\n*\nLead Agile Scrum ceremonies, such as backlog grooming, sprint planning, daily stand-ups, and retrospectives\n*\nBuild integrations between systems\n*\nEngage with vendors on new feature implementations, and to resolve product issues\n*\nTriage bugs with clients, to ensure accurate detail and prioritization</p>\n<p>Typical Core Duties</p>\n<ul>\n<li>Participate fully in software development life cycle</li>\n<li>Implement and support technical solutions to deliver business requirements</li>\n<li>Identify and evaluate opportunities to improve services</li>\n<li>Contribute ideas to coding best practices and new technologies</li>\n<li>Draw on relationship and technical skills to act as technical liaison to internal and external clients</li>\n<li>Abide by and follow the Harvard University IT technical standards, policies and Code of Conduct</li>\n</ul>\n<p>Basic Qualifications</p>\n<ul>\n<li>Minimum of two years' post-secondary education or relevant work experience</li>\n</ul>\n<p>Additional Qualifications and Skills</p>\n<ul>\n<li>\n</ul>\n<p>Solid understanding of a variety of programming constructs, software design patterns, and their uses in common tasks\n*\nComfort working in a variety of operating systems, technical architectures and programming languages\n*\nExperience working on teams utilizing Agile development methodologies\n*\nSolid organizational skills, including time management and prioritization\n*\nSelf-starter with ability to work with diverse technical and non-technical clients\n*\nStrong team player with a positive attitude, and committed to the success of the overall team\n*\nAbility to accept constructive feedback, and act on it\n*\nDemonstrated team performance skills, service mindset approach, and the ability to act as a trusted advisor</p>\n<p>Additional Information</p>\n<p>Be a part of excellence and leadership in legal education and scholarship at Harvard Law School. We are a community of talented people from diverse backgrounds, lived experiences, and perspectives, dedicated to advancing the cause of justice all over the world. We value our differences and our diversity as a source of strength. We are committed to developing and inspiring our students and our workforce. Whoever you are, whatever you do, however you do it, Harvard Law School is a place where you can thrive.</p>\n<p>All offers to be made by HLS Human Resources.</p>\n<p>Job Function\nInformation Technology</p>\n<h2>Sub Unit</h2>\n<p>Location\nUSA - MA - Cambridge</p>\n<p>Department\nITS Business Solutions</p>\n<p>Time Status\nFull-time</p>\n<p>Union\n00 - Non Union, Exempt or Temporary</p>\n<p>Salary Grade\n057</p>\n<p>Pre-Employment Screening\nCriminal, Identity</p>\n<p>Schedule\n35h; Monday through Friday - 9am to 5pm</p>\n<p>EEO Statement\nWe are an equal opportunity employer and all qualified applicants will receive consideration for employment without regard to race, color, religion, sex, national origin, disability status, protected veteran status, gender identity, sexual orientation, pregnancy and pregnancy-related conditions, or any other characteristic protected by law.</p>\n<p>Apply Here: <a href=\"https://www.click2apply.net/6eqgb1tWBzBPu1NVHrGXy\">https://www.click2apply.net/6eqgb1tWBzBPu1NVHrGXy</a></p>\n<p>PI132178968</p>\n",
  link: "https://indeed.com/",
  tags: ["jQuery", "Javascript", "HTML", "CSS", "Github"]
}

function Job(props) {
  const { job_id } = useParams();

  useEffect(() => {
    console.log(`job_id: ${job_id}`)
  }, [job_id]);


  return (
    <div id="jobpage" className="d-flex flex-column px-3">
      <header className="position-relative d-flex w-100 mt-5 mb-5">
        <div className="back-button mt-5 pe-3">
          <a className="txt-1" href="/"> <HiArrowNarrowLeft size={30}/> </a>
        </div>

        <div className="d-flex flex-column position-absolute">
          <h3 className="fs-4 txt-0"> {jobdata.company} </h3>

          <div className="d-flex flex-wrap">
            <h1 className="fs-1 fw-bold me-5"> {jobdata.title} </h1>
            <div className="d-flex align-items-center">
              <JobControl size="1.5em" />
            </div>
          </div>

          <div className="d-flex align-items-center">
            <a href={jobdata.link}> View on {(new URL(jobdata.link)).hostname} </a>
            <HiExternalLink className="ms-2" size={20}/>
          </div>
        </div>
      </header>

      <div className="job-info-wrapper mt-4">
        <div className="p-0 pb-5" dangerouslySetInnerHTML={jobdata} />
      </div>
    </div>
  )
}

export default Job;
