**BACKEND SLUTPROJEKT - GYMCLASS BOOKING API**
Projektet är ett REST API byggt med Express och TypeScript. API:et hanterar ett bokningssystem för gruppträningspass där users, istructors, locations, classes och bookings kan hanteras. Projektet använder MySQL som databas och följer en layered architecture med separation of concerns. 

**TECH STACK**
- Node.js
- Express
- TypeScript
- MySQL
- mysql2

**FUNKTIONALITET**
API:et stödjer CRUD-operationer för resurserna:
-Users
-Classes
-Instructors
-Locations
-Bookings

EX på funktionalitet:
-Hämta alla klasser
-hämta klass med id
-Skapa nya bokningar
-Uppdatera användare
-Ta bort resurser
-Visa statistik och metadata
-Visa schemalagda klasser med instruktör, lokal och antal bokningar

**INSTALLATION**
1. Klona repot
  git clone <repo-url>

2. Gå in i server-mappen
  cd backend-slutprojekt/server

3. Installera dependencies
  npm install

4. Skapa en .env-fil
   Skapa en .env i server/ och lägg till:
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=bokningssystem

5. Starta MySQL
   Se till att MySQL-servern är igång och att databasen finns skapad.

6. Bygg projektet
  npx tsc

7. Starta servern
   node dist/server.js







