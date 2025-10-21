# Screenshots Checklist — PPK Services INC

> Submission requires screenshots of **login**, **dashboard**, and **theme change**.

## Naming & Folder
- Place images in: `docs/screenshots/`
- Filenames (exact):
  - `login.png`
  - `dashboard.png`
  - `theme-change.png`  _(showing PPK Farms vs PPK Fisheries)_

> Tip: Use 1920×1080 or 1366×768. Hide browser bookmarks, open DevTools only when needed.

---

## 1) Login (`login.png`) — REQUIRED
**How to capture**
1. Go to **http://localhost:3000/**
2. Ensure the **Company** dropdown is visible with:
   - `PPK-FARMS` (PPK Farms)
   - `PPK-FISHERIES` (PPK Fisheries)
3. Keep username/password fields empty (or typed but not yet submitted).
4. Capture full visible page.

**Checkboxes**
- [ ] Company dropdown visible
- [ ] Both companies listed
- [ ] Branding colors present (base `#191A19`, primary/accent accents in the form)

---

## 2) Dashboard (`dashboard.png`) — REQUIRED
**How to capture**
1. Login as **alice / Passw0rd! / PPK-FARMS**
2. Wait for the dashboard to load.
3. Left pane must show the **module tree** (expand at least one branch).
4. Right pane should show the main welcome/card.

**Checkboxes**
- [ ] Left tree visible and readable
- [ ] At least one **Operations** or **Admin** branch expanded
- [ ] Right pane card(s) visible (consistent spacing, borders, shadows)
- [ ] No layout overflow or scroll jank

---

## 3) Theme change (`theme-change.png`) — REQUIRED
**How to capture**
1. Take two quick shots and combine (or capture one showing the second after re-login):
   - **Farms theme:** Login as **alice / PPK-FARMS**
   - **Fisheries theme:** Login as **bob / PPK-FISHERIES**
2. Show the header/background accents changing between the two.
3. Save a single image **`theme-change.png`**.  
   _If you can’t combine easily, capture the Fisheries state and ensure color change is clearly visible._

**Checkboxes**
- [ ] PPK Farms theme uses `--primary: #1E5128` and `--accent: #D8E9A8`
- [ ] PPK Fisheries theme applies correctly (same palette, company label different)
- [ ] Visual contrast remains good on both themes

**Optional verification (DevTools Console)**
```js
getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
