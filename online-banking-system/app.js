const express = require('express')

const dotenv = require('dotenv')
require('dotenv').config();

dotenv.config()
const app = express()

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



// Request Account Balance 
// Get Funciton
app.get("/account-balance", async (req, res)=>{
    const accountId = req.query.accountId
    if(!accountId){
        return res.status(400).send("Account ID is required")
    }
    db.query('SELECT balance FROM accounts WHERE id = ?', [accountId], (error, results)=>{
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
    const {accountId, balance, reqType} = req.body

    if(!accountId || !balance || !reqType){
        return res.status(400).send("Account ID, Balance, and Request Type are required")
    }
    // Add to Balance
    db.query('UPDATE ? SET balance = ? WHERE id = ?', [reqType, balance, accountId], (error, results)=>{
        if(error){
            console.error('Error updating account balance:', error)
        }
        if(results.affectedRows > 0){
            res.send("Account balance updated successfully")
        }else{
            res.status(404).send("Account not found")
        }
    })
    
    




})

// Request Validation of Username and Password values
// Get Function
app.get("/validate-credentials", async (req, res)=>{
    const { username, password, type, accountId} = req.query
    if(accountId === null){
        if(!username || !password){
            return res.status(400).send("Username and password are required")
        }
        const validTables = ['employees', 'customer', 'manager']
        if(!validTables.includes(type)){
            return res.status(400).send("Invalid account type")
        }
        const query = `SELECT id FROM ${type} WHERE username = ? AND password = ?`
        db.query(query, [username, password], (error, results)=>{
            if(error){
                console.error('Error validating credentials')
                return res.status(500).send("Error validating credentials")
            }

            if(results.length > 0){
                const accountId = results[0].id
                res.send({success : true, accountId})
            } else{
                res.status(401).send(false)
            }
        })
     }
     else{
        
     }
})

// Request "Account Settings" - Talk with group about this
// Get Function
app.get("/account-settings", async (req, res)=>{
    const {accountId, accType, reqType} = req.body
    if(!accountId){
        return res.status(400).send("Account ID is required")
    }
    db.query('SELECT ? FROM ? WHERE id = ?', [accType, reqType, accountId], (error, results)=>{
        if(error){
            console.error(`Error fetching ${reqType}`)
            return res.status(500).send(`Error fetching ${reqType}`)
        }
        if(results.length > 0){
            res.send(`${reqType} : ${results[0].reqType}`)
        }

    })
})

// Request Modification of "Account Settings" - Talk with group about this
// Put Function
app.put("/", async (req, res)=>{
    res.send("Hello World")
})

// Request Username value
// Get Function
app.get("/account-username", async (req, res)=>{
    const accountId = req.query.accountId
    if(!accountId){
        return res.status(400).send("Account ID is required")
    }
    db.query('SELECT customer FROM username WHERE id = ?', [accountId], (error, results)=>{
        if(error){
            console.error('Error fetching username:', error)
            return res.status(500).send("Error fetching username")
        }
        if(results.length > 0){
            res.send(`Username : ${results[0].username}`)
        }
    })
})

// Request Account ID Number
// Get Function
app.get("/account-ID", async (req, res)=>{
    const {username, password, firstName, lastName, phoneNumber, email, initialBalance} = req.body

    if(!username || !password || !firstName || !lastName || !phoneNumber || !email || !initialBalance){
        return res.status(400).send("User Information required")
    }
    /*
    db.query('SELECT customer FROM accountID WHERE id = ...'[], (error, results)=>{
        if(error){
            console.error('Error fetching accountID:', error)
            return res.status(400).send("Account ID is required")
        }
    })
    */
})

// Request Transaction History
// Get Function
app.get("/transaction-history", async (req, res)=>{
    const accountId = req.query.accountId
    if(!accountId){
        return res.status(400).send("Account ID is required")
    }
    db.query('SELECT customer FROM transactionHistory WHERE id = ?', [accountId], (error, results)=>{
        if(error){
            console.error('Error fetching transaction history:', error)
            return res.status(500).send("Error fetching transaction history")
        }
        if(results.length > 0){
            res.send(`Username : ${results[0].transactrionHistory}`)
        }
    })
})

// Request to Store New Account Information
// Post Function
app.post("/new-account", async (req, res)=>{
    const { username, password, firstName, lastName, phoneNumber, email, initialBalance} = req.body

    if(!username || !password || !firstName || !lastName || !phoneNumber || !email || !initialBalance){
        return res.status(400).send("User Information required")
    }
    db.query('INSERT INTO customer (username, password, firstName, lastName, phoneNumber, email, balance) VALUES(?, ?, ?, ?, ?, ?, ?)',
    [username, password, firstName, lastName, phoneNumber, email, initialBalance], (error, results) =>{
        if(error){
            console.error('Error creating new account:', error)
            return res.status(500).send("Error creating new account")
        }else{
            res.send({success : true})
        }

        res.status(201).send("Error creating new account")
    })
})

// Request Deletion of Account
// Delete Function
app.delete("/delete-account", async (req, res)=>{
    db.query('DELETE FROM customer WHERE accountId = ?', [accountId], (error, results)=>{
        if(error){
            console.error('Error deleting existing account')
            return res.status(500).send("Error deleting existing account")
        }
        res.send({success:true})
    })

})

app.listen(3000,()=>{
    console.log('Server is listening on port 3000')
   

})
