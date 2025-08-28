# Flowpress

Flowpress is a fullstack blog application built with **Next.js**, **App Router**, **Prisma**, **PostgreSQL**, and **NextAuth**. It supports **Google authentication**, **markdown posts**, **post previews**, **likes**, and **comments**. Tailwind CSS ensures a modern, responsive design.

## Table of Contents
- [Key Features](#key-features)
- [Technical Requirements](#technical-requirements)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Google Authentication Setup](#google-authentication-setup)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Key Features
- **Authentication**: Google authentication via NextAuth.
- **Markdown Support**: Write posts using GitHub-flavored markdown.
- **Post Management**: Create, edit, preview, like, and comment on posts.
- **Database Integration**: PostgreSQL via Prisma ORM.
- **Responsive UI**: Modern, mobile-friendly design with Tailwind CSS.
- **Reusable Components**: Radix UI components like Avatar, Dropdown, Switch.
- **SEO-friendly**: Next.js App Router for optimized routing and performance.

## Technical Requirements
- **Node.js**: 20.x  
- **npm**: 9.x  
- **Next.js**: 15.5.0  
- **React**: 19.1.0  
- **Prisma**: 6.15.0  
- **PostgreSQL**: 15+  
- **Tailwind CSS**: 4.x  
- **NextAuth**: 4.24.11  

## Getting Started
Clone the repository and install dependencies:

```bash
git clone https://github.com/geraldgnika/flowpress.git
cd flowpress
npm install
```

## Database Setup
1. Install PostgreSQL if not already installed.
2. Create a new database (or use the provided Prisma-hosted database):

```sql
CREATE DATABASE flowpress;
```

3. Update the `.env` file with your database connection. Example:

```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
```

4. Apply Prisma migrations:

```bash
npx prisma migrate dev --name init
```

5. Generate Prisma client:

```bash
npx prisma generate
```

## Environment Variables
Create a `.env` file at the project root:

```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
AUTH_SECRET="YOUR_RANDOM_SECRET"
NEXTAUTH_URL="http://localhost:3000"
```

Replace placeholders with actual credentials.

## Running the Application
Start development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

For production:

```bash
npm run build
npm run start
```

## Google Authentication Setup
Follow these steps to create Google OAuth credentials:

1. **Go to Google Cloud Console**: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. **Create a project** (or select an existing one).
3. Navigate to **APIs & Services → OAuth consent screen**:
   - Choose **External** user type.
   - Fill in app name, user support email, and developer email.
   - Save and continue.
4. Navigate to **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID**:
   - Application type: **Web application**
   - Name: `Flowpress Dev` (or any name)
   - Under **Authorized redirect URIs**, add:
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - Under **Authorized JavaScript origins**, add:
     ```
     http://localhost:3000
     ```
5. Click **Create**. You will get:
   - **Client ID** → `GOOGLE_CLIENT_ID`
   - **Client Secret** → `GOOGLE_CLIENT_SECRET`
6. Add these values to your `.env` file.

## Testing
No automated tests configured. Test manually:
- Google login
- Markdown post creation and preview
- Likes and comments
- Database connection

## Contributing
Pull requests welcome. For major changes, open an issue first to discuss.

## License
MIT License © Gerald Nika