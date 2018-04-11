import React from 'react';

class Image extends React.Component {

  // component is constructed here
  constructor() {
    super();

    // HTML5 gives us the FileReader constructor
    this.fileReader = new FileReader();
    // onload is triggered when reading has been successfully complete
    // find out the result of the reading using the handleChange function in app.js
    this.fileReader.onload = () => this.props.handleChange(this.fileReader.result);
  }

  handleChange = (e) => {
    // the first of either the files or dataTransfer (cross-browser), as this component can only handle one image
    const file = (e.target.files || e.dataTransfer.files)[0];
    // provides data: image type - the type used in my API
    this.fileReader.readAsDataURL(file);
  }

  componentDidMount() {
    // componentDidMount happens after render, so the element will be available here
    this.input.addEventListener('change', this.handleChange);

    // prevent default to avoid loading image file straight into the browser
    this.dropzone.addEventListener('dragenter', (e) => e.preventDefault());
    this.dropzone.addEventListener('dragover', (e) => e.preventDefault());

    this.dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      // handleChange takes e and does the readings
      this.handleChange(e);
    });
  }

  render() {
    return (
      <div id="image">
        {/* only accepts images */}
        {/* <input type="file" accept="image/*" ref={element => this.input = element}/> */}

        <div id="file-reader" className="file has-name">
          <label className="file-label">
            <input className="file-input" type="file" accept="image/*" ref={element => this.input = element} name="resume" />
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
              Choose a file…
            </span>
          </label>
        </div>

        <div
          className="dropzone"
          // ref gets javascript element, like document getElementBy
          ref={element => this.dropzone = element}
          style={{backgroundImage: `url(${this.props.image})`}}
        ></div>
      </div>
    );
  }
}

export default Image;
