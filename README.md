# 🚗 NaviGo - Your Personal Ride-Hailing Platform

> Hey there! Welcome to NaviGo - a ride-hailing app that's like Uber or Ola, but built by you! This guide will walk you through everything, even if you're completely new to coding. Don't worry, we've got your back! 😊


### Live Deployments
* **Frontend Application (Vercel):** [https://navigo-one.vercel.app](https://navigo-one.vercel.app)
* **Backend API (Render):** [https://navigo-gxby.onrender.com](https://navigo-gxby.onrender.com)

---

### System Architecture

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
