Text-to-Image Generator AI — Imaginify

Imaginify is a full-stack AI SaaS web application that transforms text prompts into stunning AI-generated images. Built with the MERN stack (MongoDB, Express, React, Node.js) and integrated with powerful AI image generation APIs, this app offers an interactive and modern platform for creative image synthesis.

**Features**
Generate AI-based images instantly from any text description
Responsive and intuitive UI built with React and Tailwind CSS
User authentication using JWT tokens
Prompt history storage for each user (MongoDB)
Option to download or share generated images
Integrated with AI APIs (e.g., OpenAI / ClipDropAI) for high-quality image generation
Deployed as a SaaS-ready full-stack project

**Tech Stack**
**Frontend**
React.js — UI framework for building interactive components
Tailwind CSS — for modern, responsive design
Axios — for API requests

**Backend**
Node.js and Express.js — REST API and server-side logic
Mongoose — MongoDB object modeling for schema design
JWT (JSON Web Token) — secure authentication
dotenv — for managing environment variables

**Database**
MongoDB Atlas — cloud-based NoSQL database

**AI Integration**
ClipDrop Image API — generates images based on text prompts

**How It Works**
The user enters a text prompt in the input field (e.g., “a cyberpunk city at sunset”)
The frontend sends this prompt to the backend API
The backend calls the AI model API to generate an image
The generated image URL is returned and displayed instantly on the UI

The user can save, download, or view previous generations from history
