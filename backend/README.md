# 🟦 Pokédex Backend

This is the backend service for the Pokédex application.  
It fetches Pokémon data from the PokeAPI and returns it through a clean REST API with caching for faster repeated queries.

---

## 🚀 Features

- REST API using Express  
- Fetch Pokémon by name or ID  
- In-memory LRU cache  
- Cache expiry (TTL)  
- Error handling for invalid names  
- Fast responses on repeated searches  

---

## ▶️ Run the Backend

```bash
npm install
npm run start
The server will start at:

arduino
Copy code
http://localhost:4000
🔗 API Endpoint
pgsql
Copy code
GET /api/pokemon/:name
Examples:

bash
Copy code
/api/pokemon/pikachu
/api/pokemon/charizard
/api/pokemon/150
Returns Pokémon details + cache source.

🛠 Tech Used
Node.js

Express

Axios

Custom LRU Cache

📄 License
MIT License.