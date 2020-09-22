import axios from "axios";
import "./App.css";
import React, { Component } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import $, { map } from "jquery";

class App extends Component {
  state = {
    open: false,
    // Initially, no file is selected
    selectedFile: null,
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state

    this.setState({ selectedFile: event.target.files });

    console.log("length", event.target.files.length);

    // for (let i = 0; i < event.target.files.length; i++) {
    //   console.log(event.target.files.length);
    //   console.log("i=", i);
    //   this.setState({
    //     selectedFile: [...this.state.selectedFile, event.target.files],
    //   },
    //     () => {
    //       console.log(this.state.selectedFile);
    //     });
    // }

    // $.each(event.target.files, function (key, value) {
    //   this.setState({ selectedFile: [...this.state.selectedFile, event.target.files[key]] });
    //   console.log(this.state.selectedFile);
    // });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    console.log("load fn ", this.state.selectedFile);
    let selectedloop = this.state.selectedFile;
    var divEle = [];
    if (this.state.selectedFile) {
      // console.log("selected loop length-", selectedloop.length)
      // let looparray = [];
      for (let i = 0; i < selectedloop.length; i++) {
        console.log("filename", selectedloop[i]);
        var createDiv =
          "<div className='dispfile'>" +
          i +
          "</div><div className='dispfile dispfilename'>" +
          selectedloop[i].name +
          "</div><div className='dispfile'>::</div>";

        divEle.push(createDiv);
      }
    }
    // return divEle;
    $("#FileNames").append(divEle);
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <h5>Attachments:</h5>
        <div className="card1">
          Upload files:
          <button className="attachBtn" onClick={this.onOpenModal}>
            Attach files
          </button>
          <Modal open={open} onClose={this.onCloseModal} center>
            <h2>Choose one-</h2>
            <button>Onedrive</button> or
            <input
              type="file"
              multiple
              text="attach file"
              onChange={this.onFileChange}
            />
          </Modal>
        </div>
        <div id="FileNames">{this.fileData()}</div>
      </div>
    );
  }
}

export default App;
