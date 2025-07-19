import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import '../styles/Homescreen.css';
import TaskCard from "./TaskCard"
import AddTaskForm from "./TaskForm"
const MainContent = ({ sidebarCollapsed, tasks, onCompleteTask, onInProgressTask, onDeleteTask, onAddTask }) => {
    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddTask = (taskData) => {
        onAddTask(taskData);
        setShowAddForm(false);
    };

    return (
        <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="content-header">
                <h1 className="content-title">Dashboard</h1>
                <button
                    className="add-task-btn"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    <Plus size={20} />
                    Add Task
                </button>
            </div>

            <AddTaskForm
                isOpen={showAddForm}
                onSubmit={handleAddTask}
                onCancel={() => setShowAddForm(false)}
            />

            <div className="task-grid">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onComplete={onCompleteTask}
                        onInProgress={onInProgressTask}
                        onDelete={onDeleteTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainContent;