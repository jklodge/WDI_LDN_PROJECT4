import React from 'react';

const DataSection = ({ sectionOpened, toggleSectionOpened, header, children }) => {

  return (
    <div>
      <li onClick={toggleSectionOpened}>{header}</li>
      {sectionOpened && children}
    </div>
  );
};

export default DataSection;
