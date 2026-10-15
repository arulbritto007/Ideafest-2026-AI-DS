# IDEAFEST 2026 – Project Expo Official Website

> **Innovation Beyond Intelligence**  
> Organized by ARINDASCI Association, Department of Artificial Intelligence and Data Science  
> **Sir Isaac Newton College of Engineering and Technology (SINCET)**, Nagapattinam, Tamil Nadu, India.  
> **Event Date:** 4 November 2026  
> *Think. Innovate. Collaborate. Inspire. — Where Ideas Become Innovation!*

---

## 🚀 About The Website

This is the official, production-ready static registration website for **IDEAFEST 2026 – Project Expo**. Built using modern, clean HTML5, CSS3, and JavaScript, it features a **Neon Cyber** design theme, glassmorphic UI cards, interactive neural network animations, live project domain filtering, a real-time event countdown, an accessible FAQ accordion, and Google Form registration integration.

The project requires **no build step, no Node.js dependencies, and no paid hosting**. It can be deployed directly to **GitHub Pages** for free.

---

## 📁 File Structure

```text
ideafest-2026/
├── index.html       # Complete semantic HTML5 structure and content
├── style.css        # Neon cyber theme, glassmorphism, responsive styles
├── script.js        # Central Google Form URL, countdown timer, FAQ accordion, canvas
└── README.md        # Beginner-friendly setup and deployment guide
```

---

## 🛠️ Beginner-Friendly Guide

### Step 1: Open the Project in Visual Studio Code

1. Download and install [Visual Studio Code](https://code.visualstudio.com/) if you haven't already.
2. Open Visual Studio Code.
3. Click **File** > **Open Folder...** (or press `Ctrl + K, Ctrl + O`).
4. Navigate to the `ideafest-2026` folder and select it.
5. You will see `index.html`, `style.css`, `script.js`, and `README.md` in the left sidebar Explorer.

---

### Step 2: Test the Website Locally

You can test the website locally in your browser using either of these two methods:

#### Method A: Direct File Open (Quickest)
1. In your computer's file explorer, navigate to the `ideafest-2026` folder.
2. Double-click `index.html`.
3. It will open instantly in your default web browser (Chrome, Edge, Firefox, Safari).

#### Method B: VS Code Live Server Extension (Recommended)
1. In VS Code, click the **Extensions** icon on the left bar (`Ctrl + Shift + X`).
2. Search for **Live Server** (by Ritwick Dey) and click **Install**.
3. Right-click on `index.html` in the file explorer.
4. Select **Open with Live Server**.
5. Your browser will open `http://127.0.0.1:5500/index.html` and automatically reload whenever you save edits.

---

### Step 3: Editing the Google Form Registration URL

When the organizers finalize or update the official registration form:

1. Open `script.js` in Visual Studio Code.
2. At the very top (lines 13–15), locate the `GOOGLE_FORM_URL` constant:
   ```javascript
   const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeGZf8Qt3a4rHwVbEhPYZrEq5hJ8mbU3IkHmArtRPNEMz02Ww/viewform";
   ```
3. Replace the link between the quotes with your new official Google Form URL:
   ```javascript
   const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_LINK/viewform";
   ```
4. Save the file (`Ctrl + S`).
5. All "Register Now" and "Register Your Project" buttons across the website will immediately point to this new link.
   > **Note:** If `GOOGLE_FORM_URL` is empty, `"#"`, or contains placeholder text, the site automatically prevents broken links and displays an official notice: *"Registration will open soon. The official registration form link will be announced by the organizers."*

---

### Step 4: Create a GitHub Repository

1. Sign in to your account at [GitHub](https://github.com/).
2. In the top-right corner, click the **`+`** icon and select **New repository**.
3. Fill in the repository details:
   - **Repository name:** e.g., `ideafest-2026`
   - **Description:** `Official registration website for IDEAFEST 2026 Project Expo`
   - **Public / Private:** Select **Public** (required for free GitHub Pages hosting).
   - Leave "Add a README file" unchecked (since we already have one).
4. Click **Create repository**.

---

### Step 5: Upload Website Files to GitHub

#### Option A: Using the GitHub Web Browser Interface (Simplest)
1. On your newly created repository page, click the link that says **uploading an existing file**.
2. Drag and drop all 4 files (`index.html`, `style.css`, `script.js`, and `README.md`) into the box.
3. At the bottom under **Commit changes**, type a message like `Initial release of IDEAFEST 2026 website`.
4. Click **Commit changes**.

#### Option B: Using Git in Terminal / Command Prompt
If you have Git installed on your computer:
```bash
cd /path/to/ideafest-2026
git init
git add .
git commit -m "Initial commit for IDEAFEST 2026 website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ideafest-2026.git
git push -u origin main
```

---

### Step 6: Enable GitHub Pages

1. In your repository on GitHub, click the **Settings** tab (gear icon at the top).
2. On the left navigation menu, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`.
   - **Branch:** Select `main` from the dropdown, and leave folder as `/(root)`.
4. Click **Save**.

---

### Step 7: Open the Published Website

1. Wait approximately 1 to 2 minutes for GitHub Pages to build the site.
2. Refresh the **Settings > Pages** screen.
3. You will see a banner at the top:
   > **Your site is live at `https://YOUR_USERNAME.github.io/ideafest-2026/`**
4. Click **Visit site** to test your live, public website!

---

### Step 8: Updating the Website After Making Changes

Whenever you need to update dates, guest confirmation, rules, or the Google Form URL:

1. Edit your local files (`index.html`, `style.css`, or `script.js`) in VS Code.
2. Save your changes (`Ctrl + S`).
3. Commit and push the updates:
   - **Via Browser:** Go to your repository on GitHub, click **Add file > Upload files**, select the modified files, and click **Commit changes**.
   - **Via Git CLI:**
     ```bash
     git add .
     git commit -m "Update registration details"
     git push origin main
     ```
4. GitHub Pages will automatically redeploy the latest version within 1–2 minutes.

---

## 🎨 Design System & Palette

- **Theme:** Neon Cyber / Futuristic Academic AI Expo
- **Background:** `#080D1C` (Deep Navy Cyber Dark)
- **Secondary Background:** `#111A2E`
- **Primary Accent:** `#00F5FF` (Electric Cyan)
- **Secondary Accent:** `#A855F7` (Neon Purple)
- **Highlight Accent:** `#39FF88` (Electric Green)
- **Main Text:** `#F8FAFC`
- **Secondary Text:** `#AAB8D0`
- **Typography:** *Space Grotesk* (headings) & *Inter* (body) via Google Fonts.

---

## 📞 Official Contact & Support

- **Department:** Department of Artificial Intelligence and Data Science
- **Institution:** Sir Isaac Newton College of Engineering and Technology (SINCET), Nagapattinam, Tamil Nadu.
- **Faculty Coordinator:** Ms. R. Sindhuja, M.E. (`sindhuja@sincet.ac.in` | `9344389482`)
- **Organizing Body:** ARINDASCI Association
