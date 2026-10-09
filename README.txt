AUSWAY Driver Management - separated files

HTML: index.html, dashboard.html, trips.html, drivers.html, requests.html, reports.html
CSS: css/index.css, css/dashboard.css, css/trips.css, css/drivers.css, css/requests.css, css/reports.css
JavaScript: js/app.js

Each HTML page links to its own CSS file. CSS contents are kept identical to the original design; no visual changes are intended. Keep the css and js folders beside the HTML files. Open index.html or the specific page HTML in a browser.

UPDATES
1. Top search bar resized (446x44) to match the reference image.
2. Profile pill on the Notifications page now opens the editable Edit Profile drawer.
3. Notification "more" (3-dot) menu: Mark as read / Mark as unread and Delete notification.
4. New Settings page (#settings) - theme colour, compact rows, notification toggles, language, rows per page. Opened from the gear icon on every page (incl. Notifications). Saved in localStorage.
5. Filter dropdowns on all pages are right-aligned (search stays on the left).
6. Round 2: centered full-width top search bar; dummy ratings on Drivers/Trips (rating filters work); Reports sidebar icon fixed; Users tab removed from Reports; breadcrumb paths removed from all pages.
7. Dashboard Recent Orders table restyled (no brackets on status, rupee symbol beside amount, row dividers, 4th row added); '>' links to the Trips page.
8. Reports: Top Performing Services values/headers updated; Drivers tab now shows the Driver Reports table.
9. Reports/Dashboard: chart cards restyled with icons, legends, axis titles, stat boxes and icon donut; Reports tables are full width.
10. Profile drawer: name updates live in the header (both headers) while typing, Save persists details (localStorage), closing without saving reverts.

11. UI colour pass: palette set to 993535 / FFE4E4 / 404040 / 6F0000 / 1C1B1F / FFFFFF / 000000 per the UI images; header search, sidebar, pink panels, status colours, detail pop-ups and Notifications header restyled. Appearance only - JavaScript and page logic unchanged.
