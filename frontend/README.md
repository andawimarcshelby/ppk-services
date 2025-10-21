# PPK Services INC — Monorepo (Laravel 12 API + React Vite + PostgreSQL + Docker)

This is a containerized full-stack app for **PPK Services INC.** with:
- **Backend:** Laravel 12 (PHP 8.3), Sanctum (Bearer tokens), PostgreSQL
- **Frontend:** React (Vite), Tailwind-style custom CSS (CSS variables), dynamic theme per company
- **DB:** PostgreSQL 15
- **Orchestration:** Docker Compose

Two companies are included:
- **PPK Farms** (`PPK-FARMS`)
- **PPK Fisheries** (`PPK-FISHERIES`)

Palette:
`#191A19` (base), `#1E5128` (primary), `#4E9F3D` (accent-strong), `#D8E9A8` (accent-soft)

---

## 1) Prerequisites

- Docker Desktop (Windows/macOS) or Docker Engine (Linux)
- Open ports: **3000** (frontend), **8000** (backend), **5432** (Postgres)
- Git (optional, for repo management)

---

## 2) Quick Start

> First clone or open this folder, then run:

```bash
# From the project root
docker compose up --build -d

# Check containers
docker compose ps
# Expect: ppk-db (healthy), ppk-backend (Up 0.0.0.0:8000), ppk-frontend (Up 0.0.0.0:3000)

# FIRST-TIME ONLY: run migrations + seeders
docker compose exec backend php artisan migrate --seed
