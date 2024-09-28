import React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
function Decode() {
  const [file, setFile] = useState(null);
  const [text, setDecodedText] = useState("");
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
    rejectedFiles,
  } = useDropzone({
    onDrop: (acceptedFile) => handleDrop(acceptedFile),
    minSize: 0,
    maxSize: 209715200,
  });

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const reset = () => {
    e.preventDefault();
    setFile(null);
    setText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to decode.");
      return;
    }
    alert("Decoding has been started.\nPlease Wait......")

    // Perform decoding logic here
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://127.0.0.1:5000/decode", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        setDecodedText(data);
      })
      .catch((error) => console.error("Error:", error));
      
  };
  function handleDrop(acceptedFile) {
    console.log("Uploaded files:", acceptedFile);
    if (acceptedFile) {
      if (acceptedFile.length > 1 && !(text === "")) {
        alert("More than (1) file ");
      } else {
        setFile(acceptedFile[0]);
      }
    }
  }

  return (
    <>
      <div className="w-full  h-full flex justify-around items-center">
        <div className="dropbox shadow-xl shadow-slate-300 rounded-3xl p-7">
          <div
            className="w-98  flex flex-col justify-center cursor-pointer items-center p-5 gap-2 h-80 relative border-dashed border-2 border-slate-900  rounded-3xl"
            {...getRootProps()}
          >
            {!file ? (
              <img
                className="h-3/4"
                src="/image-add-line.svg"
                alt=""
                draggable="false"
              />
            ) : (
              <img
                src={URL.createObjectURL(file)}
                alt="Selected File"
                className="h-3/4"
              />
            )}
            <input
              type="file"
              name="file"
              id="fileInput"
              {...getInputProps}
              style={{ display: "none" }}
            />
            <div className="text-center">
              {isDragActive ? (
                <p className="dropzone-content">
                  Release to drop the files here
                </p>
              ) : (
                <p className="dropzone-content">
                  Drag and drop files here, or click to select files
                </p>
              )}
              {isDragReject && "Cant accept the file"}
            </div>
          </div>
        </div>
        <div>
          <form className="flex flex-col gap-3 ">
            <div className="flex flex-col">
              <label htmlFor="" className="font-bold">
                Decoded Text
              </label>
              <textarea
                rows="8"
                cols="50"
                className="border-2 text-center resize-none focus:outline-none focus:border-[#C77BF2] border-[#C77BF2] "
                placeholder="Your hidden text will be shown here"
                value={text}
                onChange={(e) => handleTextChange(e)}
              ></textarea>
            </div>
            <div className="flex justify-around">
              <input
                className=" bg-[#C77BF2] py-2 px-3 cursor-pointer rounded-lg font-bold text-xl"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              />
              <button
                className=" bg-[#C77BF2] cursor-pointer py-2 px-3 rounded-lg font-bold text-xl"
                onClick={() => reset()}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Decode;
