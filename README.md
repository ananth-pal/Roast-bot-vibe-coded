# 🔥 Roast Bot

A fun web application that generates humorous roasts with adjustable intensity using OpenAI's GPT-4.

## Features

- Adjustable roast intensity slider (1-100%)
- Clean and modern UI
- Real-time roast generation
- Safe and humorous content

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- AI: OpenAI GPT-4 API

## Setup

1. Clone the repository
2. Set up the backend:
   ```bash
   cd backend
   npm install
   # Create a .env file with your OpenAI API key:
   echo "PORT=3000\nOPENAI_API_KEY=your_api_key_here" > .env
   npm run dev
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Development

- Backend development server: `npm run dev` in the backend directory
- Frontend development server: `npm run dev` in the frontend directory
- Build the backend: `npm run build` in the backend directory
- Build the frontend: `npm run build` in the frontend directory

## Environment Variables

Backend `.env` file should contain:
- `PORT`: The port number for the backend server (default: 3000)
- `OPENAI_API_KEY`: Your OpenAI API key

## License

ISC 