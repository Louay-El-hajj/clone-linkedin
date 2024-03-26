import React from 'react';

const SkillsList = ({ skills }) => {
  return (
    <div>
      <h2>Skills</h2>
      {skills.length > 0 ? (
        <ul>
          {skills.map((exp, index) => (
            <li key={index}>
              <p>Name: {exp.skill_name}</p>
              <p>Proficiency: {exp.proficiency}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No skills available</p>
      )}
    </div>
  );
};

export default SkillsList;
