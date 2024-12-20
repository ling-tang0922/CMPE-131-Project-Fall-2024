const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'cmpe131project.cd4wsweu89i7.us-west-1.rds.amazonaws.com',
    user: 'Group1',
    password: 'CMPE131FrankButt',
    database: 'cmpe131_bank',
    port: '3306'
})

db.connect((err)=>{
    if(err){
        console.error('Error connecting to the database:', err)
        return
    }
    console.log('Connected to AWS RDS MySQL database')
})


// Request Validation of Credentials (Customer/Employee Login)
// Get Function
app.get('/validate-credentials-userLogin', async (req, res) => {
    const { username, password} = req.query;


    db.query('SELECT * FROM accounts WHERE username = ? AND BINARY password = ? AND role = ?', [username, password, 'manager'], (error, results) => {
        if (error) {
            console.error('Error validating credentials');
            return res.status(500).send("Error validating credentials");
        }


        if (results.length > 0) {
            return res.send({
                success: true,
                bankID: results[0].bankID,
                email: results[0].email,
                firstName: results[0].firstName,
                lastName: results[0].lastName,
                PhoneNumber: results[0].PhoneNumber,
                accountBalance: results[0].accountBalance,
                username: results[0].username,
                password: results[0].password,
                bankPin: results[0].bankPin,
                role: results[0].role,
                accountStatus: results[0].accountStatus
            });
        } else {
            db.query('SELECT * FROM accounts WHERE username = ? AND BINARY password = ? AND role = ?', [username, password, 'employee'], (error, results) => {
                if (error) {
                    console.error('Error validating credentials');
                    return res.status(500).send("Error validating credentials");
                }


                if (results.length > 0) {
                    return res.send({
                        success: true,
                        bankID: results[0].bankID,
                        email: results[0].email,
                        firstName: results[0].firstName,
                        lastName: results[0].lastName,
                        PhoneNumber: results[0].PhoneNumber,
                        accountBalance: results[0].accountBalance,
                        username: results[0].username,
                        password: results[0].password,
                        bankPin: results[0].bankPin,
                        role: results[0].role,
                        accountStatus: results[0].accountStatus
                    });
                } else {
                    db.query('SELECT * FROM accounts WHERE username = ? AND BINARY password = ? AND role = ?', [username, password, 'customer'], (error, results) => {
                        if (error) {
                            console.error('Error validating credentials');
                            return res.status(500).send("Error validating credentials");
                        }
        
        
                        if (results.length > 0) {
                            return res.send({
                                success: true,
                                bankID: results[0].bankID,
                                email: results[0].email,
                                firstName: results[0].firstName,
                                lastName: results[0].lastName,
                                PhoneNumber: results[0].PhoneNumber,
                                accountBalance: results[0].accountBalance,
                                username: results[0].username,
                                password: results[0].password,
                                bankPin: results[0].bankPin,
                                role: results[0].role,
                                accountStatus: results[0].accountStatus
                            });
                        } else {
                            return res.status(401).send({ success: false });
                        }
                    })
                }
            })
        }
    })
})


// Request Validation of Credentials (ATM Login)
// Get Function
app.get('/validate-credentials-ATMLogin', async (req,res)=>{
    const {bankID, bankPin} = req.query
    db.query('SELECT * FROM accounts WHERE bankID = ? AND bankPin = ?', [bankID, bankPin], (error, results)=>{
        if(error){
            console.error('Error validating credentials')
            return res.status(500).send("Error validating credentials")
        }
        if(results.length > 0){
            res.send({success : true, 
            bankID: results[0].bankID,
            accountBalance: results[0].accountBalance,
            bankPin: results[0].bankPin

            })
        } else{
            res.status(401).send({success: false})
        }
    })
})

// Request Account Settings
// Get Function
app.get("/account-settings", async (req, res)=>{
    ///
    const {bankID, PhoneNumber} = req.query
    ///
    db.query('SELECT * FROM accounts WHERE bankID = ? OR PhoneNumber = ?', [bankID, PhoneNumber], (error, results)=>{
        if(error){
            console.error(`Error fetching Account Settings`)
            return res.status(500).send(`Error fetching Account Settings`)
        }
        if(results.length > 0){
            res.send({
                success: true,
                bankID: results[0].bankID,
                email: results[0].email,
                PhoneNumber: results[0].PhoneNumber,
                accountBalance: results[0].accountBalance,
                username: results[0].username,
                password: results[0].password,
                transactrionHistory:  results[0].transactrionHistory,
                bankPin: results[0].bankPin,
                role: results[0].role,
                firstName: results[0].firstName,
                lastName: results[0].lastName,
                accountStatus: results[0].accountStatus
            });
            ///
        }else {
            res.send({success:false})
        }
    })
})

app.get("/account-settings-role", async (req, res)=>{
    const {role} = req.query
    db.query('SELECT * FROM accounts WHERE role = ?', [role], (error, results)=>{
        if(error){
            console.error(`Error fetching Account Settings`)
            return res.status(500).send(`Error fetching Account Settings`)
        }
        if(results.length > 0){
            res.send({
                success: true,
                bankID: results[0].bankID,
                email: results[0].email,
                PhoneNumber: results[0].PhoneNumber,
                accountBalance: results[0].accountBalance,
                username: results[0].username,
                password: results[0].password,
                transactrionHistory:  results[0].transactrionHistory,
                bankPin: results[0].bankPin,
                role: results[0].role,
                firstName: results[0].firstName,
                lastName: results[0].lastName,
                status: results[0].status
            });
        }else {
            res.status(401).send({success:false})
        }
    })
})

// Request Modification of Account Balance
// Put Function
app.put('/UpdateAccountBalance', async (req, res)=>{
    const{bankID, newBalance} = req.body
    db.query('UPDATE accounts SET accountBalance = ? WHERE bankID = ?', [newBalance, bankID], (error, results)=>{
        if(error){
            console.error('Error updating account balance:', error)
            res.status(404).send('Account not found')
        }
        
        res.send({success: true})
       
    })
})

app.put('/UpdateAccountStatus', async (req, res)=>{
    const{bankID, accountStatus} = req.body
    db.query('UPDATE accounts SET accountStatus = ? WHERE bankID = ?', [accountStatus, bankID], (error, results)=>{
        if(error){
            console.error('Error updating account status:', error)
            res.status(404).send('Account not found')
        }
        console.log('Account Status Updated')
        res.status(201).send({success: true, accountStatus: accountStatus})
       
    })

})
// Request Modification of Email
// Put Function
app.put('/UpdateEmail', async (req, res)=>{
    const{bankID, newEmail} = req.body
    db.query('UPDATE accounts SET email = ? WHERE bankID = ?', [newEmail, bankID], (error, results)=>{
        if(error){
            console.error('Error updating Email:', error)
            res.status(404).send('Account not found')
        }
        
        res.send({success: true})
       
    })
})
// Request Modification of Username
// Put Function
app.put('/UpdateUsername', async (req, res)=>{
    const{bankID, newUsername} = req.body
    db.query('UPDATE accounts SET username = ? WHERE bankID = ?', [newUsername, bankID], (error, results)=>{
        if(error){
            console.error('Error updating Username:', error)
            res.status(404).send('Account not found')
        }
        
        res.send({success: true})
       
    })
})
// Request Modification of Password
// Put Function
app.put('/UpdatePassword', async (req, res)=>{
    const{bankID, password} = req.body
    db.query('UPDATE accounts SET password = ? WHERE bankID = ?', [password, bankID], (error, results)=>{
        if(error){
            console.error('Error updating Password:', error)
            res.status(404).send('Account not found')
        }
        
        res.send({success: true, password: password})
       
    })
})
// Request Modification of Bank Pin
// Put Function
app.put('/UpdateBankPin', async (req, res)=>{
    const{bankID, newBankPin} = req.body
    db.query('UPDATE accounts SET bankPin = ? WHERE bankID = ?', [newBankPin, bankID], (error, results)=>{
        if(error){
            console.error('Error updating account balance:', error)
            res.status(404).send('Account not found')
        }
        
        res.send({success: true})
       
    })
})

app.put("/", async (req, res)=>{
    res.send("Hello World")
})

// Request Transaction History
// Get Function
app.get("/transaction-history", async (req, res)=>{
    const {bankID} = req.query
    db.query('SELECT * FROM transaction_history WHERE bankID = ?', [bankID], (error, results)=>{
        if(error){
            console.error('Error fetching transaction history:', error)
            return res.status(500).send("Error fetching transaction history")
        }
        if(results.length > 0){
           res.send({success: true, history: results})
        }
    })
})
app.get("/allAccounts-employee", async (req, res)=>{
    const {role} = req.query
    db.query('SELECT * FROM accounts WHERE role = ?',[role], (error, results)=>{
        if(error){
            console.error('Error fetching transaction history:', error)
            return res.status(500).send("Error fetching transaction history")
        }
        if(results.length > 0){
            res.send({success: true, accountsToDisplay: results})
        }
        else{
            res.send({success: false})
        }
    })
})
app.get('/checkInputs', async (req, res)=>{
    const {username, email, PhoneNumber} = req.query
    db.query('SELECT * FROM accounts WHERE username = ? OR email = ? OR PhoneNumber = ?', [username, email, PhoneNumber], (error, results)=>{
        if(error){
            console.error('Error fetching transaction history:', error)
            return res.status(500).send("Error fetching transaction history")
        }
        if(results.length > 0){
            res.send({success: false})
        }
        else{
            res.send({success: true})
        }
    })
})

app.get("/totalTransactionHistory", async (req, res)=>{
    db.query('SELECT * FROM transaction_history', (error, results)=>{
        if(error){
            console.error('Error fetching transaction history:', error)
            return res.status(500).send("Error fetching transaction history")
        }
        if(results.length > 0){
            res.send({success: true, history: results})
        }
    })
})

// Request to Store New Account Information
// Post Function
app.post("/new-account", async (req, res)=>{
    const {bankID, email, firstName, lastName, PhoneNumber, accountBalance, username, password, bankPin, role} = req.body

    db.query('INSERT INTO accounts (bankID, email, firstName, lastName, PhoneNumber, accountBalance, username, password, bankPin, role) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [bankID, email, firstName, lastName, PhoneNumber, accountBalance, username, password, bankPin, role], (error, results) =>{
        if(error){
            console.error('Error creating new account:', error)
            return res.status(500).send({error: "Error creating new account"})
        }
        res.status(201).send({success: true, bankID: bankID, PhoneNumber: PhoneNumber})
        
    })
})

app.post('/add-transaction', async (req, res)=>{
    const { transactionID, bankID, accountBalance, transaction, connectedAccount, date, type} = req.body

    db.query('INSERT INTO transaction_history (transactionID, bankID, accountBalance, transaction, connectedAccount, date, type) VALUES(?, ?, ?, ?, ?, ?, ?)',
    [transactionID, bankID, accountBalance, transaction, connectedAccount, date, type], (error) =>{
        if(error){
            console.error('Error creating new transaction record:', error)
            return res.status(500).send({error: "Error creating transaction record"})
        }
        res.status(201).send({ success: true });
        
    })
})

// Request Deletion of Account
// Delete Function
app.delete("/delete-account", async (req, res)=>{
    const{bankID, role} = req.body
    db.query('DELETE FROM accounts WHERE bankID = ? AND role = ?' , [bankID, role], (error, results)=>{
        if(error){
            console.error('Error deleting existing account')
            return res.status(500).send("Error deleting existing account")
        }
        res.send({success:true})
    })
})
app.delete('/deleteAccountHistory', async (req, res)=>{
    const {bankID} = req.body
    db.query('DELETE FROM transaction_history WHERE bankID = ?', [bankID], (error, results)=>{
        if(error){
            console.error('Error deleting existing account')
            return res.status(500).send("Error deleting existing account")
        }
        res.send({success:true})
    })
})

app.listen(4000,()=>{
    console.log('Server is listening on port 4000')
})


