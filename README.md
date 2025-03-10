<h1>Cryptalk</h1>
Cryptalk consists of two components, frontend and backend. We currently have two branches, main and local. Main is configured to listen on https://cryptalk.nettervik.se, while local is configured for http://localhost.

<h2>Backend</h2>
The backend/server is running ExpressJS with TypeScript on port 5000.

<h3>Run the server</h3>
<ol>
  <li>Clone the repository.</li>
  <li>Inside <code>/server</code>, run <code>npm install</code>. This will install dependencies listed inside package.json</li>
  <li>Start the server by runnning <code>npm run build; node run start</code>.</li>
</ol>

The server is now reachable on localhost:5000. Swagger is installed and reachable on localhost:5000/api-docs, however the endpoint and schemas are outdated.

<h2>Frontend</h2>
The frontend is running React with Vite.

<h3>Run the frontend</h3>
<ol>
  <li>Clone the repository.</li>
  <li>Inside <code>/client</code>, run <code>npm install</code>.</li>
  <li>Launch the app by running <code>npm run dev</code>. Alternatively build it with <code>npm run build</code> and then <code>npm run preview</code>.</li>
  <li>Browse the app by clicking the link in the terminal, <code>http://localhost:xxxx</code>.</li>
</ol>
