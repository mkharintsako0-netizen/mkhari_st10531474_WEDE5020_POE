#WEDE5020 Part 2- EcoShine Website

**Student Name:** Tiego Mkhari
**Student Number:** ST10531474
**Module:** Web Development (WEDE5020)
**Project:** EcoShine Website - Part 3 Enhancing Functionality and SEO

---

**Live site:** https://mkharintsako0-netizen.github.io/mkhari_st10531474_WED5020_POE/
**Repisitory:** https://github.com/mkharintsako0-netizen/mkhari_st10531474_WED5020_POE

---

### 1. Changelog

### Part 2 feedback corrections
* ** Navigation menu did not adapt to different screen sizes (1/5) | Mobile navigation rules were outside a media query so they applied on every screen. Moved them inside `@media (max-width: 768px)`, added larger tap targets, and added a tablet breakpoint (769px to 1023px) so the menu wraps. | stylesheet1.css |
| Images did not adapt properly (2/5) | Added `img { max-width: 100%; height: auto; }` so images shrink with their container instead of overflowing on mobile. | stylesheet1.css |
| Layout adjustments could be improved (3/5) | Added a tablet breakpoint and set grids and hero buttons to a single column on mobile. | stylesheet1.css |
| Typography adjustments could be improved (4/5) | Reduced heading sizes on mobile so long headings no longer wrap awkwardly. | stylesheet1.css |
| Changelog lacked detail | Rewrote the changelog as a table that links each piece of feedback to the change, the file and the reason. | README.md |
| README could be improved (3/5) | Added project description, file structure and usage sections. | README.md |
| References incomplete or incorrectly formatted (2/5) | Rewrote all references in Harvard format with author, year, title, URL and access date, and added in-text citations. | README.md |
| Commits lacked detail | Split Part 3 work into several descriptive commits, one per feature. | GitHub |

### New features (Part 3)
* **script.js (rewritten):** previously only a console message. It now powers every feature below and adds its own styles.
* **Accordion (About Us):** FAQ section, keyboard accessible, uses aria-expanded.
* **Modal (Services):** "View details" opens a dialog with the service description and a link to the enquiry form.
* **Dynamic content (Services):** service cards are generated with JavaScript, with search, category filter and price/name sorting.
* **Interactive map (Contact):** Leaflet and OpenStreetMap map with a marker and popup.
* **Gallery lightbox:** click an image to enlarge it, with previous/next buttons, arrow keys and Escape to close.
* **Animations:** sections fade in once as they scroll into view (CSS keyframes and IntersectionObserver).
* **DOM manipulation:** cards, dialogs, FAQ, map section, result boxes, navigation link and back-to-top button are created and updated with JavaScript.
* **enquiry.html (new):** HTML form with text, email, tel, select, number, date and textarea fields. After validation it shows an estimated cost (including 15% VAT), a reference number and availability.
* **contact.html form:** name, email, phone (optional), message type and message. After validation the details are compiled into an email that the visitor sends to the recipient set in script.js.
* **Validation:** HTML5 attributes plus JavaScript checks for South African phone numbers, future weekday dates, text lengths and number ranges, with error messages next to each field.
* **AJAX:** both forms are submitted with fetch() without reloading the page, sent to the JSONPlaceholder test API.
* **SEO:** unique title and meta description per page, keywords, robots meta tag, LocalBusiness structured data on the home page, robots.txt, sitemap.xml, and an Enquiry link in the navigation.
* **Security:** user input is shown with textContent (never innerHTML) and external links use rel="noopener noreferrer".

---

## 2. SEO Notes
* **Keywords:** eco-friendly cleaning, green cleaning South Africa, residential cleaning, commercial cleaning, carpet cleaning, window washing. **EDIT THIS:** add one sentence on how you found them, for example Google autocomplete or thinking about what customers would search.
* **Off-page SEO plan:** share on social media, create a Google Business Profile, list on local directories, and request backlinks from local suppliers and customers.
* **Local SEO:** opening hours, phone number and service area are in the structured data and on the contact page.

## 3. Deployment
The site is hosted on **GitHub Pages**: https://mkharintsako0-netizen.github.io/mkhari_st10531474_WEDE5020_POE/

## 4. References
* MDN Web Docs (n.d.). *Fetch API.* [online] Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
* MDN Web Docs (n.d.). *Intersection Observer API.* [online] Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
* MDN Web Docs (n.d.). *CSS media queries.* [online] Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries
* W3Schools (2020). *Responsive Web Design Introduction.* [online] Available at: https://www.w3schools.com/css/css_rwd_intro.asp
* Leaflet (n.d.). *Leaflet - an open-source JavaScript library for interactive maps.* [online] Available at: https://leafletjs.com
* OpenStreetMap (n.d.). *Copyright and licence.* [online] Available at: https://www.openstreetmap.org/copyright
* Google Search Central (n.d.). *Robots.txt introduction.* [online] Available at: https://developers.google.com/search/docs/crawling-indexing/robots/intro
* Google Search Central (n.d.). *Build and submit a sitemap.* [online] Available at: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
* JSONPlaceholder (n.d.). *Free fake API for testing and prototyping.* [online] Available at: https://jsonplaceholder.typicode.com