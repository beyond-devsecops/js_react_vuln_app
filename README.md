# **Vulnerable Full-Stack Application**

## **Overview**

This is an intentionally vulnerable full-stack application built with React (frontend) and Node.js (backend). It is designed for educational purposes to demonstrate common web vulnerabilities and their exploitation.

---

## **Project Structure**

```plaintext
project/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── App.js
│   ├── index.js
│   ├── VulnerableService.js
│   ├── styles.css
│   └── ...
├── package.json
├── Dockerfile
├── docker-compose.yml
├── README.md
```


Features

Frontend Vulnerabilities

	1. Cross-Site Scripting (XSS):
	- User-provided input is rendered without sanitization.
	- Exploit: Inject a malicious script in the comment field.
	2. Insecure Local Storage:
	- Login credentials are stored in localStorage when “Remember Me” is enabled.
	- Exploit: Access stored credentials using browser developer tools.
	3. Sensitive Information in the DOM:
	- An API key is exposed in the DOM.
	- Exploit: Inspect the DOM to retrieve the key.
	4. Improper Error Handling:
	- Backend error messages are leaked to the frontend.
	- Exploit: Analyze error messages for backend implementation details.
	5. Clickjacking:
	- The app lacks X-Frame-Options, allowing embedding in an iframe.
	- Exploit: Embed the app in a malicious website to trick users into interacting with it.
	6. Excessive Client-Side Trust:
	- Form validations and restrictions are implemented only on the client side.
	- Exploit: Use browser dev tools to bypass these checks.

Backend Vulnerabilities

	1. SQL Injection:
	- User inputs are concatenated directly into SQL queries.
	- Exploit: Inject SQL commands into login fields.
	2. Hardcoded Credentials:
	- Database credentials are hardcoded in the backend.
	- Exploit: Access the source code to retrieve sensitive credentials.
	3. Weak Password Hashing:
	- MD5 is used for password hashing.
	- Exploit: Precomputed MD5 hashes (rainbow tables) can easily crack passwords.
	4. Command Injection:
	- User input is directly passed to the command line.
	- Exploit: Execute arbitrary shell commands via the /exec endpoint.
	5. File Upload Without Validation:
	- Files are saved on the server without validation.
	- Exploit: Upload malicious files that could execute on the server.
	6. Sensitive Information Exposure:
	- The /debug endpoint leaks environment variables and database credentials.
	- Exploit: Access sensitive server configuration data.

Setup Instructions

1. Prerequisites

	- Node.js (v14 or later)
	- NPM
	- MySQL (for backend database)

2. Installation

Backend

	1. Navigate to the backend/ directory:

cd backend


	2. Install dependencies:

npm install


	3. Start the server:

node index.js



Frontend

	1. Navigate to the project root (./) directory:

cd project


	2. Install dependencies:

npm install


	3. Start the React app:

npm start

3. Database Setup

	1. Create a MySQL database named testdb.
	2. Create a users table:

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


	3. Optionally, insert test data:

INSERT INTO users (username, password) VALUES ('admin', MD5('password'));

Usage

	- Access the app in your browser at http://localhost:3000.
	- Use features such as login, commenting, and file upload to explore vulnerabilities.

Demonstrating Vulnerabilities

Frontend

	1. XSS: Post a comment containing <script>alert('XSS')</script> and observe the alert.
	2. Local Storage: Check the browser’s developer tools under the “Application” tab to see stored credentials.
	3. Sensitive Data: Inspect the DOM to view the exposed API key.
	4. Clickjacking: Embed the app in an iframe and create a fake website.
	5. Error Handling: Trigger a backend error and observe the raw error messages.

Backend

	1. SQL Injection: Inject ' OR 1=1 - into the username field during login.
	2. Command Injection: Use the /exec endpoint with a query like cmd=ls.
	3. Sensitive Data Exposure: Access the /debug endpoint to view leaked environment variables.

Disclaimer

This application is intended for educational purposes only. It demonstrates how vulnerabilities can be introduced and exploited in web applications. DO NOT deploy this application in a production environment or use it for malicious purposes.
