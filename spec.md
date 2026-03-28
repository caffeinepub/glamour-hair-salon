# Glamour Hair Salon

## Current State
New project with empty backend and no frontend.

## Requested Changes (Diff)

### Add
- Full single-page hair salon website with the following sections:
  - Header/Nav: logo, navigation links (Home, Services, Gallery, Team, Book Now), Book Appointment CTA
  - Hero: full-width background image, headline, subtext, CTA button
  - Services: 3-column card grid with icon, title, description, price, and link
  - Gallery: image grid (2x5) of salon/style photos with View Full Gallery button
  - Booking: two-column layout with form (name, date, time, stylist, service selectors) and submit
  - Footer: brand, contact info, hours, links, social icons
- Backend: store appointment booking submissions (name, email, date, time, stylist, service)
- Admin view to list appointments (basic)

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Generate Motoko backend with appointment booking storage and retrieval
2. Build React frontend matching the warm cream + muted gold design with elegant serif typography
3. Wire booking form to backend
4. Add sample services, gallery placeholder images, and team data as frontend constants
