# 🧭 NaviGO

NaviGO is a high-performance, full-stack rental and booking platform engineered to provide real-time route calculation and seamless dispatch matching between users and fleet captains. Built with scalability in mind, it leverages a strictly typed RESTful micro-architecture and live geospatial data.

### 🚀 Live Deployments
* **Frontend Application (Vercel):** [https://navigo-one.vercel.app](https://navigo-one.vercel.app)
* **Backend API (Render):** [https://navigo-gxby.onrender.com](https://navigo-gxby.onrender.com)

---

### ✨ Key Engineering Features

* **Role-Based Access Control (RBAC):** Dual-pipeline authentication system strictly separating User and Captain data models. Secures API endpoints using stateless JSON Web Tokens (JWT) mapped to context-aware protected frontend routes.
* **Geospatial Routing Engine:** Integrates the OpenStreetMap API to dynamically calculate precise polyline routes, distances, and optimal navigation paths between dynamic coordinate pairs.
* **Cryptographic Resilience:** Implements pure-JavaScript `bcryptjs` hashing for user credentials, bypassing native C++ compilation bottlenecks to guarantee 100% thread safety across dynamic cloud deployment environments.
* **Schema-Driven Data Integrity:** Utilizes Mongoose Object Data Modeling (ODM) to enforce strict schema validation, unique indexing, and efficient querying on a highly available MongoDB Atlas cluster.
* **Asynchronous State Management:** Frontend UI state is globally managed via React's Context API, reducing prop-drilling and ensuring instantaneous UI updates across the booking lifecycle.

---

### 🏗️ System Architecture

The following diagram illustrates the strict data flow from client interaction to database storage and external API routing.

```mermaid
graph TD
    %% Professional Black and White Styling
    classDef default fill:#fff,stroke:#000,stroke-width:2px,color:#000,font-family:monospace;
    classDef db fill:#fff,stroke:#000,stroke-width:2px,color:#000,font-family:monospace,shape:cylinder;
    linkStyle default stroke:#000,stroke-width:2px;

    Client[Web Client] -->|HTTPS| FE[React Frontend]
    FE -->|RESTful API| BE[Node.js / Express Backend]
    
    BE -->|TCP / Mongoose| DB[(MongoDB Atlas)]
    BE -->|HTTP GET| OSM[OpenStreetMap API]

    class DB db;
