# Bharat Finance Website

Professional static website for Bharat Finance - Financial guidance for Indian professionals in Germany.

## 📁 Project Structure

```
bharatfinance/
├── index.html              # Main landing page (clean & minimal)
├── css/
│   └── styles.css         # All CSS styles
├── js/
│   └── main.js            # JavaScript functionality
├── .htaccess              # Apache configuration
├── robots.txt             # SEO configuration
└── README.md              # This file
```

## 🚀 Tech Stack

- **HTML5** - Clean semantic structure
- **CSS3** - Professional styling (separate file)
- **JavaScript (ES6+)** - No frameworks needed
- **Google Fonts** - Playfair Display + Inter
- **Static Site** - Perfect for Hostinger

## 📦 Features

✅ Fully responsive (mobile/tablet/desktop)  
✅ Video background with fallback  
✅ Smooth scrolling  
✅ Loading animation  
✅ SEO optimized  
✅ Performance optimized  
✅ Clean, organized code

## 🌐 Deploy to Hostinger (Business Plan)

### Step 1: Access Hostinger
1. Log in to [hostinger.com](https://www.hostinger.com)
2. Go to **hPanel** dashboard
3. Click on **File Manager**

### Step 2: Upload Files
1. Navigate to `public_html/` folder
2. Delete any default files (if present)
3. Upload these files:
   - `index.html`
   - `.htaccess`
   - `robots.txt`
4. Create folders:
   - Click **"New Folder"** → name it `css`
   - Click **"New Folder"** → name it `js`
5. Upload `styles.css` to the `css/` folder
6. Upload `main.js` to the `js/` folder

### Step 3: Enable SSL (HTTPS)
1. In hPanel, go to **SSL** section
2. Find your domain
3. Click **"Install SSL"**
4. Wait 5-10 minutes for activation

### Step 4: Test
Open your domain in a browser:
- ✅ Video plays in background
- ✅ Navigation works
- ✅ Buttons are clickable
- ✅ Mobile responsive

## 🎥 Custom Video

To use your own video:
1. Create a `videos/` folder in File Manager
2. Upload your video (keep under 50MB)
3. Edit line 34 in `index.html`:
   ```html
   <source src="videos/your-video.mp4" type="video/mp4">
   ```

## 🎨 Customization

### Colors
Edit `css/styles.css`:
- Primary (Saffron): `#FF9933`
- Secondary (Green): `#1B4D3E`

### Text
Edit `index.html`:
- Hero title: Lines 60-62
- Navigation: Lines 47-52

## 🔧 File Sizes

- index.html: ~2 KB
- css/styles.css: ~6 KB
- js/main.js: ~1 KB
- **Total**: ~9 KB (super fast!)

## 📱 Browser Support

✅ Chrome/Edge (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
✅ Mobile browsers

## 💡 Why This Structure?

**Before**: Everything in one HTML file  
❌ Hard to maintain  
❌ Poor caching  
❌ Messy code

**Now**: Organized structure  
✅ Easy to update  
✅ Better performance  
✅ Professional  
✅ Industry standard

---

Built for Bharat Finance | Ready for production
