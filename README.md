<h1>Server</h1>
The server is running ExpressJS to handle API calls. API endpoints are currently defined inside <code>server/app.js</code>.
<h2>Swagger</h2>
Installed alongside ExpressJS is Swagger, used for documenting datatypes and testing API calls (not actual code testing, just for ease of development). Swagger can be reached on localhost:5000/api-docs.
Specifications (for Swagger specifically) for the data types and endpoints are inside <code>server/routes/*.js</code>

<h2>Run the server (ExpressJS)</h2>
<ol>
  <li>Clone the repository</li>
  <li>Inside <code>/server</code>, run <code>npm install</code>. This will install dependencies listed inside package.json</li>
  <li>Start the server by runnning <code>tsc app.ts; node app.js</code></li>
</ol>
The server is now listening on port 5000. Requests can be made in any way you usually make API requests (curl, Postman, etc), you can reach Swagger on localhost:5000/api-docs.

<h1>Client (React + Vite)</h1>
<ol>
  <li>To run the client, write and run <code>npm run dev</code> inside the <code>/client</code> folder (*You might have install React first? I don't know, try things).</li>
  <li>Follow the link in the terminal next to<code>Local</code> in the terminal to get to the client webpage. </li>
  <li>Typescript is compiled automatically after the client is started; no <code>tsc ...; node ...</code> needed. To compile, just save the changes in <code>App.tsx</code>. </li>
</ol>
The default port for Vite is 5173. If you expreience issues you might have to run <code>npm install --save typescript @types/node @types/react @types/react-dom @types/jest</code>.