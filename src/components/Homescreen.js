import React, { useState, useEffect } from 'react';
import Header from "./Header"
import Sidebar from "./sideBar"
import MainContent from "./dashboard"
import TaskTable from "./task"
import Settings from "./Settings"
import '../styles/Homescreen.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const TaskMasterApp = () => {
    const [isDark, setIsDark] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Finish project report",
            priority: "High",
            status: "In Progress",
            dueDate: "2025-07-22"
        },
        {
            id: 2,
            title: "Update website design",
            priority: "Medium",
            status: "Pending",
            dueDate: "2025-07-25"
        },
        {
            id: 3,
            title: "Review team feedback",
            priority: "Low",
            status: "Completed",
            dueDate: "2025-07-20"
        },
        {
            id: 4,
            title: "Prepare presentation slides",
            priority: "High",
            status: "Pending",
            dueDate: "2025-07-23"
        }
    ]);

    // Load tasks from storage on mount
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('taskmaster-tasks') || '[]');
        if (savedTasks.length > 0) {
            setTasks(savedTasks);
        }
    }, []);

    // Save tasks to storage when tasks change
    useEffect(() => {
        localStorage.setItem('taskmaster-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const toggleTheme = () => setIsDark(!isDark);

    const toggleSidebar = () => {
        if (window.innerWidth <= 768) {
            setMobileMenuOpen(!mobileMenuOpen);
        } else {
            setSidebarCollapsed(!sidebarCollapsed);
        }
    };

    const completeTask = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: 'Completed' } : task
        ));
    };
    const progressTask = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: "In Progress" } : task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    return (
        <Router>
            <div className={`app ${isDark ? 'dark' : ''}`}>
                <Sidebar
                    collapsed={sidebarCollapsed}
                    toggleSidebar={toggleSidebar}
                    mobileOpen={mobileMenuOpen}
                />
                <Header
                    isDark={isDark}
                    toggleTheme={toggleTheme}
                    sidebarCollapsed={sidebarCollapsed}
                    toggleSidebar={toggleSidebar}
                />
                <Routes>
                    <Route path="/" element={<MainContent
                        sidebarCollapsed={sidebarCollapsed}
                        tasks={tasks}
                        onCompleteTask={completeTask}
                        onInProgressTask={progressTask}
                        onDeleteTask={deleteTask}
                        onAddTask={addTask}
                    />} />
                    <Route path="/tasks" element={<TaskTable
                        sidebarCollapsed={sidebarCollapsed}
                        tasks={tasks}
                        onCompleteTask={completeTask}
                        onDeleteTask={deleteTask}
                        onAddTask={addTask} />} />
                    <Route path="/settings" element={<Settings
                        isDark={isDark}
                        toggleTheme={toggleTheme}
                        sidebarCollapsed={sidebarCollapsed}
                        tasks={tasks}
                        onCompleteTask={completeTask}
                        onDeleteTask={deleteTask}
                        onAddTask={addTask} />} />
                </Routes>
            </div>
        </Router>

    );
};

export default TaskMasterApp;