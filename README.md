# Text-to-Image Generator — *Imaginify*

**Imaginify** is a full-stack MERN-based web application that enables users to **generate AI-powered images** from simple text prompts. With a clean React interface and seamless API integration, this app demonstrates the power of combining modern web technologies with cutting-edge AI image generation models.

---

## Features

* Generate **AI-based images** instantly from user-entered text prompts  
* Enter creative descriptions via a **simple, user-friendly form**  
* Get **instant visual results** generated through AI APIs  
* Store and display **prompt history** for each user  
* Secure **JWT-based authentication** for personalized access  
* Responsive web design using **Tailwind CSS**  
* Option to **download or share** generated images  

---

## Tech Stack

* **React.js** for frontend development  
* **Node.js** and **Express.js** for backend APIs  
* **MongoDB** with **Mongoose** for database management  
* **JWT (JSON Web Token)** for user authentication  
* **Axios** for API communication  
* **Tailwind CSS** for responsive styling  
* **dotenv** for environment variable management  

---

## AI Model Integration

The app integrates with an AI image generation API that accepts text prompts and produces high-quality images. Commonly used APIs include:

* **OpenAI Image Generation API**  
* **Stability AI (Stable Diffusion)**  

These APIs interpret the prompt and generate corresponding visual outputs in real time.

---

## How It Works

1. User enters a creative **text prompt** (e.g., *“A serene mountain landscape at sunset”*)  
2. The prompt is sent to the backend server via REST API  
3. The backend communicates with the **AI image generation API**  
4. The API returns a generated image URL to the backend  
5. The frontend displays the generated image instantly  
6. The prompt and image are optionally stored in MongoDB for user history  
