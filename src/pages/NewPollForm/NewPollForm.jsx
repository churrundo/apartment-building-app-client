import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pollService from "../../services/polls.service";
import "./NewPollForm.css";

function NewPollForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const navigate = useNavigate();

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const removeOption = (indexToRemove) => {
    if (options.length <= 2) return;

    const newOptions = options.filter((_, index) => index !== indexToRemove);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      options,
    };
    console.log(formData);
    await pollService.createPoll(formData);
    navigate("/polls");
  };

  return (
    <div>
      <h2>Create New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {options.map((option, index) => (
          <div key={index}>
            <label>Option {index + 1}:</label>
            <input
              type="text"
              value={option}
              placeholder="..."
              onChange={(e) => handleOptionChange(e, index)}
            />
            <button
              className="remove-button"
              onClick={() => removeOption(index)}
              disabled={options.length <= 2}
              style={
                options.length <= 2
                  ? { backgroundColor: "gray", cursor: "not-allowed" }
                  : {}
              }
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddOption}>
          Add Option
        </button>
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
}

export default NewPollForm;