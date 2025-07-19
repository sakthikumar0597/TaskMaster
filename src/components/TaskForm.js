import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem
} from '@mui/material';

const AddTaskForm = ({ isOpen, onSubmit, onCancel }) => {
  const today = new Date().toISOString().split("T")[0]
  const [formData, setFormData] = useState({
    title: '',
    priority: 'Medium',
    dueDate: ''
  });

  const handleSubmit = () => {
    if (!formData.title.trim()) return;

    onSubmit({
      ...formData,
      id: Date.now(),
      status: 'Pending'
    });

    setFormData({ title: '', priority: 'Medium', dueDate: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={isOpen} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent dividers>
        <TextField
          margin="dense"
          label="Task Title"
          name="title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          label="Priority"
          name="priority"
          select
          fullWidth
          value={formData.priority}
          onChange={handleChange}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          label="Due Date"
          name="dueDate"
          type="date"
          fullWidth
          value={formData.dueDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: today,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskForm;

