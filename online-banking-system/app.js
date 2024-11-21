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
app.get('/validate-credentials-userLogin', async (req,res)=>{
    const {username, password, type, bankID, bankPin} = req.query

    db.query('SELECT bankID FROM accounts WHERE username = ? AND password = ? AND role = ?', [username, password, type], (error, results)=>{
        if(error){
            console.error('Error validating credentials')
            return res.status(500).send("Error validating credentials")
        }
        if(results.length > 0){
            res.send({success : true, bankID: results[0].bankID})
        } else{
            res.status(401).send({success: false})
        }
    })
})

// Request Validation of Credentials (ATM Login)
// Get Function
app.get('/validate-credentials-ATMLogin', async (req,res)=>{
    const {bankID, bankPin} = req.query

    db.query('SELECT bankID FROM accounts WHERE bankID = ? AND bankPin = ?', [bankID, bankPin], (error, results)=>{
        if(error){
            console.error('Error validating credentials')
            return res.status(500).send("Error validating credentials")
        }
        if(results.length > 0){
            res.send({success : true, bankID: results[0].bankID})
        } else{
            res.status(401).send({success: false})
        }
    })
})

// Request Account Settings
// Get Function
app.get("/account-settings", async (req, res)=>{
    const {bankID, PhoneNumber} = req.query
    console.log(bankID)
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
                role: results[0].role
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
// Request Modification of Email
// Put Function
app.put('/UpdateEmail', async (req, res)=>{
    const{bankID, newEmail} = req.query
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
    const{bankID, newUsername} = req.query
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
    const{bankID, newPassword} = req.query
    db.query('UPDATE accounts SET password = ? WHERE bankID = ?', [newPassword, bankID], (error, results)=>{
        if(error){
            console.error('Error updating Password:', error)
            res.status(404).send('Account not found')
        }
        
        res.send({success: true})
       
    })
})
// Request Modification of Bank Pin
// Put Function
app.put('/UpdateBankPin', async (req, res)=>{
    const{bankID, newBankPin} = req.query
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
    const {bankID, reqType} = req.query
    db.query('SELECT customer FROM transactionHistory WHERE id = ?', [bankID], (error, results)=>{
        if(error){
            console.error('Error fetching transaction history:', error)
            return res.status(500).send("Error fetching transaction history")
        }
        if(results.length > 0){
            res.send(`${results[0].transactrionHistory}`)
        }
    })
})

// Request to Store New Account Information
// Post Function
app.post("/new-account", async (req, res)=>{
    const { username, password, firstName, lastName, phoneNumber, email, initialBalance, bankID} = req.body

    db.query('INSERT INTO customer (username, password, firstName, lastName, PhoneNumber, email, balance) VALUES(?, ?, ?, ?, ?, ?, ?)',
    [username, password, firstName, lastName, phoneNumber, email, initialBalance], (error, results) =>{
        if(error){
            console.error('Error creating new account:', error)
            return res.status(500).send({error: "Error creating new account"})
        }
        res.status(201).send({success: true, bankID: results.data.accountId})
        
    })
})

// Request Deletion of Account
// Delete Function
app.delete("/delete-account", async (req, res)=>{
    db.query('DELETE FROM customer WHERE accountId = ?', [bankID], (error, results)=>{
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
