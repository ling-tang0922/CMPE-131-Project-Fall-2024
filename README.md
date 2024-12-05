# CMPE-131-Project-Fall-2024
Team 1
# eBankify User Guide

## Home Page
The main page for this site is the homepage, promoting our services and functions. On the top of the page is the navigation bar, clicking on the logo takes you to the same homepage. The bar also contains links to the following:
- About Us
- Customer Login
- Employee Login
- ATM

---

## About Us Page
This About Us page briefly describes the creators and our purpose for creating this project.

---

## Customer Features

### Login/Sign Up Page
To access the customer login page:
1. Navigate to the top right of the homepage.
2. Click on **Customer Login**.
3. You will be directed to a page with options to log in or sign up.

**Returning Users**: 
- Enter your username and password, then click **Login** to access your dashboard.

**New Users**: 
- Provide your first and last name, username, password, email, and phone number. 
- Confirm your password twice and click **Sign Up** to view your customer dashboard.

### Customer Dashboard
Once logged in, you will be directed to your dashboard. The main dashboard provides three primary options:
- **Deposit Bills**: Deposit cash into your account.
- **Deposit Checks**: Upload checks for deposit.
- **Transfer Funds**: Send money to another eBankify account.

### Deposit Bills
To deposit cash:
1. Enter the cash amount you want to deposit.
2. Confirm the amount by typing it again.
3. Check the box to agree to the terms and conditions.
4. Click the **Deposit** button to complete the transaction.

### Deposit Check
To deposit a check:
1. Upload two images: the front and back of the check.
2. Confirm the amount written on the check.
3. Agree to the terms and conditions.
4. Click the **Deposit Check** button to finalize the deposit.

### Transfer Funds
To transfer money:
1. Enter the recipient's phone number (associated with their eBankify account).
2. Enter the amount you want to send.
3. Accept the terms and conditions.
4. Click the **Transfer Funds** button to complete the transaction.

### Transaction History
Scroll down on your dashboard to view recent transactions. To access your full transaction history, click **View Full History** or **Transaction History** in the sidebar.

### Account Settings
In the top-right corner of your dashboard, there is a drop-down menu with the following options:
- **Logout**: Log out of the customer account.
- **Account Settings**: View or update your account details, including changing your password or managing your account status.

In Account Settings:
- You can change your password by entering a new one and confirming it.
- You can open or close your bank account. If your account is open, it will display **"The account is currently open."** To close it, click **Close Account**. If successful, it will show **"The account is currently closed."** The button will change back to **Open Account** for future use.

### ATM Withdrawal
To withdraw from your account:
1. Navigate to the homepage and click **ATM** in the navigation bar.
2. Enter your Account ID and PIN using the keypad (you cannot use the keyboard).
3. Once logged in, use the keypad to select the withdrawal amount.
4. Amounts of $0.00 or greater than your account balance will not be accepted.

---

## Employee & Manager Features

### Employee Login
For employees and managers:
1. From the homepage, click **Employee Login**.
2. Enter your username and password to access your dashboard.

### Employee Dashboard
- The employee dashboard allows you to view customer information, including transaction history, and delete user accounts if needed.
- Managers have additional capabilities such as adding or removing employees from the system.

### Employee Management
Selecting the employee option on the sidebar will show the employee management page. The manager will be able to remove an employee from the dashboard and also add a new employee into the system.
The add employee pop-up will appear. The manager will input all the needed fields to make a new employee account. The employee and manager are also able to access their own user settings and able to log out using the drop-down menu.

### Account Settings for Employees
The account settings are relatively the same as a customer’s account settings. 

---

## Database Hosting
Our database is hosted through **AWS (Amazon Web Services)**, allowing for secure, remote access to store and retrieve data. We use **HeidiSQL** to manage the database, push and pull relevant information.

- The AWS database is remotely opened and closed as needed.
- An **SQL file** containing the latest database information will be provided for reference and integration.
