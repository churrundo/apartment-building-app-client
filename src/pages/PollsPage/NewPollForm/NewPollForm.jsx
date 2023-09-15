import React, { useState, useContext } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { AuthContext } from "../../../context/auth.context";
import pollService from "../../../services/polls.service";

function NewPollForm({ show, handleClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const { user } = useContext(AuthContext);
  const userId = user._id;

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
      createdBy: userId,
      buildingId: user.buildingId,
    };
    console.log(formData);
    await pollService.createPoll(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Poll</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          {options.map((option, index) => (
            <Form.Group key={index}>
              <Form.Label>Option {index + 1}</Form.Label>
              <Form.Control
                type="text"
                value={option}
                placeholder="..."
                onChange={(e) => handleOptionChange(e, index)}
              />
              <Button
                variant="danger"
                size="sm"
                className="mt-2"
                onClick={() => removeOption(index)}
                disabled={options.length <= 2}
              >
                Remove
              </Button>
            </Form.Group>
          ))}
          <Button variant="primary" className="mt-2" onClick={handleAddOption}>
            Add Option
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Poll
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewPollForm;
