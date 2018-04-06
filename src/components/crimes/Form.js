import React from 'react';

const Form = ( {handleSubmit, handleChange, data, toggleSubmitReport }) => {

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <div className="select">

          <label htmlFor="name">Username</label>
          <select placeholder="Username" name="username"
            onChange={handleChange}>
            <option selected>{data.username}</option>
            {/* <option>{data.username}</option> */}
            <option>annoymous</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="name">Annoymous</label>
        <select placeholder="Username"
          onChange={handleChange}>
          <option selected>{data.username}</option>
          {/* <option>{data.username}</option> */}
          <option>annoymous</option>
        </select>
      </div>
      <div className="field">
        <div className="control">
          <div className="select">
            <label htmlFor="name">Crime</label>
            <select placeholder="Crime" name="crime" value={data.crime} onChange={handleChange}>
              <option defaultValue disabled value="">Please choose</option>
              <option>Robbery</option>
              <option>Motor Vehicle</option>
              <option>Assault</option>
              <option>Sexual Offence</option>
              <option>Gun Crime</option>
              <option>Racist Crime</option>
              <option>Homophobic Crime</option>
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <label htmlFor="name">Location</label>
        <input className="input" placeholder="Location" name="location" value={data.location} onChange={handleChange}/>
      </div>

      <div className="field">
        <label htmlFor="name">Date of incident</label>
        <input className="input" type="date" placeholder="Date of incident" name="date" value={data.date} onChange={handleChange}/>

      </div>
      <div className="field">
        <label htmlFor="name">Incident Description</label>
        <input className="input" placeholder="Incident Description" name="incidentDescription" value={data.incidentDescription} onChange={handleChange}/>

      </div>
      {data.submitReport ? (
        <div>
          <p>Do you confirm that this incident happened to you and all of the above information is correct?</p>
          <button onSubmit={handleSubmit} className="button is-primary">Yes</button>
          <button onClick={toggleSubmitReport} className="button is-primary">No</button>
        </div>
      ) : (
        <div>
          <button onClick={toggleSubmitReport} className="button is-primary">Submit</button>
        </div>
      )}
    </form>
  );
};

export default Form;
