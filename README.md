# Secure User Management System
This repository contains the final project for my **Cybersecurity Internship at DevelopersHub Corporation**. Over three weeks, I transformed a vulnerable web application into a hardened system by identifying and mitigating OWASP Top 10 risks.

## 🛡️ Project Overview
The goal was to implement industry-standard security measures, including input sanitization, password hashing, and advanced logging, to protect user data.

## 🚀 Implemented Security Measures
| Security Control | Method/Tool Used | Status |
| :--- | :--- | :--- |
| **Input Validation** | `validator.isEmail()` | ✅ Verified |
| **Input Sanitization** | `validator.escape()` | ✅ Verified |
| **Password Hashing** | `bcrypt` (10 Salt Rounds) | ✅ Verified |
| **Session Security** | `jsonwebtoken` (JWT) | ✅ Verified |
| **Secure HTTP Headers**| `helmet.js` | ✅ Verified (via Nmap) |
| **Advanced Logging** | `winston` | ✅ Verified (security.log) |

## 🔍 Verification & Testing
*   **Vulnerability Assessment:** Used OWASP ZAP and manual probing to identify XSS and SQL Injection flaws.
*   **Penetration Testing:** Conducted Nmap scans (`nmap -sV localhost -p 3000`) to verify that security headers (CSP, HSTS) are active.
*   **Audit Trail:** Implemented Winston to log authentication successes, failures, and malformed input attempts into `security.log`.

## 🛠️ How to Run
1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the application: `node app.js`
