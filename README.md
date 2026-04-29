# Salon & Restaurant Booking System
## Full Stack: React.js + Spring Boot + MySQL

---

## Project Structure

```
/
├── salon-website/          → React frontend (Port 3000)
├── resto-website/          → React frontend (Port 3001)
└── springboot-backend/     → Spring Boot API (Port 8080)
```

---

## Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18+ | https://nodejs.org |
| Java JDK | 17+ | https://adoptium.net |
| Maven | 3.8+ | https://maven.apache.org |
| MySQL | 8.0+ | https://dev.mysql.com |

---

## Step 1 — Setup MySQL Database

```sql
-- Open MySQL Workbench or terminal:
mysql -u root -p

-- Enter password: root1234

-- Create the database (Spring Boot will auto-create tables)
CREATE DATABASE IF NOT EXISTS booking_db;
USE booking_db;
EXIT;
```

---

## Step 2 — Configure Backend

Edit `springboot-backend/src/main/resources/application.properties`:

```properties
# Your MySQL password (already set to root1234)
spring.datasource.password=root1234

# Set up Gmail for sending emails:
# 1. Go to Google Account → Security → 2-Step Verification → App Passwords
# 2. Create app password for "Mail"
# 3. Paste the 16-character password below
spring.mail.username=your_gmail@gmail.com
spring.mail.password=xxxx xxxx xxxx xxxx

app.mail.from=your_gmail@gmail.com
```

---

## Step 3 — Start Spring Boot Backend

```bash
cd springboot-backend

# Build and run
mvn spring-boot:run

# You should see:
# Started BookingApplication on port 8080
# Tables auto-created in MySQL
```

Test the API:
```
http://localhost:8080/api/health
→ {"status":"UP","service":"Booking API"}
```

---

## Step 4 — Start Salon Website

```bash
cd salon-website
npm install
npm start

# Opens: http://localhost:3000
```

### Salon Website Pages:
| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Services | http://localhost:3000/services |
| Book Appointment | http://localhost:3000/booking |
| Gallery | http://localhost:3000/gallery |
| Contact | http://localhost:3000/contact |
| **Admin Panel** | **http://localhost:3000/admin** |

Admin login: `admin` / `admin123`

---

## Step 5 — Start Restaurant Website

```bash
cd resto-website
npm install
npm start

# Opens: http://localhost:3001
```

### Restaurant Website Pages:
| Page | URL |
|------|-----|
| Home | http://localhost:3001 |
| Menu | http://localhost:3001/menu |
| Reserve Table | http://localhost:3001/reservation |
| Gallery | http://localhost:3001/gallery |
| Contact | http://localhost:3001/contact |
| **Admin Panel** | **http://localhost:3001/admin** |

Admin login: `admin` / `admin123`

---

## API Endpoints

### Bookings (Salon)
```
POST   /api/bookings              → Create appointment
GET    /api/bookings              → List all (add ?type=salon)
GET    /api/bookings/{id}         → Get single booking
PATCH  /api/bookings/{id}/confirm → Confirm booking
PATCH  /api/bookings/{id}/cancel  → Cancel booking (body: {"reason":"..."})
PATCH  /api/bookings/{id}/complete→ Mark as completed
GET    /api/bookings/slots?date=2026-04-28&type=salon → Get booked time slots
```

### Reservations (Restaurant)
```
POST   /api/reservations          → Create table reservation
GET    /api/bookings?type=restaurant → List restaurant reservations
```

### Contact
```
POST   /api/contact               → Submit contact form
GET    /api/contact               → List all messages (admin)
```

### Example POST /api/bookings (Salon)
```json
{
  "name": "Jane Smith",
  "email": "jane@email.com",
  "phone": "+1 602 555 0001",
  "date": "2026-05-01",
  "time": "2:00 PM",
  "service": "Full Balayage ($185)",
  "businessType": "salon",
  "notes": "First visit, allergic to ammonia"
}
```

### Example POST /api/reservations (Restaurant)
```json
{
  "name": "Marco Rossi",
  "email": "marco@email.com",
  "phone": "+61 4XX 000 001",
  "date": "2026-05-01",
  "time": "7:00 PM",
  "guests": "4",
  "occasion": "Anniversary",
  "requests": "Window seat if possible"
}
```

---

## Email System (Free — Gmail SMTP)

How it works:
1. Customer books → **confirmation email** sent instantly to customer
2. Customer books → **notification email** sent to business owner
3. Every day at 9 AM → **reminder email** sent to all confirmed bookings for tomorrow
4. Admin cancels → **cancellation email** sent to customer

Setup Gmail App Password:
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to App Passwords → Generate for "Mail"
4. Copy the 16-character password into application.properties

---

## Tech Stack Summary

| Layer | Technology | Free? |
|-------|-----------|-------|
| Salon Frontend | React.js 18 | ✅ Free |
| Restaurant Frontend | React.js 18 | ✅ Free |
| Backend API | Spring Boot 3.2 | ✅ Free |
| Database | MySQL 8 | ✅ Free |
| Email | Gmail SMTP | ✅ Free (500/day) |
| Hosting Frontend | Vercel | ✅ Free |
| Hosting Backend | Railway.app or Render.com | ✅ Free tier |

---

## Deployment (Live Demo for Clients)

### Frontend → Vercel (Free)
```bash
# Salon
cd salon-website
npm install -g vercel
vercel --prod

# Restaurant
cd resto-website
vercel --prod
```

### Backend → Railway.app (Free)
1. Push code to GitHub
2. Go to railway.app → New Project → Deploy from GitHub
3. Add environment variables (copy from application.properties)
4. Railway provides a free MySQL database too

---

## Customising for a Real Client (3-5 days)

1. **Change business name** → Search & replace "Glow Studio" or "The Corner Table"
2. **Change colors** → Edit CSS variables in `global.css` (2 lines)
3. **Change photos** → Replace Unsplash URLs with client's photos
4. **Change services/menu** → Edit the arrays in `Services.js` or `Menu.js`
5. **Change location/hours** → Edit text in `Home.js`, `Footer.js`, `Contact.js`
6. **Change email** → Update `application.properties`

**Total customisation time: 4–6 hours per client.**

---

## Demo URLs to Share with Prospects

After deploying to Vercel, send prospects:
- Salon demo: `https://salon-demo.vercel.app`
- Restaurant demo: `https://resto-demo.vercel.app`

In your pitch: *"Here is exactly what your business will look like in 5 days."*
