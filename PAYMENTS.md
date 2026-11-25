# Payments, timeline and documents — v1.14.0

See [the current user guide](USER_GUIDE.md) for Quick start, task guides, FAQ, closeout, backup and troubleshooting instructions. This replaces the old release-by-release instruction appendices.

## Financial rules
- Budget estimates remain separate from confirmed/expected costs. Actuals are paid ledger amounts minus received refunds/corrections, including preserved legacy opening values.
- Invoices, uploads, assignments and payment plans do not post paid money.
- Shared invoice allocations and base/fringe components roll up once. Invoice/planned obligations must not be duplicated.
- Receipt skipping is explicit; missing evidence and expected refunds block line closure.
- Received refunds do not reopen settled purchases, including fully refunded purchases at zero net Actuals.
- Posted records retain original history; use corrections, not Undo, for financial changes.

## Storage and portability
- Current desktop storage is local, not native .nlb autosave or cloud sync.
- Full budget backups include originals and referenced vendors. Whole-workspace backups include every budget, folder and vendor, including unassigned/archived contacts. Workspace import is additive with confirmation; malformed/missing-file backups stop before state changes.
- Duplicates preserve financial history but copy document originals into independent storage. Old shared-key duplicates also cannot lose originals through another budget’s document removal.
- Reports, calendar snapshots and binders are not restorable backups. Export privacy is a local binder default, not online access control.

## Verification boundary
Automated browser/financial/backup/layout checks are supplemented by published-package verification. Native Mac installation/printing and Apple/Google calendar imports need real-device verification. No bank integration, payroll engine, automatic document reading, external online sharing or live sync is implemented.

## v1.11.0 interface refinements
- Collapsed parent vendor/payroll defaults; clickable breadcrumbs and session-local Back/Forward preserve unposted drafts without posting financial changes. Saved/cancelled financial editors do not replay.
- Dedicated payment-list PDF uses alternating backgrounds, separators and repeated page headings; binder and calendar exporters are unchanged. The budget PDF is redesigned separately in v1.12.0.
- Approved optional-support wording appears in Help and native About as inactive. No Stripe, Wix/site connection, external payment link, money collection, subscription or annual-cost line is implemented.

## v1.12.0 budget PDF
The main Export & Share budget PDF follows the approved grey-shaded Top Sheet/detail design. Project headings repeat on every generated budget page. Export-only producer/location/agreements metadata and a principal-start override are saved per budget; a blank override follows Timeline production start without shifting payments. Base totals, fringes, contingency and Grand Total retain their existing calculations. Payment-report PDFs, binder, calendars, CSV and Excel are not reformatted in this release.

## v1.13.0 vendor dashboards
- Vendors have a visual directory and a per-vendor view for the selected budget. Link unassigned detail lines, schedule fixed dated amounts per line, record payments explicitly, and see daily unpaid totals in the vendor calendar. Advanced shared/percentage/milestone flows remain available.
- Vendor agreements are stored locally with the reusable vendor, not in the budget document binder or ZIP. A single-budget backup includes agreement originals for referenced vendors; a workspace backup includes all vendor agreements. Originals are copied on restore. Each file may be up to 100 MB; there is no fixed number-of-agreements limit.

## Crew, cast and visual timelines

Crew and Cast are separate views of the shared local contact book. Choose all relevant categories when creating or editing a contact; an existing uncategorized contact remains under Vendors until categorized. Deal memos, W-9/W-2 files and other agreements stay local, with full originals in workspace backups and referenced-contact originals in single-budget backups. These backups are sensitive. The app does not process or file tax forms. Vendor logos are locally stored and backed up with contact information. Production phases and custom milestones are shown on a shared date axis; the main calendar scrolls through months without changing financial calculations.
