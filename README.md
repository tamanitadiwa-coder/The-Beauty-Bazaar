# Beauty Bazaar

Website for Beauty Bazaar, 24 Plein Street, Cape Town City Centre.

Static site (HTML, CSS, JavaScript). No build step. It works on GitHub Pages:
Settings → Pages → Deploy from branch → `main` / root.

## Editing

Everything the salon may want to change is at the top of `app.js` in `CONFIG`:

- `salon`: address, phone, WhatsApp, email
- `hours`: opening hours per day (Sunday closed by default)
- `team`: professionals, WhatsApp numbers, Instagram handles, photos
- `services`: name, short description, `mins` (duration), `price` (Rand), and who offers it
- `work`: gallery photos in `assets/work/`

`price: null` shows "Price on request" and `mins: null` shows "Time varies".

## Booking

The booking flow runs in six steps: service, professional, date, time, details, confirm.
On the last step, the customer's request goes straight to the professional:

- by WhatsApp, with the message filled in, for professionals with a WhatsApp number
- by Instagram message (copied, then pasted) for those without one
- by phone call to the salon for "Any available professional", until `salon.whatsapp` is set

The site never says an appointment is booked. It tells the customer they're booked once the professional confirms.
Dates and times come from salon hours, not from each professional's live diary. For live availability and instant
confirmation, connect a booking system (for example Fresha, Booksy or a calendar API).

`assets/logo-original.png` is the original Beauty Bazaar logo and must not be edited. `assets/logo.png` is the same artwork with its black background made transparent (so it blends into any dark background on every browser). It looks identical on black.

Website by [TAMANY.TECH](https://tamany.tech).
