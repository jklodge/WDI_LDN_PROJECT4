import React from 'react';

const Icon = ({ srcs }) => {

  return (
    <div className="columns">
      {srcs.map((src, i) =>
        <div key={i} className="column is-one-quarter-mobile">
          <figure>
            <img src={src.path} alt={src.name} />
          </figure>
        </div>
      )}
    </div>
  );
};

export default Icon;
