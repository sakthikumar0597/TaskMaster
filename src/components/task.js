import React, { useState } from "react";
import { Plus } from 'lucide-react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow, Paper,
    TableSortLabel, TextField
} from "@mui/material";
import AddTaskForm from "./TaskForm"
import '../styles/Homescreen.css';

const TaskTable = ({ sidebarCollapsed, tasks, onAddTask }) => {

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'status-pending';
            case 'in progress': return 'status-in-progress';
            case 'completed': return 'status-completed';
            default: return 'status-pending';
        }
    };
    const [orderBy, setOrderBy] = useState("title");
    const [order, setOrder] = useState("asc");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showAddForm, setShowAddForm] = useState(false);
    const handleSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value.toLowerCase());
        setPage(0);
    };

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const filteredTasks = tasks.filter(
        (task) =>
            task.title.toLowerCase().includes(search) ||
            task.priority.toLowerCase().includes(search) ||
            task.dueDate.includes(search) ||
            task.status.includes(search)
    );

    const sortedTasks = filteredTasks.sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        return (order === "asc" ? 1 : -1) * aValue.localeCompare(bValue);
    });

    const paginatedTasks = sortedTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const handleAddTask = (taskData) => {
        onAddTask(taskData);
        setShowAddForm(false);
    };
    return (<div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Paper sx={{ padding: 2 }}>
            <div className="content-header">
                <h1 className="content-title">Task</h1>
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
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={handleSearchChange}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {["title", "priority", "dueDate", "status"].map((col) => (
                                <TableCell key={col}>
                                    <TableSortLabel
                                        active={orderBy === col}
                                        direction={orderBy === col ? order : "asc"}
                                        onClick={() => handleSort(col)}
                                        sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                                    >
                                        {col === "title"
                                            ? "Task Title"
                                            : col === "priority"
                                                ? "Priority"
                                                : col === "dueDate"
                                                    ? "Due Date"
                                                    : "status"}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedTasks.map((task, index) => (
                            <TableRow key={index}>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.priority}</TableCell>
                                <TableCell>{task.dueDate}</TableCell>
                                <TableCell><div className={`task-status ${getStatusClass(task.status)}`}>{task.status}</div></TableCell>
                            </TableRow>
                        ))}
                        {paginatedTasks.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={filteredTasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </div>
    );
};

export default TaskTable;
