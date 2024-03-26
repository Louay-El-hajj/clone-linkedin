import React from 'react';

const EducationList = ({ education }) => {
  return (
    <div>
      <h2>Education</h2>
      {education.length > 0 ? (
        <ul>
          {education.map((exp, index) => (
            <li key={index}>
              <p>Degree: {exp.degree}</p>
              <p>Institution: {exp.institution}</p>
              <p>Field: {exp.field_of_study}</p>
              <p>Start Date: {exp.start_date}</p>
              <p>End Date: {exp.end_date}</p>
              <p>Description: {exp.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No education available</p>
      )}
    </div>
  );
};

export default EducationList;
