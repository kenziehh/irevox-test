# irevox-test

A full-stack application built with NestJS backend and Next.js frontend, featuring Docker containerization and Prisma ORM for database management.

## Project Structure

```
irevox-test/
├── backend/          # NestJS API with Docker & Prisma
├── frontend/         # Next.js application
└── README.md
```

## Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **Docker** - Containerization
- **PostgreSQL** - Database (via Docker)

### Frontend
- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling 

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) - Package manager
- [Docker](https://www.docker.com/) & Docker Compose
- [Git](https://git-scm.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kenziehh/irevox-test.git
cd irevox-test
```

### 2. Backend Setup (NestJS)

Navigate to the backend directory:

```bash
cd backend
```

#### Environment Configuration

Copy the environment example file:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration settings.

#### Start with Docker

Build and run the backend services using Docker Compose:

```bash
docker-compose -f docker-compose.dev.yaml up --build
```

This will start:
- PostgreSQL database
- NestJS application
- Any other required services

#### Database Setup

After the Docker containers are running, set up the database:

Generate Prisma client:
```bash
pnpm prisma generate
```

Run database migrations:
```bash
npx prisma migrate dev --name init
```

> **Note:** Replace `pnpm` with `npm` or `yarn` if you're not using pnpm.

### 3. Frontend Setup (Next.js)

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

#### Environment Configuration

Copy the environment example file:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration settings.

#### Install Dependencies

```bash
pnpm install
```

#### Start Development Server

```bash
pnpm dev
```

The frontend will be available at `http://localhost:3000`

## Available Scripts

### Backend

| Command | Description |
|---------|-------------|
| `docker-compose -f docker-compose.dev.yaml up --build` | Start all services with Docker |
| `docker-compose -f docker-compose.dev.yaml down` | Stop all Docker services |
| `pnpm prisma generate` | Generate Prisma client |
| `npx prisma migrate dev` | Run database migrations |
| `npx prisma studio` | Open Prisma Studio (database GUI) |

### Frontend

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Development Workflow

1. **Start Backend**: Run Docker services and set up database
2. **Start Frontend**: Install dependencies and start dev server
3. **Development**: Both services will auto-reload on file changes
4. **Database Changes**: Use Prisma migrations for schema updates

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="your-jwt-secret"
PORT=8000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL=http://localhost:3000
```

## API Documentation

Once the backend is running, you can access:
- API endpoints at `http://localhost:8000`

## Database Management

### Prisma Commands

```bash
# Generate client after schema changes
pnpm prisma generate

# Create and run a new migration
npx prisma migrate dev --name migration_name

# Reset database (⚠️ destructive)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 8000, and 15432 are available
2. **Docker issues**: Try `docker-compose down` then `docker-compose up --build`
3. **Database connection**: Verify DATABASE_URL in backend/.env
4. **Prisma issues**: Run `pnpm prisma generate` after schema changes

### Reset Everything

```bash
# Stop all Docker containers
docker-compose -f docker-compose.dev.yaml down

# Remove volumes (⚠️ this will delete database data)
docker-compose -f docker-compose.dev.yaml down -v

# Rebuild everything
docker-compose -f docker-compose.dev.yaml up --build
```

