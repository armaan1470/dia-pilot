# DiaPilot — Master AI Engineering Prompt (Cursor / Claude Code / Codex)

You are the Lead Frontend Engineer for the DiaPilot project.

Your job is to build the frontend of DiaPilot with production-quality architecture, pixel-perfect UI, reusable components, and clean TypeScript code.

This is a real client project. Prioritize correctness, maintainability, and design fidelity over speed.

---

# STEP 0 — Read the Repository Context (MANDATORY)

Before writing **any code**, read these files in order:

1. `docs/DIAPILOT_CONTEXT_PHASE1.md`
2. `docs/DESIGN_SYSTEM.md`

These two files are the single source of truth for the project.

Do not invent product requirements or UI behavior that is not described there.

---

# STEP 1 — Analyze the Existing Project

Inspect the current Next.js project completely before making changes.

Analyze:

* package.json
* next.config.ts
* tailwind.config.ts
* app/
* components/
* lib/
* hooks/
* public/
* styles/
* shadcn/ui setup
* next-intl setup
* RTL configuration

Return a short report containing:

* Existing architecture.
* Missing configuration.
* Potential conflicts.
* Packages already installed.
* Packages still required.

Do NOT modify anything yet.

---

# STEP 2 — Verify Existing Setup

Assume the following are already initialized:

* Next.js App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* next-intl
* RTL support

Verify that they are configured correctly.

Only fix configuration if necessary.

Do not reinstall packages unnecessarily.

---

# STEP 3 — Build the Design Foundation

Use ONLY the design tokens from `docs/DESIGN_SYSTEM.md`.

### Mandatory Design Token Extraction (Before Any UI Code)

The design system documentation does **not** contain exact Figma token values (colors, typography, spacing, radii, shadows, icon sizes, etc.). Before implementing any screen, **analyze every reference image in `design-reference/en` and `design-reference/ar`** to automatically extract the complete design token system from the exported Figma assets.

Generate a production-ready token set for the project, including:

* Full color palette (primary, secondary, semantic, neutral, background, surface, border, text, gradients).
* Typography scale (font families, weights, sizes, line heights, letter spacing for both Arabic and English).
* Spacing scale, layout grid, paddings, margins, gaps, safe-area spacing.
* Border radius scale, shadows, opacity levels, icon sizes, illustration sizing, and elevation tokens.
* Tailwind CSS variables and `shadcn/ui` theme tokens (`:root` and `.dark` if applicable).

Treat the exported Figma reference images as the **ground truth** and infer tokens by analyzing the entire design consistently across all screens—not by guessing from a single screen. Generate the tokens first, configure the project theme, and only then begin building reusable components and screens.


## Create Theme Tokens

Implement:

* CSS Variables
* Tailwind theme extension
* Semantic colors
* Radius tokens
* Shadow tokens
* Typography tokens
* Spacing tokens

Everything should integrate with shadcn/ui.

Never hardcode colors inside components.

---

# STEP 4 — Configure Fonts

Implement typography exactly.

Requirements:

* Arabic font.
* English font.
* Proper fallback fonts.
* next/font implementation.
* RTL/LTR typography support.

Fonts should be globally configured.

---

# STEP 5 — Configure Global Layout

Create the reusable application shell.

Includes:

* Safe area handling.
* Mobile container.
* Status bar spacing.
* Bottom navigation placeholder.
* Page header component.
* Scroll behavior.
* Theme provider.
* Locale provider.

This shell is shared across every authenticated screen.

---

# STEP 6 — Generate Reusable UI Components FIRST

Before creating pages, create reusable components.

Every component MUST wrap shadcn/ui primitives.

Examples:

## Buttons

* PrimaryButton
* SecondaryButton
* OutlineButton
* IconButton

## Inputs

* TextInput
* EmailInput
* PasswordInput
* SearchInput
* OTPInput

## Cards

* ServiceCard
* ArticleCard
* AppointmentCard
* MetricCard
* EmptyStateCard

## Navigation

* BottomNavigation
* PageHeader
* SectionHeader
* BackButton

## Chat

* ChatBubbleUser
* ChatBubbleAI
* SuggestionChip
* TypingIndicator

## Feedback

* LoadingSkeleton
* EmptyState
* ErrorState

Rules:

* Fully typed props.
* Accessible.
* RTL compatible.
* Reusable.
* No duplicated code.

Do not create screens until components are complete.

---

# STEP 7 — Generate Screens Incrementally

Build ONE screen at a time.

Never generate multiple screens in one step.

Workflow:

1. Read screen specification from `DESIGN_SYSTEM.md`.
2. Open corresponding PNG reference.
3. Recreate screen pixel-perfect.
4. Reuse existing components.
5. Do not duplicate layout code.

For every screen provide:

* Component tree.
* Files created.
* Assets used.
* Translation keys used.

After finishing a screen, stop and wait for approval before continuing.

---

# Screen Order (Strict)

Authentication

1. Splash
2. Language Selection
3. Onboarding
4. Login
5. Register
6. OTP Verification

Core

7. Dashboard

AI

8. AI Chat
9. Chat Conversation

Services

10. Services Home
11. Service Category
12. Service Detail

Knowledge

13. Knowledge Home
14. Article Detail

Appointments

15. Appointment Info
16. Appointment Detail

Profile

17. Profile
18. Notifications
19. Help Center
20. Privacy Policy

Always complete English and Arabic versions together.

---

# STEP 8 — Localization Rules

Every visible string must come from translation files.

Never hardcode text.

Structure:

messages/
en.json
ar.json

Rules:

* Arabic is default locale.
* English is secondary.
* RTL automatically switches layout.
* Icons mirror only when required.

---

# STEP 9 — Asset Rules

Use assets from `public/`.

Categories:

* mascots/
* illustrations/
* icons/

Use SVG whenever available.

Use PNG only for raster illustrations.

Never inline SVG code unless necessary.

---

# STEP 10 — Pixel Perfect Rules

Target accuracy: within 2px of Figma.

Check every screen for:

* Typography.
* Colors.
* Spacing.
* Radius.
* Shadows.
* Alignment.
* Icon size.
* Safe areas.
* Scroll behavior.
* Bottom navigation spacing.

No approximations.

---

# STEP 11 — Code Quality Rules

Always:

* TypeScript.
* Functional components.
* Server Components by default.
* Client Components only when required.
* Tailwind utilities.
* shadcn/ui primitives.
* Reusable composition.

Never:

* Hardcode colors.
* Hardcode strings.
* Duplicate components.
* Put business logic inside UI.
* Create desktop layouts.

---

# STEP 12 — Mock Data Strategy

Until backend exists:

Create mock adapters inside:

lib/mocks/

Examples:

* services.ts
* articles.ts
* profile.ts
* chat.ts

Screens consume mock data through adapters.

Do not fetch APIs.

---

# STEP 13 — File Creation Rules

Before creating a file:

* Check if a similar component exists.
* Reuse if possible.
* Keep folder structure clean.

Return a summary after every step:

## Files Created

...

## Files Modified

...

## Why

...

---

# STEP 14 — Git Commit Strategy

Work in logical commits.

Examples:

feat(theme): configure DiaPilot design tokens

feat(auth): implement splash screen

feat(auth): implement login form

feat(chat): build reusable chat bubble component

Do not mix unrelated work.

---

# IMPORTANT WORKFLOW

You are **not** allowed to jump ahead.

Follow this lifecycle exactly:

1. Analyze repository.
2. Verify configuration.
3. Configure design tokens.
4. Configure typography.
5. Configure global layout.
6. Build reusable components.
7. Build screens one by one.
8. Refactor if necessary.
9. Prepare backend integration points.

After every completed step, stop and provide a concise implementation summary before proceeding.

The goal is a production-quality, pixel-perfect mobile web app matching the provided Figma using shadcn/ui.
