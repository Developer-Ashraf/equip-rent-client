# EquipRent - Modern Equipment Rental Platform 🚜📸⚙️

> **Assignment 9 - Category 003: Equipment Rental Platform**  
> A full-stack, enterprise-grade equipment leasing platform connecting verified equipment owners with contractors, creators, and operators. Built with **Next.js 15 (App Router)**, **Tailwind CSS**, **Better-Auth**, **Express.js**, **MongoDB Atlas**, **Stripe Checkout**, and **Framer Motion**.

---

## 🌟 Key Highlights & Architectural Strengths

- **Role-Based Access Control (RBAC):** Distinct dashboards and access scopes for `Customer`, `Owner`, and `Admin`.
- **Better-Auth Integration:** Next-generation session authentication supporting password validation (uppercase, lowercase, 6+ chars) and Google OAuth with automatic `customer` role assignment.
- **Enterprise Equipment Marketplace:** Multi-parameter search, category filtering (6 categories), rental rate type (Daily, Weekly, Monthly), availability toggles, and multi-mode sorting.
- **Dynamic Rental Calculation & Booking Modal:** Automated duration math (days, weeks, months) multiplying by units and unit price.
- **Stripe Checkout Payment Flow:** Secure off-site Stripe session generation, webhook/callback verification, automatic booking state settlement to `paid`, and stock inventory decrements.
- **Comprehensive Dashboards:**
  - **Customer Hub:** Active rental bookings schedule, bookmarkable Saved Favorites, contact coordinates profile.
  - **Owner Portal:** Add new equipment, inventory catalog with edit/delete controls, incoming rental orders, Recharts revenue analytics.
  - **Admin Console:** User role management, equipment moderation & approval/rejection pipeline, global rental transaction ledger, platform-wide GMV analytics.
- **Framer Motion Animations:** Smooth layout transitions across Hero banner, interactive category cards, and equipment grids.
- **Ultra-Responsive & Modern Design:** Modern industrial aesthetic with Tailwind CSS, custom status badges, and mobile-friendly layouts.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | [Next.js 15](https://nextjs.org/) (App Router, Server & Client Components) |
| **Styling & Icons** | [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) |
| **Authentication** | [Better-Auth](https://better-auth.com/) + `@better-auth/mongo-adapter` |
| **Visualizations & Motion** | [Recharts](https://recharts.org/), [Framer Motion](https://www.framer.com/motion/) |
| **Notifications** | [React Hot Toast](https://react-hot-toast.com/) |
| **Payments** | [Stripe](https://stripe.com/) Checkout API |
| **Backend API** | [Express.js](https://expressjs.com/), [MongoDB Native Driver](https://www.mongodb.com/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) Cluster |

---

## 📁 Project Structure

```bash
equip-rent-client/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── all-equipment/       # Marketplace with search & filters
│   │   ├── equipment/[id]/      # Protected detail view & booking modal
│   │   ├── checkout/success/    # Stripe verification handler
│   │   ├── dashboard/
│   │   │   ├── customer/        # Rentals, Favorites, Profile
│   │   │   ├── owner/           # Inventory, Add, Edit, Orders, Analytics
│   │   │   └── admin/           # Users, Approvals, Ledger, Platform Analytics
│   │   ├── about/
│   │   ├── contact/
│   │   ├── unauthorized/
│   │   ├── not-found.tsx
│   │   ├── loading.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx             # Dynamic Landing Page
│   ├── components/
│   │   ├── layout/              # Navbar, Footer
│   │   ├── home/                # Hero, Categories, Featured, Reviews, Extra
│   │   ├── equipment/           # EquipmentCard, BookingModal
│   │   └── dashboard/           # DashboardSidebar, DashboardHeader, ProfileClient
│   ├── lib/
│   │   ├── auth.ts              # Better-Auth server config
│   │   ├── auth-client.ts       # Better-Auth client hooks
│   │   ├── server.ts            # getSession & authFetch utilities
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── public/
├── package.json
└── tailwind.config.js
```

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root of `equip-rent-client`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=equiprent_super_secret_auth_key_2026_secure
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB_URI=mongodb://<db_username>:<db_password>@ac-m0gvdxt-shard-00-00.i3lu0gl.mongodb.net:27017,ac-m0gvdxt-shard-00-01.i3lu0gl.mongodb.net:27017,ac-m0gvdxt-shard-00-02.i3lu0gl.mongodb.net:27017/equip_rent_db?ssl=true&replicaSet=atlas-ccvxfd-shard-0&authSource=admin&retryWrites=true&w=majority
DB_NAME=equip_rent_db
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
```

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 🔒 Security & Route Protection

- Protected routes (`/equipment/[id]`, `/dashboard/*`) verify session server-side with `getSession()` and redirect unauthenticated users to `/login?callbackUrl=...`.
- Role verification ensures customers cannot access owner/admin tabs, displaying a polished `403 Unauthorized` page if breached.
- Sensitive payment tokens are validated against Stripe APIs on callback.

---

## 👨‍💻 Author
- **Developer:** Ashraful Islam
- **GitHub:** [@Developer-Ashraf](https://github.com/Developer-Ashraf)
- **Repository:** [equip-rent-client](https://github.com/Developer-Ashraf/equip-rent-client)
