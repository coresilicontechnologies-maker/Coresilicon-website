# CoreSilicon Technologies — website

A 7-page static website: Home, About, IP Catalog, Training, Updates, Quotation (enquiry form), Contact.
No server or database required — it runs from plain HTML/CSS/JS files.

## 1. How to preview it
Double-click `index.html` to open it in your browser. All pages link to each other from there.

## 2. How to publish it (free options)
Any static host works. Two easy free ones:

**Netlify (drag-and-drop)**
1. Go to https://app.netlify.com/drop
2. Drag the whole `coresilicon` folder onto the page
3. You'll get a live URL immediately; you can add a custom domain later in Netlify's settings

**GitHub Pages**
1. Create a new GitHub repository and upload all these files to it
2. In the repo, go to Settings → Pages → set the source to the `main` branch
3. GitHub gives you a live URL within a few minutes

## 3. How to publish a new "Update"
No coding needed:
1. Open `data/updates-data.js` in any text editor (Notepad, VS Code, etc.)
2. Copy one existing block (the part between `{` and `},`)
3. Paste it at the top of the list, right after `const UPDATES = [`
4. Change the `date`, `tag`, `title` and `body` text
5. Save the file and re-upload it to your host (or overwrite it if editing directly on the server)

The homepage shows the 3 most recent updates automatically; the Updates page shows all of them, newest first.

## 4. How to connect the quotation form
Right now, submitting the form on `quotation.html` opens the visitor's email app instead of sending anywhere, because it isn't connected to a real inbox yet. To make it submit silently and land in your email:

1. Go to https://formspree.io and create a free account
2. Create a new form — Formspree gives you a URL like `https://formspree.io/f/abc123`
3. Open `quotation.html`, find this line near the top of the form:
   `<form id="quotation-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
4. Replace `YOUR_FORM_ID` with the ID Formspree gave you
5. Save and re-upload the file

Formspree's free plan is enough for a small business enquiry form (50 submissions/month at time of writing — check their pricing page if you expect more).

## 5. Things to personalize before going live
Search for these placeholders across the files and replace them:
- `enquiries@coresilicon.example` → your real email (appears in the footer, contact page, and `js/main.js`)
- `+91 00000 00000` → your real phone number (footer and contact page)
- The address placeholder on `contact.html`
- The IP catalog table (`ip-catalog.html`) and course list (`training.html`) — edit the sample entries to match your actual IP cores and courses
- Company registration details, social links, etc., if you'd like to add them to the footer

## 6. File structure
```
coresilicon/
├── index.html            Home
├── about.html
├── ip-catalog.html
├── training.html
├── updates.html           Reads from data/updates-data.js
├── quotation.html         The enquiry / quotation form
├── contact.html
├── css/style.css          All styling
├── js/main.js             Nav, form handling, updates rendering
└── data/updates-data.js   Edit this file to publish updates
```
