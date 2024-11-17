import React, { useState, useEffect } from "react";
import { Button, Divider, Table, TableCell, TableHead, TableRow, TableBody, TextField, SelectField } from "@aws-amplify/ui-react";
import WindowWrapperEmployee from "../components/WindowWrapperEmployee";
import { useNavigate } from "react-router-dom";
import "./modal.css"; // Import the CSS file

const EmployeeManagement = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("ascending");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [employees, setEmployees] = useState([
        { first: 'John', last: 'Doe', email: 'john.doe@example.com', username: 'johndoe', password: 'password123' },
        { first: 'Jane', last: 'Smith', email: 'jane.smith@example.com', username: 'janesmith', password: 'password456' },
        { first: 'Alice', last: 'Johnson', email: 'alice.johnson@example.com', username: 'alicej', password: 'password789' },
        { first: 'Bob', last: 'Davis', email: 'bob.davis@example.com', username: 'bobd', password: 'password012' },
        { first: 'Charlie', last: 'Brown', email: 'charlie.brown@example.com', username: 'charlieb', password: 'password345' },
    ]);

    const [modalOpen, setModalOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        first: "",
        last: "",
        email: "",
        username: "",
        password: "",
    });

    const searchChange = (event) => setSearchTerm(event.target.value);
    const sortChange = (event) => setSortOrder(event.target.value);

    const filteredSorted = employees
        .filter(employee => employee.username.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => sortOrder === "ascending"
            ? a.first.localeCompare(b.first)
            : b.first.localeCompare(a.first));

    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const closeDropdown = () => setDropdownOpen(false);

    const handleRemoveEmployee = (username) => {
        const confirmRemove = window.confirm(`Are you sure you want to remove the employee ${username}?`);
        if (confirmRemove) {
            alert(`Employee ${username} has been removed.`);
            setEmployees(employees.filter(employee => employee.username !== username));
        }
    };

    const clickOutside = (event) => {
        const dropdown = document.getElementById('dropdown');
        const profilePic = document.getElementById('profile-pic');
        if (dropdown && !dropdown.contains(event.target) && !profilePic.contains(event.target)) {
            closeDropdown();
        }
    };

    useEffect(() => {
        window.addEventListener('click', clickOutside);
        return () => window.removeEventListener('click', clickOutside);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newEmployee.first && newEmployee.last && newEmployee.email && newEmployee.username && newEmployee.password) {
            setEmployees((prev) => [...prev, newEmployee]);
            setModalOpen(false);
            alert("Employee added successfully!");
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <WindowWrapperEmployee showSideNavEmployee={true}>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", backgroundColor: 'transparent' }}>
                <h1 style={{ fontSize: "35px", color: "#57C43F", fontWeight: "bold" }}>Employee Management</h1>
                <Divider />
                <div style={{ marginTop: "30px", display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <TextField
                        label="Search Employees"
                        placeholder="Enter username"
                        value={searchTerm}
                        onChange={searchChange}
                        style={{ marginRight: "20px", width: "300px" }}
                    />
                    <SelectField
                        label="Sort by First Name"
                        value={sortOrder}
                        onChange={sortChange}
                        style={{ width: "150px" }}
                    >
                        <option value="ascending">A-Z</option>
                        <option value="descending">Z-A</option>
                    </SelectField>
                </div>
                <Table highlightOnHover={true} style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSorted.map((employee, index) => (
                            <TableRow key={index}>
                                <TableCell>{employee.first}</TableCell>
                                <TableCell>{employee.last}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.username}</TableCell>
                                <TableCell>{employee.password}</TableCell>
                                <TableCell>
                                    <Button
                                        variation="destructive"
                                        onClick={() => handleRemoveEmployee(employee.username)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button
                    variation="primary"
                    onClick={() => setModalOpen(true)}
                    style={{ marginTop: '20px', backgroundColor: '#57C43F' }}
                >
                    Add Employee
                </Button>

                {/* Modal for Adding Employee */}
                {modalOpen && (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <h2>Add Employee</h2>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="First Name"
                                    name="first"
                                    value={newEmployee.first}
                                    onChange={handleInputChange}
                                    className="modal-input"
                                />
                                <TextField
                                    label="Last Name"
                                    name="last"
                                    value={newEmployee.last}
                                    onChange={handleInputChange}
                                    className="modal-input"
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={newEmployee.email}
                                    onChange={handleInputChange}
                                    className="modal-input"
                                />
                                <TextField
                                    label="Username"
                                    name="username"
                                    value={newEmployee.username}
                                    onChange={handleInputChange}
                                    className="modal-input"
                                />
                                <TextField
                                    label="Password"
                                    name="password"
                                    value={newEmployee.password}
                                    onChange={handleInputChange}
                                    type="password"
                                    className="modal-input"
                                />
                                <div className="modal-button-container">
                                    <Button type="submit" variation="primary">Add</Button>
                                    <Button onClick={() => setModalOpen(false)} className="modal-close">Cancel</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </WindowWrapperEmployee>
    );
};

export default EmployeeManagement;





