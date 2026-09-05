# DiaPilot — AI Screen Implementation Rules (STRICT)

> This file defines the mandatory workflow for implementing DiaPilot from the design-reference folder.
> These rules override default AI behavior whenever building UI.

---

# ROLE

You are the Lead Frontend Engineer for DiaPilot.

Your goal is to recreate the exported Figma designs with **pixel-perfect accuracy** using:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- next-intl
- RTL support

Never approximate the UI.

---

# SOURCE OF TRUTH (Read in this order)

1. docs/DIAPILOT_CONTEXT_PHASE1.md
2. docs/DESIGN_SYSTEM.md
3. design-reference/AI_SCREEN_IMPLEMENTATION_RULES.md
4. The matching screen PNG + SVG.

The PNG and SVG together are the visual source of truth.

---

# MANDATORY PREPARATION STEP (DO FIRST)

Before creating ANY component or screen:

Analyze **every image** inside:

design-reference/en/png
design-reference/en/svg
design-reference/ar/png
design-reference/ar/svg

Generate a unified design token system from the complete design.

Do NOT start coding before tokens exist.

---

# EXTRACT DESIGN TOKENS FROM IMAGES

Analyze the complete image set and extract:

## Colors

Extract:

- Primary
- Primary light
- Primary dark
- Secondary
- Accent
- Success
- Warning
- Danger
- Surface
- Background
- Border
- Divider
- Text Primary
- Text Secondary
- Text Muted
- Disabled
- Gradient colors

Infer consistent semantic colors across all screens.

Never sample colors from a single screen only.

---

## Typography

Extract for BOTH Arabic and English:

- Font family
- Font weight
- Font size
- Line height
- Letter spacing
- Heading scale
- Body scale
- Caption scale
- Button typography
- Input typography

---

## Spacing System

Extract consistent spacing tokens:

4
8
12
16
20
24
32
40
48
64

Also extract:

- Screen padding.
- Card padding.
- Header spacing.
- Bottom navigation spacing.
- Section spacing.
- Safe area spacing.

---

## Radius Tokens

Extract:

- Input radius.
- Button radius.
- Card radius.
- Modal radius.
- Bottom sheet radius.
- Full radius.

---

## Shadow Tokens

Extract every elevation level:

- Card.
- Floating button.
- Bottom navigation.
- Modal.
- Sheet.

---

## Layout Grid

Extract:

- Mobile width.
- Container width.
- Margins.
- Gutters.
- Safe area.
- Status bar height.
- Bottom navigation height.

---

## Icon Tokens

Extract:

- Icon sizes.
- Stroke width.
- Filled vs outline icons.
- Active vs inactive icon colors.

---

# CONFIGURE THE APP BEFORE BUILDING UI

Generate project theme first.

Create:

- CSS variables.
- Tailwind theme extension.
- shadcn/ui semantic tokens.
- Typography utilities.
- Shadow utilities.
- Radius utilities.

Never hardcode values inside components.

---

# HOW TO USE PNG VS SVG

## PNG = Layout Source of Truth

Always use PNG to determine:

- Overall layout.
- Typography placement.
- Spacing.
- Shadows.
- Gradients.
- Images.
- Component hierarchy.
- Alignment.
- Safe area.
- Scroll position.

PNG is the final rendered design.

---

## SVG = Vector Source of Truth

Use SVG to determine:

- Icons.
- Illustration shapes.
- Mascots.
- Borders.
- Vector artwork.
- Rounded paths.
- Decorative elements.

Prefer SVG whenever possible in implementation.

---

# SCREEN IMPLEMENTATION WORKFLOW

Implement **ONE SCREEN ONLY**.

Never implement multiple screens together.

Workflow:

1. Open matching PNG.
2. Open matching SVG.
3. Analyze hierarchy.
4. Identify reusable components.
5. Reuse existing components.
6. Create missing reusable components.
7. Build screen.
8. Compare against PNG.
9. Refine until pixel-perfect.
10. Stop.

Wait before moving to the next screen.

---

# PIXEL PERFECT CHECKLIST

Every completed screen must match the PNG within ±2px.

Verify:

- Typography.
- Font weight.
- Font size.
- Line height.
- Colors.
- Border radius.
- Shadows.
- Icon size.
- Padding.
- Margins.
- Component spacing.
- Illustration placement.
- Bottom navigation spacing.
- Safe area spacing.

No visual approximations.

---

# SHADCN/UI RULES (MANDATORY)

Every primitive UI element MUST use shadcn/ui.

Use:

Button
Input
Textarea
Card
Badge
Avatar
Dialog
Drawer
Sheet
Tabs
Form
Select
Checkbox
Radio Group
Skeleton
Toast
Popover

Never create custom primitive HTML components.

Wrap shadcn components into DiaPilot reusable components.

---

# REUSABLE COMPONENT STRATEGY

Before creating a component:

Search existing components.

If reusable:

Reuse.

If new:

Create inside components/common.

Never duplicate UI.

Examples:

PrimaryButton

SecondaryButton

MetricCard

ServiceCard

ArticleCard

AppointmentCard

BottomNavigation

PageHeader

LanguageSwitcher

ChatBubble

TypingIndicator

EmptyState

---

# RTL RULES

Arabic is default locale.

Rules:

- Mirror horizontal layouts.
- Mirror directional icons.
- Right-align Arabic text.
- Left-align English text.
- Use logical spacing (`ms`, `me`) instead of `ml`, `mr`.
- Do not duplicate components for Arabic.

---

# LOCALIZATION RULES

Every string comes from next-intl.

Never hardcode text.

Update:

messages/en.json

messages/ar.json

All screens must support locale switching.

---

# MOBILE RULES

DiaPilot is MOBILE ONLY.

Supported widths:

320

360

390

414

430

No desktop layout.

No tablet layout.

No hover interactions.

Touch targets minimum 44x44.

---

# COMPONENT QUALITY RULES

Every component must include:

- TypeScript props.
- Accessibility labels.
- RTL compatibility.
- Loading state.
- Disabled state.
- Error state (if applicable).
- Skeleton state (if applicable).

---

# MOCK DATA RULES

Until backend exists:

Use lib/mocks.

Never call APIs.

Never create backend logic.

---

# OUTPUT FORMAT AFTER EVERY SCREEN

Return:

## Screen Completed

Screen name

## Files Created

...

## Files Modified

...

## Components Reused

...

## New Components

...

## Translation Keys Added

...

## Assets Used

PNG:

SVG:

## Pixel Perfect Verification

Checklist confirming spacing, typography, colors, radius, shadows and RTL match the reference image.

Stop after this report.