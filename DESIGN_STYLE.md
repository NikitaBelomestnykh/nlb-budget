# NO LONGER BUDGET — Design style sheet

Working reference for future app work. Implemented styles live primarily in `index.html` and `assets/payments.css`; planned conventions are not necessarily implemented everywhere. See also the design style sheet in the Notion Build Log.

## Principles
- Prioritize understandable, visual workflows and clear next actions. Group related information and use plain labels; avoid unnecessary nested controls.
- Maintain a calm, production-tool aesthetic with restrained surfaces, thin borders, clear type, generous spacing and yellow accents. Design for light and dark modes, keyboard access and narrow screens.
- Use text and icons as well as color to communicate states. Never imply that an expected or scheduled payment has been paid.

## Foundation
- System sans-serif stack; default 16px, 1.5 line height. Use hierarchy and legibility over decoration.
- Light: page `#EBEBEB`, canvas `#FFFFFF`, border `#D9D9D9`, text `#0B0B0B`, secondary text `#3D3D3D`, accent `#F4B63F`, soft accent `#FBF3E2`.
- Dark: page `#0B0B0B`, canvas `#242323`, border `rgba(255,255,255,.15)`, text `#FFFFFF`, secondary text `rgba(255,255,255,.65)`, accent `#F4B63F`, soft accent `rgba(244,182,63,.15)`.
- Reuse variables and components. Typical borders are 1px and corners 6–12px. Base buttons use 8px radius and a 44px minimum height; compact workspace buttons vary.

## Controls and layout
- Primary and create actions are yellow with dark text; secondary navigation/actions are neutral and outlined. Use clearly labeled red destructive actions. Add/Create actions have a plus icon; icon-only buttons require accessible names.
- Put a yellow standalone plus alongside a dropdown, centered vertically against the control rather than the label. Keep a visible gap between adjacent actions. Add a visible focus ring and meaningful disabled styling.
- Checkboxes use themed surfaces and yellow checked states, not default blue. Retain keyboard access and forced-color support.
- Left-align All Payments as an explicit return action; do not restore breadcrumbs/back-forward controls to the payments workspace.
- Group profile fields with clear headings, icons and circular avatars. Align action rows at the bottom of cards despite wrapped names. Keep field labels close and dropdown arrows comfortably inset; sort choices alphabetically where appropriate.
- Keep frequently used filters visible on one row, horizontally scrollable when necessary. Searchable line selectors group accounts and sub-accounts. Dialogs scroll independently and lock background scrolling.

## Money, timeline and calendar
- Budgeted = budget estimate; Expected = confirmed estimate; Actual = paid amount. Dates and forecasts never post payments without explicit confirmation. Preserve history and distinguish funding from received cash.
- Payment journey uses text and status colors: no date red, expected yellow, confirmed blue, paid green; clearly label partial and overdue states.
- Show phases and custom/funding milestones on a horizontally scrollable production timeline with month headings, days and stronger week ticks. Dates belong on the bars/markers, revealed by hover, focus or touch. Payments belong on the calendar, not the production timeline.
- Put the calendar below the timeline, distinguish money in/out, outline today in yellow, keep weeks equal-height and use separate cards for crowded-day details. Align controls and keep selected ranges consistent across display and PDF/CSV/ICS exports.

## Review checklist
Check both themes, long names, empty and populated states, desktop and mobile widths, scrolling, focus and keyboard access. Test financial states and actions for accuracy, review representative screenshots, and update this reference as decisions are approved and shipped.
