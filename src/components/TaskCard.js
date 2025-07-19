import React from 'react';
import { Trash2, Check } from 'lucide-react';
import '../styles/Homescreen.css';


const TaskCard = ({ task, onComplete, onInProgress, onDelete }) => {
  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-low';
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'in progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return 'status-pending';
    }
  };

  return (
    <div className="task-card">
      <div className="task-actions">
        {task.status == "In Progress" && (
          <button
            className="task-action-btn complete"
            onClick={() => onComplete(task.id)}
            aria-label="Mark as completed"
          >
            <Check size={16} />
          </button>
        )}
        {task.status == "Pending" && (
          <button
            className="task-action-btn complete"
            onClick={() => onInProgress(task.id)}
            aria-label="Mark as completed"
          >
            <Check size={16} />
          </button>
        )}
        <button
          className="task-action-btn delete"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="task-priority">
        <div className={`priority-indicator ${getPriorityClass(task.priority)}`}></div>
        <span className="priority-text">{task.priority} Priority</span>
      </div>

      <h3 className={`task-title ${task.status === 'Completed' ? 'completed' : ''}`}>
        {task.title}
      </h3>

      <div className={`task-status ${getStatusClass(task.status)}`}>
        {task.status}
      </div>

      <div className="task-due-date">
        📅 {task.dueDate}
      </div>
    </div>
  );
};

export default TaskCard;