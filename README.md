<h1>Server</h1>
The server is running ExpressJS to handle API calls. API endpoints are currently defined inside ./app.js.
<h2>Swagger</h2>
Installed alongside ExpressJS is Swagger, used for documenting datatypes and testing API calls (not actual code testing, just for ease of development). Swagger can be reached on localhost:3000/api-docs.
Specifications (for Swagger specifically) for the data types and endpoints are inside <code>server/routes/*.js</code>

<h2>Run the server</h2>
<ol>
  <li>Clone the repository</li>
  <li>Inside <code>/server</code>, run <code>npm install</code>. This will install dependencies listed inside package.json</li>
  <li>Start the server by runnning <code>tsc app.ts; node app.js</code></li>
</ol>
The server is now listening on port 3000. Requests can be made in any way you usually make API requests (curl, Postman, etc), you can reach Swagger on localhost:3000/api-docs.

<h1>Client</h1>
TODO
