# DiaPilot — Phase 1 Master Context

> Version: 1.0
> Status: Source of Truth for Phase 1 Frontend

## Project Summary

DiaPilot is a bilingual (Arabic-first, English-secondary) diabetes education **mobile web application** for Saudi Arabia.

This document is the only project context an AI needs before generating code.

---

## Non-negotiable Project Rules

- Mobile web app only.
- Arabic is default language.
- English is fully supported.
- RTL/LTR support from day one.
- Frontend is completed before backend.
- Figma V2 is the visual source of truth (handled later).

---

## Phase Roadmap

### Phase 1 (Current)
Build complete standalone MVP.

Focus order:
1. Frontend UI
2. Backend APIs
3. AI integration

### Phase 2
NAFATH, RBAC, compliance.

### Phase 3
Analytics, AI safety engine, monitoring.

---

## Phase 1 Scope

### Frontend Features

- Splash Screen
- Onboarding
- Login
- OTP Verification
- Home Dashboard
- AI Chat UI
- Services Directory
- Service Detail Pages
- Knowledge Base
- Article Pages
- Appointment Information
- Profile
- Settings
- Language Switch
- Consent Screens

### Backend Context (Do NOT build yet)

- Email OTP authentication
- Services API
- Articles API
- AI Chat API
- Consent tracking
- Admin CMS

Frontend should use mock data until backend exists.

---

## Mobile-Only Architecture

Target widths:
- 320px
- 360px
- 390px (primary)
- 430px

Out of scope:
- Tablet layouts.
- Desktop layouts.

Design principles:
- Bottom navigation.
- Touch-first interactions.
- Safe-area support.
- No hover interactions.

---

## Languages & Localization

Default locale: Arabic (`ar`)

Secondary locale: English (`en`)

Rules:
- Never hardcode UI strings.
- Every string comes from translation keys.
- Layout must automatically switch RTL/LTR.

---

## Feature Inventory

### Authentication
Splash, onboarding, login, OTP.

### Dashboard
User greeting, quick actions, services, AI shortcut, health widgets.

### AI Chat
Educational chatbot interface only.

### Services
Directory of approved healthcare services.

### Knowledge Base
Educational diabetes articles.

### Appointments
Official booking information only.

### Profile
Preferences, language, consent, support.

---

## Approved Service Categories

1. Diabetes Care
2. Endocrinology
3. Eye Health & Optometry
4. Diabetic Foot Care
5. Nutrition
6. Oral Health
7. Health Education
8. Living & Coping
9. Services & Appointments
10. Support & Contact

---

## AI Safety Rules

### Allowed

- Diabetes education.
- Healthy lifestyle guidance.
- Service information.
- Appointment information.

### Forbidden

- Diagnosis.
- Medication recommendations.
- Insulin dosage changes.
- Accessing hospital records.
- Booking appointments.

### Escalate

- Severe hypoglycemia.
- Chest pain.
- Loss of consciousness.
- Serious infection or vision emergency.

---

## Frontend Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- next-intl
- React Hook Form
- Zod
- Lucide Icons

---

## Folder Architecture

```
app/
components/
features/
hooks/
lib/
types/
public/
docs/
```

### Principles

`components/` → reusable UI.

`features/` → feature-specific UI.

`lib/mocks/` → temporary frontend data.

`lib/api/` → backend adapters later.

---

## Coding Standards

Always:

- TypeScript.
- Tailwind.
- Reusable components.
- Accessibility.
- RTL compatibility.

Never:

- Hardcode strings.
- Mix business logic inside UI.
- Implement backend before requested.

---

## Data Models (Frontend)

### User

- id
- name
- language
- email

### Service

- id
- name_ar
- name_en
- description_ar
- description_en
- topics
- contact
- workingHours

### Article

- id
- title_ar
- title_en
- category
- content

### ChatMessage

- id
- role
- message
- timestamp

---

## Backend Readiness

Frontend should expose clean integration points for:

- Authentication.
- Services.
- Articles.
- AI Chat.
- Consent.
- Admin.

No real API calls until backend sprint.

---

## Definition of Done (Frontend)

Phase 1 frontend is complete when:

- Every screen from Figma V2 exists.
- English and Arabic versions work.
- RTL/LTR works everywhere.
- Mobile layouts match Figma.
- Mock data is wired.
- No backend dependency exists.

---

## AI Instructions

Whenever generating code for DiaPilot:

1. Read this document first.
2. Assume mobile-only UI.
3. Follow RTL/LTR rules.
4. Use translation keys.
5. Use reusable components.
6. Match Figma exactly.
7. Do not invent backend logic.
