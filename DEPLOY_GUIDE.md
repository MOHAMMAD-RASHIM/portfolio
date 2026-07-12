# Deployment & Google Sheets Integration Guide

This guide explains how to connect your contact form directly to your Google Sheet and deploy your portfolio website for free.

---

## 1. Connecting the Contact Form to Your Google Sheet

To send details directly to your specific Google Sheet ([1ZTttcJa6-9thUR3f7Y8ciOmFfvra8NtF2EGivSqdIGE](https://docs.google.com/spreadsheets/d/1ZTttcJa6-9thUR3f7Y8ciOmFfvra8NtF2EGivSqdIGE/edit?usp=sharing)), you can use a Google Apps Script. This is the cleanest method and doesn't require Google Forms.

### Step 1: Set Up Your Google Sheet
1. Open your Google Sheet: [1ZTttcJa6-9thUR3f7Y8ciOmFfvra8NtF2EGivSqdIGE](https://docs.google.com/spreadsheets/d/1ZTttcJa6-9thUR3f7Y8ciOmFfvra8NtF2EGivSqdIGE/edit?usp=sharing)
2. Ensure the first sheet has column headers in row 1:
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`
   - Column D: `Message`

### Step 2: Create a Google Apps Script
1. Inside your Google Sheet menu, click **Extensions** -> **Apps Script**.
2. Delete any code in the editor and paste the following script:
   ```javascript
   function doPost(e) {
     try {
       var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       
       // Parse input variables from post body parameters
       var name = e.parameter.name || "N/A";
       var email = e.parameter.email || "N/A";
       var message = e.parameter.message || "N/A";
       
       // Append entry row to sheet
       sheet.appendRow([new Date(), name, email, message]);
       
       return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
         .setMimeType(ContentService.MimeType.JSON)
         .setHeader("Access-Control-Allow-Origin", "*");
     } catch (error) {
       return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
         .setMimeType(ContentService.MimeType.JSON)
         .setHeader("Access-Control-Allow-Origin", "*");
     }
   }
   ```
3. Click the **Save** (floppy disk) icon at the top of the editor.

### Step 3: Deploy the Apps Script as a Web App
1. Click **Deploy** (top right) -> **New Deployment**.
2. Click the gear icon next to "Select type" and choose **Web App**.
3. Configure the settings:
   - **Description**: `Portfolio Contact form`
   - **Execute as**: **Me** *(your Google account)*
   - **Who has access**: **Anyone** *(This is important so the portfolio can submit entries without needing Google logins)*.
4. Click **Deploy**. (You may need to click "Authorize access" and choose your Google account to grant permissions. If you see an "Advanced" warning, click it and click "Go to Untitled project (unsafe)" to approve).
5. Copy the **Web App URL** generated (it will look like: `https://script.google.com/macros/s/XXXXXX_XXXXXX/exec`).

### Step 4: Link It to Your Portfolio Code
1. Open **[index.html](file:///d:/portfolio-anti-gravity/index.html)**.
2. Scroll to the bottom and find the `<form>` element (around line 280-335).
3. Replace the form `action` URL with your copied Web App URL:
   ```html
   <form 
       action="YOUR_APPS_SCRIPT_WEB_APP_URL_HERE" 
       method="POST" 
       class="contact-form fade-in"
       id="gform"
   >
   ```
4. Verify input fields have matching names (which they do by default):
   - Name input has `name="name"`
   - Email input has `name="email"`
   - Message textarea has `name="message"`

---

## 2. Deploying Your Portfolio For Free

Since the portfolio consists of static files (`index.html`, `style.css`, `script.js`, and the `assets` folder), you can host it for free.

### Option A: GitHub Pages (Recommended)
1. Create a free account on [GitHub](https://github.com/) if you haven't already.
2. Create a new repository named `portfolio`.
3. Upload all the portfolio files (including the `assets` folder) to the repository.
4. Go to repository **Settings** -> **Pages** (in the sidebar).
5. Under **Build and deployment**, set the source to **Deploy from a branch** and select the `main` (or `master`) branch.
6. Save. In a few minutes, your site will be live at `https://<your-username>.github.io/portfolio/`.

### Option B: Netlify (Drag & Drop)
1. Go to [Netlify](https://www.netlify.com/) and sign up.
2. Navigate to the **Sites** tab.
3. Drag and drop the folder containing your portfolio files (the entire `portfolio-anti-gravity` folder) onto the deployment box.
4. Netlify will deploy it instantly and give you a free public URL.
