import { Button, Divider, Table, TableCell, TableHead, TableRow, TableBody, TextField, SelectField } from "@aws-amplify/ui-react";
import WindowWrapperEmployee from "../components/WindowWrapperEmployee";
import WindowWrapperManager from "../components/WindowWrapperManager";
import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./modal.css"; 
import axios from "axios";

const EmployeeManagement = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("ascending");
    const [employees, setEmployees] = useState([]);
    const role = sessionStorage.getItem("role")
    const [filteredSorted, setFilteredSorted] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/allAccounts-employee', {
            params: { role: 'employee' }
        })
        .then(response => {
            if (response.data.success) {
                setEmployees(response.data.accountsToDisplay || []); // Ensure it's an array
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
            } else {
                alert("Error validating credentials");
            }
        });

        
    }, []);
    useEffect(() => {
        setFilteredSorted(employees
            .filter(employees => employees.username.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => sortOrder === "ascending"
                ? a.firstName.localeCompare(b.firstName)
                : b.firstName.localeCompare(a.firstName)));
    }, [searchTerm, sortOrder, employees]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profilePic, setProfilePic] = useState('default.png'); // Set a default profile picture
    const verifyInputs = () => {
        if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email || !newEmployee.username || !newEmployee.password || !newEmployee.PhoneNumber) {
            alert("Please fill out all fields");
            return false;
        }
        else if (newEmployee.PhoneNumber.length !== 10) {
            alert("Phone number must be 10 digits");
            return false;
        }
        handleSubmit()
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const signOut = () => {
        sessionStorage.removeItem('bankID')
        navigate('/')
    }
    const generatePin = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
      };
    const deleteAccount = (bankID) => {
        axios.delete('http://localhost:4000/delete-account', {
            data: { bankID: bankID, role: 'employee' }
        })
        .then(response => {
            if (response.data.success) {
                alert("Account Deleted");
                sessionStorage.removeItem('bankID')
                window.location.reload();
            }
        })
        .catch(error => {
            alert("Error deleting account");
            console.error('Error occurred:', error);
        });

        
    }

    const generateID = () => {
        return new Promise((resolve, reject) => {
            const IDcheck = 'e' + (Math.floor(1000 + Math.random() * 9000)).toString();
            axios.get('http://localhost:4000/account-settings', {
                params: { bankID: IDcheck }
            })
            .then(response => {
                if (response.data.success) {
                    // If the ID exists, generate a new one
                    generateID().then(resolve).catch(reject);
                } else {
                    // If the ID does not exist, resolve with the new ID
                    resolve(IDcheck);
                }
            })
            .catch(error => {
                // Handle errors gracefully
                console.error('Error checking ID:', error);
                // Assuming that an error means the ID does not exist
                resolve(IDcheck);
            });
        });
    }
    const handleSubmit = () => {
        
        if (newEmployee.firstName && newEmployee.lastName && newEmployee.email && newEmployee.username && newEmployee.password && newEmployee.PhoneNumber) {
            setEmployees((prev) => [...prev, newEmployee]);
            setModalOpen(false);
            generateID().then(bankID => {axios.post('http://localhost:4000/new-account', {
                username: newEmployee.username,
                password: newEmployee.password,
                firstName: newEmployee.firstName,
                lastName: newEmployee.lastName,
                PhoneNumber: newEmployee.PhoneNumber,
                email: newEmployee.email,
                accountBalance: 0,
                bankID: bankID,
                bankPin: generatePin(),
                role: 'employee'
            })
            .then(response => {
                if (response.data.success) {
                    alert("Account Created");
                    setNewEmployee(prevState => ({
                        ...prevState,
                        bankID: response.data.bankID,
                    }));
                    window.location.reload();
                }
            })
            .catch(error => {
                alert("Error creating new account");
                console.error('Error occurred:', error);
            });
        })
        } else{
            alert("Please fill out all fields");
        }
    };
    const searchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const sortChange = (event) => {
        setSortOrder(event.target.value);
    };
    /*
    const filteredSorted = employees
    .filter(employees => employees.username.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === "ascending"
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName));
    */
    // Toggle dropdown visibility
    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const closeDropdown = () => setDropdownOpen(false);

    // Close dropdown if clicked outside
    const clickOutside = (event) => {
        const dropdown = document.getElementById('dropdown');
        const profilePicElement = document.getElementById('profile-pic');
        if (dropdown && !dropdown.contains(event.target) && !profilePicElement.contains(event.target)) {
            closeDropdown();
        }
    };

    React.useEffect(() => {
        window.addEventListener('click', clickOutside);
        return () => window.removeEventListener('click', clickOutside);
    }, []);

    return (
        <WindowWrapperManager showSideNavEmployee={true}>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", backgroundColor: 'transparent' }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h1 style={{ fontSize: "35px", color: "#57C43F", fontWeight: "bold", textAlign: "left" }}>Employee Management</h1>
                    
                    <div style={{ position: "relative", marginRight: "20px" }}>
                        <img
                            id="profile-pic"
                            src={profilePic} 
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
                                        onClick={() => navigate('/staffSettings')}
                                    >
                                        Account Settings
                                    </li>
                                    
                                    <li
                                        style={{ padding: "10px", cursor: "pointer", borderRadius: "10%" }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C1F2B0'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                                        onClick={signOut}
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
                    <TextField
                        label="Search Employees"
                        placeholder="Enter username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginRight: "20px", width: "300px" }}
                    />
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
                <Table highlightOnHover={true} style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Bank ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Bank Pin</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSorted.map((employee, index) => (
                            <TableRow key={index}>
                                <TableCell>{employee.bankID}</TableCell>
                                <TableCell>{employee.firstName}</TableCell>
                                <TableCell>{employee.lastName}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.PhoneNumber}</TableCell>
                                <TableCell>{employee.username}</TableCell>
                                <TableCell>{employee.password}</TableCell>
                                <TableCell>{employee.bankPin}</TableCell>
                                <TableCell>
                                    <Button variation="destructive" onClick={() => deleteAccount(employee.bankID)}>
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button variation="primary" onClick={() => setModalOpen(true)} style={{ marginTop: '20px', backgroundColor: '#57C43F' }}>
                    Add Employee
                </Button>

                {/* Modal for Adding Employee */}
                {modalOpen && (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <h2>Add Employee</h2>
                            <form onSubmit={verifyInputs}>
                                <TextField label="First Name" name="firstName" value={newEmployee.first} onChange={handleInputChange} className="modal-input" />
                                <TextField label="Last Name" name="lastName" value={newEmployee.last} onChange={handleInputChange} className="modal-input" />
                                <TextField label="Email" name="email" value={newEmployee.email} onChange={handleInputChange} className="modal-input" />
                                <TextField label="PhoneNumber" name="PhoneNumber" value={newEmployee.PhoneNumber} onChange={handleInputChange} className="modal-input" />
                                <TextField label="Username" name="username" value={newEmployee.username} onChange={handleInputChange} className="modal-input" />
                                <TextField label="Password" name="password" type="password" value={newEmployee.password} onChange={handleInputChange} className="modal-input" />
                                
                                <div className="modal-button-container">
                                    <Button type="submit" variation="primary">Add</Button>
                                    <Button onClick={() => setModalOpen(false)} className="modal-close">Cancel</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </WindowWrapperManager>
    );
};

export default EmployeeManagement;