import React, { useState, useEffect } from "react";
import {
    Button,
    Divider,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    TextField,
    SelectField,
} from "@aws-amplify/ui-react";
import WindowWrapperEmployee from "../components/WindowWrapperEmployee";
import { useNavigate } from "react-router-dom";
import "./modal.css";
import ManagerAccountSettings from "./ManagerAccountSettings";

const EmployeeManagement = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("ascending");
    const [employees, setEmployees] = useState([
        { first: "John", last: "Doe", email: "john.doe@example.com", username: "johndoe", password: "password123" },
        { first: "Jane", last: "Smith", email: "jane.smith@example.com", username: "janesmith", password: "password456" },
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        first: "",
        last: "",
        email: "",
        username: "",
        password: "",
    });

    // Filter and sort employees
    const filteredEmployees = employees
        .filter((employee) =>
            employee.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) =>
            sortOrder === "ascending"
                ? a.first.localeCompare(b.first)
                : b.first.localeCompare(a.first)
        );
        const [dropdownOpen, setDropdownOpen] = useState(false);
        const [profilePic, setProfilePic] = useState("default_profile_pic.png"); // Default profile picture
    
    // Handle new employee form input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle adding a new employee
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

    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const closeDropdown = () => setDropdownOpen(false);

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

    return (
        <WindowWrapperEmployee showSideNavEmployee={true}>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", backgroundColor: "transparent" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h1 style={{ fontSize: "35px", color: "#57C43F", fontWeight: "bold", textAlign: "left" }}>Employee Management</h1>
                    <div style={{ position: "relative", marginRight: "20px" }}>
                        <img
                            id="profile-pic"
                            src="default.png"
                            alt="User Profile"
                            style={{ height: "50px", width: "50px", borderRadius: "50%", cursor: "pointer" }}
                            onClick={toggleDropdown}
                        />
                        {dropdownOpen && (
                            <div
                                id="dropdown"
                                style={{
                                    borderRadius: "10%",
                                    position: "absolute",
                                    right: 0,
                                    backgroundColor: "white",
                                    boxShadow: "0 2px 10px #FFFFFF",
                                    zIndex: 1,
                                    minWidth: "150px",
                                }}
                            >
                                <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                                    <li
                                        style={{ padding: "10px", cursor: "pointer", borderRadius: "10%" }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C1F2B0'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                                        onClick={() => navigate('/ManagerAccountSettings')}
                                    >
                                        Account Settings
                                    </li>
                                    <li
                                        style={{ padding: "10px", cursor: "pointer", borderRadius: "10%" }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C1F2B0'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                                        onClick={() => navigate('/')}
                                    >
                                        Log Out
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                
                <Divider />
                <div style={{ marginTop: "30px", display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    {/* Search Bar */}
                    <TextField
                        label="Search Employees"
                        placeholder="Enter username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginRight: "20px", width: "300px" }}
                    />

                    {/* Sort Dropdown */}
                    <SelectField
                        label="Sort by First Name"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        style={{ width: "150px" }}
                    >
                        <option value="ascending">A-Z</option>
                        <option value="descending">Z-A</option>
                    </SelectField>
                </div>

                {/* Employee Table */}
                <Table highlightOnHover={true} style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
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
                        {filteredEmployees.map((employee, index) => (
                            <TableRow key={index}>
                                <TableCell>{employee.first}</TableCell>
                                <TableCell>{employee.last}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.username}</TableCell>
                                <TableCell>{employee.password}</TableCell>
                                <TableCell>
                                    <Button
                                        variation="destructive"
                                        onClick={() =>
                                            setEmployees(employees.filter((emp) => emp.username !== employee.username))
                                        }
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
                    style={{ marginTop: "20px", backgroundColor: "#57C43F" }}
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
                                    type="password"
                                    value={newEmployee.password}
                                    onChange={handleInputChange}
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




