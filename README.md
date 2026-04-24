# 🚀 Full Stack Project – BFHL API

<p align="center">
  <b>Hierarchy Builder & Data Processing System</b><br/>
  Built using Node.js, Express & Vanilla JavaScript
</p>

<p align="center">
  🌐 <a href="https://ornate-malabi-57f846.netlify.app">Live Frontend</a> •
  🔗 <a href="https://bfhl-full-stack-project-1-n258.onrender.com">Backend API</a>
</p>

---

## ✨ Overview

This project is a Full Stack Application that processes hierarchical relationships from input data and returns structured insights such as trees, cycles, invalid entries, and summary analytics.

---

## 🚀 Live Demo

| 🔹 Component | 🔗 Link |
|------------|--------|
| Frontend | https://ornate-malabi-57f846.netlify.app |
| Backend | https://bfhl-full-stack-project-1-n258.onrender.com |

---

## 🧠 Features

- Accepts node relationships like `A->B`
- Validates input format (A–Z only)
- Removes duplicate edges
- Detects cycles in graph
- Builds hierarchical tree structure
- Calculates depth of trees
- Returns structured JSON output
- Displays invalid entries and duplicate edges
- Provides summary insights
- Interactive frontend UI

---

## 🛠 Tech Stack

| Layer | Technology |
|------|-----------|
| Backend | Node.js, Express.js |
| Frontend | HTML, CSS, JavaScript |
| Tools | VS Code, Thunder Client |
| Deployment | Render (Backend), Netlify (Frontend) |

---

## 📡 API Details

### Endpoint
POST /bfhl

### 🔹 Full API URL
https://bfhl-full-stack-project-1-n258.onrender.com/bfhl

---

### Sample Request
```json
{
  "data": ["A->B","A->C","B->D","A->B","hello"]
}
Sample Response
JSON

{
  "user_id": "nivethithasivaraj_04112005",
  "email_id": "ns1840@srmist.edu.in",
  "college_roll_number": "RA2311026050083",
  "hierarchies": [...],
  "invalid_entries": ["hello"],
  "duplicate_edges": ["A->B"],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}
⚙️ Run Locally
Bash

git clone https://github.com/Nive4/bfhl-full-stack-project.git
cd bfhl-full-stack-project
npm install
node index.js
Open:
index.html

📸 UI Preview
Clean, responsive, and user-friendly interface designed with a light theme and structured layout for better usability.

🎯 What This Project Demonstrates
Full Stack Development (Frontend + Backend)

REST API Design

Graph & Tree Data Processing

Input Validation & Error Handling

Deployment and Hosting

Clean UI/UX Design

👩‍💻 Author
Nivethitha Sivaraj
📧 ns1840@srmist.edu.in
🎓 RA2311026050083

🙏 Acknowledgement
This project was developed as part of a Full Stack Engineering Challenge.
It provided an opportunity to apply concepts of backend development, API design, and frontend integration in a real-world scenario.

❤️ Final Note
This project reflects my understanding of full stack development and structured data processing.

⭐ If you found this project useful, feel free to give it a star!



---

# ✅ DONE

Just paste → commit → push:

```bash
git add README.md
git commit -m "final README"
git push
