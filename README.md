# 📘 Food Truck Tracker

*A live, location based platform for both food truck owners and customers to find each other.*

---

## 🚀 Overview

I’m developing a Des Moines focused food truck discovery app where owners can broadcast their locations and keep profiles current through a streamlined update form. The app centralizes truck schedules and events so local foodies never miss new vendors or surprise pop ups.

---

## 🌐 Live Demo

| Type                         | Link                                                           |
| ---------------------------- | -------------------------------------------------------------- |
| **Frontend (Deployed Site)** | [https://foodtrucktrackercs195.netlify.app/](https://foodtrucktrackercs195.netlify.app/) |
| **Backend (API Base URL)**   | [https://foodtrucktracker-ng-backend.onrender.com](https://foodtrucktracker-ng-backend.onrender.com)   |



---

## ✨ Features

* Create, read, update, and delete truck listings
* Responsive UI with reusable components
* Backend API with full CRUD operations
* Data persisted in MongoDB
* Advanced feature: External API integration [tomtom API](https://www.tomtom.com/company/)
* Error handling on client + server

### **Advanced Feature**

This app uses tomtom's Map and Geocoding APIs. The map is loaded through the tomtom SDK using my personal API key to call their hosted services. The Geocoding API is fetched with an HTTPS request and API key to exchange the truck owners address for a longitude and lattitude that can be displayed on the customer map. 

---

## 📸 Screenshots
**Customer Page:**
![Customer Page](/screenshots/Final_User.png)

**Truck Owner Page:**
![Truck Owner Page](/screenshots/Final_Trucks.png)

---

## 🏗️ Project Architecture

This project uses a Vite powered React frontend and an Express/Mongoose backend to keep the user interface and stored data separate. 

```
/frontend
  /src
    /components
    App.jsx
    main.jsx

/backend
  /models
  /routes
  server.js
```
> Through REST endpoints, the React client shares data with the Express service, which adds records in MongoDB via Mongoose. Simultaneously, values are updated on the user interface with environment variables.

---

## 📦 Installation & Setup

### **1. Clone the project**

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

---

### **2. Environment Variables**

**Backend `.env.example`:**

```
MONGO_URI=your_mongodb_url
PORT=4000
```

**Frontend `.env.example`:**

```
VITE_TOMTOM_API_KEY=your_tomtom_api_key
```

---

### **3. Install Dependencies**

#### Frontend:

```bash
cd frontend
npm install
npm run dev
```

#### Backend:

```bash
cd backend
npm install
npm start
```

---

### **4. Running Entire App Locally**

1. Start backend on `http://localhost:4000`
2. Start frontend on `http://localhost:5173`
3. Confirm CORS + API requests are working

---

## 🛠 API Documentation

### GET /trucks 

Retrieves all food truck listings.

### **POST /trucks**

Creates a new food truck listing.
Body example:

```json
{
  "truckName": "Joe's Hotdogs",
  "cuisineType": "american, diner, hotdogs",
  "description": "Joe's handmade hotdogs with unlimited toppings. Buy one get one free discount through black friday.", 
  "longitude": 234.232323,
  "latitude": -78.123123,
  "openTime": "1:00 PM",
  "closeTime": "4:00 AM",
  "address": "2507 University Avenue, Des Moines, IA, 50311",
  "ownerID": 34567
}

```
>ownerID included for future account authentication purposes
### **PUT /trucks/:id**

Updates a food truck listing.

### **DELETE /trucks/:id**

Deletes a food truck listing.

---

## 🚀 Deployment Notes

### **Frontend**

* Netlify
* Environment variables (VITE_API_BASE_URL, VITE_TOMTOM_API_KEY)

### **Backend**

* Render
* Uploaded Backend .env file for environment variables (MONGODB_URI, PORT)


---

## 🎥 Video Walkthrough

**Link to YouTube Demo:**
[https://www.youtube.com/watch?v=ZUg_AMSYbiY](https://www.youtube.com/watch?v=ZUg_AMSYbiY)

Timestamps:

* **0:00–0:19** Introduction
* **0:19–1:06** Core features: Truck Owner UI
* **1:06–1:27** Advanced feature 1
* **1:27–2:39** More features
* **2:39–2:47** Core features: Customer UI
* **2:47–2:59** Advanced feature 2
* **2:59–4:15** More features
* **4:15–5:18** Technical Challenge
* **5:18–6:03** Code Walkthrough of Complex Feature
* **6:03–end** Overview of Tech Stack, Why I Chose This Tech Stack, and Outro

---

# 🧠 Reflection

### **1. What was the hardest part of this project?**

The hardest parts of this project was displaying the Map with the TomTom API and deploying the final product. Initially, I tried to use the Google Maps API, but the website gave me authentication errors during the account sign up, so I had to search for a different API. I found TomTom Maps which is a smaller company, so their documentation was not thorough and challenging to navigate. However, they had a great AI support chat that I used to search for the functions/documentation pages I needed. For deployment, the Render and Netlify issues were resolved by using the console and network tabs in Microsoft Edge DevTools. 

### **2. What are you most proud of?**

I am most proud of the understanding I have gained on how a full stack Node.js app communicates with each of its layers. This knowledge makes me more confident that I can build my own app ideas or join a startup.

### **3. What would you do differently next time?**

Next time, I would use a more established Map API, so I could have better documentation and troubleshooting. There is an error in the terminal when the map is loaded that doesn't have any effect on the display, but I was not able to figure it out with the documentation after spending a really long time trying to fix it. Also, I didn't want to keep increasing the scope, but if I had a little more time, I would add photo storage for food truck listings and a reviews database. Currently, when clicking on a food truck listing on the customer side, the pop up has a filler picture and buttons that don't function because adding functions would increase the scope a lot more. 

### **4. How did you incorporate feedback from the 12/5 check-in gallery?**

Most of the feedback I received from students after showing the app's wireframe was to try using the Google Maps API to create my desired layout. However, this did not end up working. 
Other feedback I received was to increase readibility by adding button interactivity and icons rather than a static page and text described buttons. With this advice, I added the plus, pencil, crosshairs (location), car, bookmark, and arrow (share) icons on buttons along with a slight move up hover animation for the interactive elements.  

---

# Acknowledgments / AI Usage Disclosure

Examples:

* Used the tomtom support chatbot which is built on kapa.ai to help read/navigate the documentation.
* Used VSCode Copilot to give design suggestions in App.css
