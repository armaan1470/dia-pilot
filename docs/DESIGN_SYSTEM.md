# DiaPilot DESIGN_SYSTEM.md

Version: 1.0 (AI Coding Edition)

## Purpose
Pixel-perfect implementation guide for DiaPilot frontend.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui ONLY
- next-intl
- RTL enabled

## Global Rules
- Mobile-only (320–430px).
- Arabic default, English secondary.
- Every UI built from shadcn primitives.
- Figma exports are the visual source of truth.

## Design Tokens (to implement in Tailwind/shadcn)
### Colors
- Primary: Teal family
- Secondary: Blue family
- Success / Warning / Danger semantic colors
- White surface background
- Light gray cards and borders

### Typography
- Arabic: Cairo
- English: Inter

### Spacing
4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64

### Radius
8 / 12 / 16 / 24 / Full

## Required Reusable Components
- PrimaryButton
- SecondaryButton
- SearchInput
- OTPInput
- ServiceCard
- ArticleCard
- AppointmentCard
- ChatBubble
- BottomNavigation
- PageHeader
- LanguageSwitcher
- EmptyState
- Skeleton loaders

Each wraps shadcn/ui primitives.

## Screen Implementation Order
1. Splash
2. Language
3. Onboarding
4. Login
5. Register
6. OTP
7. Dashboard
8. AI Chat
9. Services
10. Service Detail
11. Knowledge Base
12. Appointment Info
13. Notifications
14. Help
15. Privacy
16. Profile

## Asset References
English PNGs live in design-reference/en
Arabic PNGs live in design-reference/ar

Use PNG for layout reference and SVG for icons/illustrations.

## Pixel Perfect Checklist
- Safe area
- Typography
- Spacing
- Colors
- Radius
- Shadows
- Icon size
- RTL/LTR parity
- Loading & Empty states
- Disabled states
