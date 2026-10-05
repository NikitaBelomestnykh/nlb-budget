# Payments, timeline and documents (v1.6.1 beta)

## Start here
1. Build your budget normally: Top Sheet → Account → Sub-account → detail lines. Keep different vendors on separate lines.
2. Open Setup → Timeline & Funding to set optional phase/milestone dates and opening cash; add funding tranches with expected and received amounts/dates.
3. In a detail line's drag-handle menu choose Vendor & Payments. Select/create a vendor. Vendors are reused across budgets on this computer.
4. Blank approved-cost fields follow the budget. Explicitly approve a changed base/fringe expected cost after reviewing an invoice/quote. An upload does not approve/post money.
5. Add a Fixed, Percentage, or Remaining balance installment. Use Base + fringes together by default, or separate components. Fixed shared payments must split their total across lines belonging to one vendor; allocation amounts must sum to the total.
6. Set a fixed due date or a milestone plus day offset. Unpaid relative dates follow milestone changes; fixed and paid dates remain unchanged.
7. Record paid explicitly, entering actual paid date and amount. Partial payments are supported and allocated proportionally to the installment's remaining components. Paid Actuals change only through an explicit financial action; uploading an invoice is not payment.
8. Hot Cost on managed lines retains paid + remaining expected cost. A deposit is not a saving. Finalize only when nothing further is owed; reopen if more cost is expected. Overpaid/overallocated expected costs are flagged.
9. Correct mistaken postings with a reversal; record real cash returned as a refund. Original records remain. Posted history cannot be removed via Undo or row deletion.

## Cash flow and calendars
The $ toolbar button or Setup → Payments & Timeline opens the workspace. Cash Flow is budget-wide. Opening cash is inclusive of movements on/after its as-of date; earlier movements are already represented by opening cash. Expected funding is distinguished from actually received funding. Refunds are separate from funding.

Unallocated costs and installments lacking a due date stay Not scheduled yet. Contingency is a reserve, not invented dated spending. A line's reserve-funded allocation reduces the remaining reserve, capped at the line's remaining/paid expected cost, without creating a second cash payment.

Calendar view and PDF show dated outgoing/incoming items. Export .ics as a snapshot: create a dedicated destination calendar in Apple/Google Calendar and import it. For a new snapshot, delete the old dedicated calendar and import into a new one. No live sync; the app never creates/deletes external calendars.

## Documents and backups
Setup → Documents allows upload first/assignment later, original download, internal names/tags, multiple line/sub-account/payment assignments, and PDF/supported-image previews. New uploads default Internal. Shared ZIP and binder exports exclude Internal documents unless explicitly included. A full .nlb backup includes all originals, including Internal documents, and referenced vendors only; treat backups as sensitive.

Original bytes live locally in IndexedDB, separate from small budget settings. Do not clear the app's storage. Export external full backups regularly. Importing a full .nlb on another computer restores the original files and referenced vendors as a new budget. Invalid/missing-file backups stop instead of creating incomplete records. The document upload limit is 100 MB/file; device storage and memory also limit capacity.

Export payment PDF/.xlsx/CSV by account/sub-account/vendor/line. Exports are snapshots with typed record/status columns, not a live spreadsheet model. The full binder includes all budget lines/setup, a whole-budget payment summary, document index and visible document pages grouped by account/sub-account. PDF, PNG and JPEG originals merge visibly. Other original formats can be downloaded in ZIP but must be converted before binder export. Encrypted, unsupported or missing binder documents produce an error, never silent omission.

## Compatibility and validation
No destructive reset or legacy reconciliation. Unmanaged manual Actuals retain the existing workflow; use Payments for dated paid-only ledgers and deposit-aware forecasts. The in-app Help guide includes the new workflow. Local Chromium tests cover financial rules, shared payments, partial settlement, corrections/refunds, relative dates, file:// startup, original-file backup/restore, CSV/Excel/PDF/ICS/ZIP/binder outputs and existing budgeting regressions. Live Mac installation and Apple/Google calendar import still require verification. Updates remain guided manual installations; v1.5.3 is the rollback release.

## v1.6.1 interface fixes
- Calendar-picker icons match date-input text in dark/light mode. All top-right close controls use the same size/style.
- Save timeline displays a read-only summary and visible header save status; Edit timeline restores inputs. Cancel discards unsaved edits.
- Labels and inputs have consistent gaps; editor actions occupy a separate row, never covering scrolling fields. Document toolbar controls align and Search documents is visibly labeled.
- Inapplicable amount/date fields are disabled, skipped by keyboard navigation, and have hover explanations. Managed Actuals cannot be edited directly; use paid postings/corrections.
- Document assignments have text, account, sub-account and type filters. Hidden checked items remain selected, and filtering does not discard unsaved document names/tags.
- Tooltips are clamped to the viewport.
- Schedules now show Vendor for this payment and Create vendor & use here. Creating/canceling a vendor returns to the intact schedule draft. Adding a payment from a line saves pending line setup first; fixed-allocation rows can infer their single existing vendor. Save payment schedule explicitly commits assignments; mismatched vendor allocations produce a clear error.
