# Collecting RSVPs in a Google Sheet

Ten minutes, free, no third party, and the data stays in your Google Drive.

## Steps

1. Create a new Google Sheet. Call it something like *Wedding RSVPs*.
2. In that sheet: **Extensions → Apps Script**.
3. Delete the placeholder code, paste in everything from `Code.gs`, save.
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy, approve the permissions prompt.
5. Copy the Web App URL. It looks like
   `https://script.google.com/macros/s/AKfy.../exec`
6. Open `assets/content.js` and set:

   ```js
   rsvp: {
     mode: "form",
     endpoint: "https://script.google.com/macros/s/AKfy.../exec",
     ...
   }
   ```

7. Commit and push. Submit a test RSVP and check the row lands in the sheet.

## Email alerts (optional)

In Apps Script: **Project Settings → Script properties → Add script property**
Name `NOTIFY_EMAIL`, value your email address. You get a message per RSVP.

## Why urlencoded and not JSON

Apps Script web apps cannot answer a CORS preflight. Posting
`application/x-www-form-urlencoded` counts as a "simple request", so the browser
skips the preflight and the post goes through. `main.js` already does this. If
you switch it to JSON it will start failing in the browser.

## Redeploying after an edit

Editing `Code.gs` is not enough. Go to **Deploy → Manage deployments**, edit the
existing deployment, and set version to **New version**. The URL stays the same.

## What this does not give you

Joy's guest list features: who has been invited, meal choice per named guest,
+1 rules, chase-up emails, address collection. This is a form and a spreadsheet.
If those matter, leave `mode: "link"` and keep RSVPs on Joy.
