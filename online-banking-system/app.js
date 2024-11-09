const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

// static assets
app.use(express.static('./src')) // This will load up the website
// parse for data
app.use(express.urlencoded({extended:false}))
// parse json
app.use(express.json())

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

db.connect((err)=>{
    if(err){
        console.error('Error connecting to the database:', err)
        return
    }
    console.log('Connected to AWS RDS MySQL database')
})

// Request Account Balance 
// Get Funciton
app.get("/account-balance", async (req, res)=>{
    const accountId = req.query.accountId
    if(!accountId){
        return res.status(400).send("Account ID is required")
    }
    db.query('SELECT customer FROM accounts WHERE id = ?', [accountId], (error, results)=>{
        if(error){
            console.error('Error fetching account balance:', error)
            return res.status(500).send("Error fetching account balance")
        }
        if(results.length > 0){
            res.send(`Account Balance : ${results[0].balance}`)
        }
    })
})

// Request Modification of Account Balance
// Put Function
app.put("/account-balance", async (req, res)=>{
    const { accountId, newBalance} = req.body

    if(!accountId || newBalance === undefined){
        return res.status(400).send("Account ID and new balance are required")
    }

    db.query('UPDATE customer SET balance = ? WHERE id = ?' [newBalance, accountId], (error, results) =>{
        if (error){
            console.error('Error updating account balance:', error)
            return res.status(500).send("Error updating account balance")
        }

        if(results.affectedRows > 0){
            res.send("Account balance updated successfully")
        } else{
            res.status(404).send("Account not found")
        }
    })
})

// Request Validation of Username and Password values
// Get Function
app.get("/validate-credentials", async (req, res)=>{
    const { username, password, type} = req.query

    if(!username || !password){
        return res.status(400).send("Username and password are required")
    }

    db.query('SELECT * FROM ? WHERE username = ? AND password = ?', [type, username, password], (error, results)=>{
        if(error){
            console.error('Error validating credentials')
            return res.status(500).send("Error validating credentials")
        }

        if(results.length > 0){
            res.send("Credentials are valid")
        } else{
            res.status(401).send("Invalid credentials")
        }
    })
})

// Request "Account Settings" - Talk with group about this
// Get Function
app.get("/", async (req, res)=>{
    res.send("Hello World")
})

// Request Modification of "Account Settings" - Talk with group about this
// Put Function
app.put("/", async (req, res)=>{
    res.send("Hello World")
})

// Request Username value
// Get Function
app.get("/account-username", async (req, res)=>{
    res.send("Hello World")
})

// Request Account ID Number
// Get Function
app.get("/account-ID", async (req, res)=>{
    res.send("Hello World")
})

// Request Account Balance Value
// Get Function
app.get("/account-balance", async (req, res)=>{
    res.send("Hello World")
})

// Request Transaction History
// Get Function
app.get("/transaction-history", async (req, res)=>{
    res.send("Hello World")
})

// Request to Store New Account Information
// Post Function
app.post("/new-account", async (req, res)=>{
    const { username, password, initialBalance = 0} = req.body

    if(!username || !password){
        return res.status(400).send("Username and password are required")
    }
    db.query('INSERT INTO customer (username, password, balance) VALUES(?, ?, ?)',
    [username, password, initialBalance], (error, results) =>{
        if(error){
            console.error('Error creating new account:', error)
            return res.status(500).send("Error creating new account")
        }

        res.status(201).send("Error creating new account")
    })
})

// Request Deletion of Account
// Delete Function
app.delete("/delete-account", async (req, res)=>{
    res.send("Hello World")
})

app.listen(5001,()=>{
    console.log('Server is listening on port 5001')
})
