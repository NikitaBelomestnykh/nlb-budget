# Payments, timeline and documents (v1.7.1 beta)

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
Setup → Documents allows upload first/assignment later, original download, internal names/tags, multiple line/sub-account/payment assignments, and PDF/supported-image previews. Filter each data column and use Assigned / Unassigned / Archived statuses. Archive is reversible organization: originals, links, backup inclusion and existing binder privacy defaults are preserved. New uploads default to Exclude from binder by default (sensitive) under Export privacy. This is a local export preference, not online sharing/access control. Binder exports exclude those sensitive files unless explicitly included. Download ZIP… opens a chooser for individual originals, Select matching, or Select all documents; any sensitive/archived file may be included when explicitly checked. Search does not discard hidden checked files. A full .nlb backup includes all originals, including sensitive/archived documents, and referenced vendors only; treat backups as sensitive.

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

## v1.7.0 Vendors and Documents refinements
- Vendor table text is selectable/copyable, including contacts, phone/email, addresses and notes. Attachment status is scoped to the selected budget: Attached (green), Not Attached (yellow), or Archived (yellow). Archives remain below an Archive divider and preserve existing budget/payment links. Filter Vendor, Contact, Terms/notes and Status independently; filters combine with global search.
- Documents show Assigned (green), Unassigned (yellow), or Archived (red). Archive/Unarchive preserves original files, names/tags and assignments; archived entries stay below an Archive divider. Row actions are left-aligned. Every data column has a filter; the old Unassigned only checkbox and Sharing column are removed.
- Sharing was never an external link or online service. The existing internal flag is relabeled Export privacy in document details, preserving default binder inclusion behavior. ZIP download now requires explicit file selection rather than silently omitting sensitive originals.
- Upload Documents… opens the native chooser. Preview’s Close preview control is in the workspace’s upper-right corner and returns to the library. ZIP selection includes a searchable list, individual checkboxes, all/matching selection and Clear selection; the downloaded index includes document status/privacy metadata.

## v1.7.1 input and fringe fixes
- Return on the physical last regular detail line appends a new regular line and focuses the same column. Existing down/up navigation and expanded editors work; a trailing subtotal is not ignored. The insertion is undoable/redoable.
- Numeric budget fields, globals/formulas and payment amounts accept US-style thousands grouping (1,250.50). Payment forms validate formatted amounts and reject malformed grouping without posting changes. Numeric formulas normalize literal leading zeros rather than interpreting them as octal.
- QTY/X remove leading zeros when committed, including when Return moves away; zero, decimals and negative numbers retain their meaning. Global expressions remain editable.
- Applied fringes appear immediately, including zero-rate/zero-amount definitions. Detail breakdown rows update as amounts or fringe rates/types change, without navigating away or rebuilding focused line inputs.
- Checkbox pointer selection no longer outlines the containing row/cell. Checkbox sizing is fixed; keyboard focus remains visible around the checkbox itself.
