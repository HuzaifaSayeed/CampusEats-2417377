# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- none

## Week 2
- none

## Week 3
- Tool(s): Gemini
- What I asked for:
  - Fixes for Git repository errors (removing a duplicate nested `campuseats` subfolder and managing tags)[cite: 13, 14, 16].
  - Complete Week 3 React implementation: data fetching with `useEffect` in `App.jsx`, loading/error states in `Status.jsx`, `CartPage.jsx`, and form validation in `CheckoutForm.jsx`[cite: 51, 52, 53, 54, 55, 56].
  - Personal Feature 7 implementation (controlled textarea for item-level order notes in the cart) and expanding `public/api/vendors.json` to 8 menu items[cite: 51, 57].
- What I kept, changed or rejected, and why:
  - Kept all generated React components, `useEffect` cleanup handling, form validation logic, and CSS styles[cite: 49, 52, 55, 56].
  - Updated all vendor and menu item IDs to use my matric number prefix (`2417377`) to avoid key collisions[cite: 51].
- One thing the AI got wrong and how I fixed it:
  - Running `git rm -r campuseats` failed with `fatal: pathspec 'campuseats' did not match any files` because untracked files (`node_modules`) inside the subfolder were locked on disk[cite: 15, 16]. I fixed it by manually deleting the inner subfolder via Windows File Explorer before staging and committing.

