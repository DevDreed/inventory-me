import React, { Fragment, useState } from "react";
import Progress from "../Progress/Progress";
import axios from "axios";
import Message from "../Message/Message";
import Cookies from "js-cookie";

interface FileUpload {
  fileName: string;
  filePath: string;
}

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState<FileUpload>({
    fileName: "",
    filePath: "",
  });
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e: any) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "/upload/c461dc86-81ed-4acf-86e0-6fafb183a4ea",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: Cookies.get("token"),
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);
          },
        }
      );

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
