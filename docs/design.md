# PPK Services INC — Design Document

Main company: **PPK Services INC.**  
Subsidiaries (companies table):
- **PPK Farms** (`PPK-FARMS`)
- **PPK Fisheries** (`PPK-FISHERIES`)

**Palette**
- Base: `#191A19`
- Primary: `#1E5128`
- Accent-strong: `#4E9F3D`
- Accent: `#D8E9A8`

---

## 1) Architecture Overview

Monorepo with Docker Compose:

```mermaid
flowchart LR
  A[React (Vite)\nhttp://localhost:3000] -- /api/* --> B[Laravel 12 API\nhttp://localhost:8000]
  B <-- SQL --> C[(PostgreSQL 15)]
  subgraph Docker
    A
    B
    C
  end
