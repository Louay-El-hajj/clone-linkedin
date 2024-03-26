import React from 'react';

const ExperienceList = ({ experience }) => {
  return (
    <div>
      <h2>Experience</h2>
      {experience.length > 0 ? (
        <ul>
          {experience.map((exp, index) => (
            <li key={index}>
              <p>Company: {exp.company}</p>
              <p>Position: {exp.position}</p>
              <p>Start Date: {exp.start_date}</p>
              <p>End Date: {exp.end_date}</p>
              <p>Description: {exp.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No experience available</p>
      )}
    </div>
  );
};

export default ExperienceList;
