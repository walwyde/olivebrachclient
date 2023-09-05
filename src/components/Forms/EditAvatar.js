import React, { useCallback, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import axios from "axios";
import FormData from "form-data";
import { connect } from "react-redux";

import { updateProfileImage } from "../../Actions/profile";

function MyDropzone({ updateProfileImage, history }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState(null);

  const handleDragEnter = useCallback(() => {
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragActive(false);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setIsDragActive(false);
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);

  const handleSubmit = () => {
    try {
      if (!file) {
        toast.warn("Please select a file");
      } else {
        const formData = new FormData();
        formData.append("avatar", file);
        updateProfileImage(formData);
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Fragment>
      <h4 className="center yellow-text">Update Profile Image</h4>
      <div
        {...getRootProps()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        style={{
          border: "2px dashed",
          padding: "20px",
          marginTop: "5rem",
          backgroundColor: isDragActive ? "lightblue" : "white",
        }}
      >
        <input {...getInputProps()} />
        {file ? (
          <p>{JSON.stringify(file.path)}</p>
        ) : isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag 'n' drop some file here, or click to select file</p>
        )}
      </div>
      <button className="btn-small yellow darken-3" onClick={handleSubmit}>
        Submit
      </button>
    </Fragment>
  );
}

MyDropzone.propTypes = {
  updateProfileImage: PropTypes.func.isRequired,
};

export default connect(null, { updateProfileImage })(MyDropzone);
