# NewLeaf - Grief Counseling & Bereavement Support HTML Template

NewLeaf is a beautifully crafted, compassion-forward, and fully responsive HTML5 template specifically designed for solo therapists or group practices specializing in grief counseling and bereavement support.

It is built with vanilla HTML, CSS, and JS (No heavy frameworks, jQuery, or complex build tools).

## 🌟 Features
- **Design System:** Emotionally grounded and trauma-informed design language.
- **Dark Mode:** Full dark mode support (pure `#000000` background) that persists via `localStorage`.
- **RTL Support:** Native right-to-left language support (`rtl.css`).
- **Responsive Layout:** Works flawlessly across desktops, tablets, and mobile devices down to 360px.
- **Accessibility:** WCAG AA verified color contrast ratios.
- **No Dependencies:** Relies only on Google Fonts and Phosphor Icons CDN.

## 📂 File Structure

```text
newleaf/
├── index.html           # Main home page with Ken Burns hero
├── home2.html           # Alternate home page with split layout
├── about.html           # Therapist story and timeline
├── services.html        # Our approach and FAQ accordion
├── resources.html       # Article grid with JS filtering
├── blog.html            # Blog listing
├── blog-single.html     # Individual blog post
├── contact.html         # Confidential contact form with Formspree placeholder
├── login.html           # Client login
├── register.html        # Client registration
├── 404.html             # Page not found error
├── coming-soon.html     # Coming soon with countdown timer
├── assets/
│   ├── css/
│   │   ├── style.css    # Main stylesheet with CSS Variables
│   │   └── rtl.css      # Right-to-Left logical overrides
│   └── js/
│       └── main.js      # Theme toggle, drawer menu, form validation, filter, countdown
└── README.md
```

## 🎨 Customizing CSS Variables
All colors, fonts, and spacing are controlled via CSS Variables located at the very top of `assets/css/style.css`. 
To change the branding, simply update the hex codes in the `:root` pseudo-class for light mode, and `[data-theme="dark"]` for dark mode.

## 🌐 Configuring RTL
Right-to-Left formatting is supported natively. To activate it on any page:
1. Open the HTML file.
2. Change the `<html>` tag from `dir="ltr"` to `dir="rtl"`.
3. Ensure `assets/css/rtl.css` is linked below `style.css` in the `<head>`.

The included JS will also handle dynamic toggling via the `rtl-toggle` button in the navbar/drawer.

## 🔌 Integrations Placeholder Guide
- **Contact Form:** Update the `<form action="#">` in `contact.html` with your Formspree endpoint or backend URL.
- **Newsletter:** Replace `<!-- MAILCHIMP_EMBED -->` in `coming-soon.html` with your Mailchimp action URL.
- **Google Maps:** Replace the placeholder in `contact.html` where `<!-- GOOGLE_MAPS_API_KEY -->` is mentioned with your actual Google Maps iframe.
- **Telehealth:** Place your client portal/booking widget link below the contact form where indicated.

## 🛠️ Testing Locally
Since there are no complex build systems, you can simply open any `.html` file directly in your browser. However, for the best experience (and to avoid CORS issues if you add external fetch calls later), it is recommended to run a local web server (e.g. `npx serve` or using the VS Code Live Server extension).
