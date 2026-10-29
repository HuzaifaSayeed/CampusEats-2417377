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

## Week 4
- Tool(s): Gemini
- What I asked for:
  - Code review and verification of Week 4 components, custom hooks, context, and routes[cite: 61, 72, 88].
  - Bug fixes for vendor card route matching (`/vendor/:id`) and header `NavLink` active styling[cite: 72, 77, 108].
  - Feature 7 implementation to save and render item-level order notes on the `/orders` page.
- What I kept, changed or rejected, and why:
  - Kept all custom hooks (`useLocalStorage`, `useVendors`, `useCart`), `CartProvider`, and page components[cite: 63, 64, 67, 68].
  - Fixed route path mismatch in `VendorCard.jsx` to resolve 404 navigation errors[cite: 72, 77, 108].
- One thing the AI got wrong and how I fixed it:
  - `VendorCard.jsx` linked to `/vendors/:id` instead of `/vendor/:id`[cite: 108]. Updated the route string in `VendorCard.jsx` to match the exact route path defined in `App.jsx`[cite: 72, 77].