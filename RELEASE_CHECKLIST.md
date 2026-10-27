# v1.12.0 release-readiness checklist

## Verified locally
- [x] Financial core, cache and lifecycle/refund invariants.
- [x] Current Help/FAQ groups, search, closeout and matching repository guide.
- [x] Workspace export/import including every contact, folder and original; additive import and cancel; invalid originals reject before mutation.
- [x] Duplicate confirmation, independent originals and preserved financial history; failed storage copies roll back without altering the source.
- [x] Older shared-key duplicates preserve originals when another copy removes a document.
- [x] Reports use record identifiers, including repeated labels/dates.
- [x] Existing budgeting, Vendors/Documents, Downloads, privacy, sample and legacy Actuals workflows.
- [x] Light/dark and narrow-layout captures inspected; source syntax checks.

## Real-device checks — still pending
Use fictional test data and external backups. Do not delete production app data or replace your personal calendar.
- [ ] On an Apple Silicon Mac, back up important budgets/workspace, replace the app from the new DMG and confirm About shows v1.12.0.
- [ ] Reopen existing budgets; compare totals, Actuals, invoices and payment history; preview original documents.
- [ ] Test a payment with receipt and explicit receipt skip; add evidence later; check a partial payment and refund.
- [ ] Import a full workspace into a separate safe test installation/profile. Confirm contacts, folders, payment records and original document bytes.
- [ ] Print/save a budget PDF and inspect payment PDF, multi-month calendar PDF and binder pages on Mac.
- [ ] Import .ics into a **new dedicated test calendar** in Apple Calendar, and another in Google Calendar. Check inclusive dates, all-day events, amounts and expected/paid filters.
- [ ] Export a new calendar snapshot and replace only that dedicated test calendar; verify no live sync is implied.
- [ ] Manually compare opening cash, funding, payment/refund dates and closing cash with independent records. No bank reconciliation is implemented.

## Not included in this release
Automatic document reading, bank transfers/reconciliation, payroll calculations, cloud collaboration, live calendar sync, online document sharing and automatic Mac installation.

## Navigation / placeholder verification
- [ ] On Mac, inspect About support wording and inactive status.
- [ ] Check breadcrumb and Back/Forward navigation through long line names, document previews and vendor edits. No navigation should post money or replay completed payments.
- [ ] Inspect the alternating payment-list PDF, and inspect the redesigned budget PDF across portrait/landscape, font sizes and long notes.

## Budget PDF layout verification
- [x] Repeated project headings, approved column proportions, white/grey row bands and distinct totals.
- [x] Full-detail/summary/title-page exports, portrait/landscape, font sizes, black-and-white shading, metadata, long-title/oversized-note pagination and protected footers.
- [x] Export metadata persistence and exact original budget/ledger totals; payment/binder/calendar/CSV/Excel exporters unchanged.
- [ ] Confirm native Mac print preview and Save as PDF preserve grey backgrounds and page counts.
