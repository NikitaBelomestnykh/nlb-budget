/* Current user guide. */
window.NLBGuide = [
  {
    "group": "Quick start",
    "title": "From estimate to production closeout",
    "body": "<p>NO LONGER BUDGET keeps your original estimate, current expected cost, paid history and supporting documents together. It records financial decisions; it does not send payments, reconcile your bank or calculate payroll.</p><ol><li><b>Build the estimate.</b> Click + New Budget. Add accounts, sub-accounts and detail lines; keep different vendors on separate detail lines. Base cost is QTY × X × RATE. Apply budgeted fringes where needed.</li><li><b>Confirm the cost and vendor.</b> Open a detail line’s six-dot menu → Vendor &amp; Payments, or click its currency sign beside Total. Choose Vendor / crew member and, if relevant, Paid through. Enter agreed base/fringe costs and click Confirm cost. Blank amounts continue to follow the budget; enter explicit amounts to hold an agreement separately.</li><li><b>Enter the invoice.</b> Click Add invoice…; enter the reference, recipient, amounts and dates, then select or upload supporting files. Review allocations before saving. An invoice records an obligation—not money paid. If a plan already covers this invoice, link that plan instead of creating a second obligation.</li><li><b>Plan timing when needed.</b> Add payment plan… supports fixed, percentage and remaining-balance installments. Use a fixed date or a production milestone with a day offset. A payment plan is optional; an invoice can carry its own due date.</li><li><b>Record money actually paid.</b> Use Record paid for an invoice/plan, or Record payment without invoice… for a direct expense or reimbursement. Enter the real paid amount and date. Attach a receipt/payment confirmation, or explicitly choose Skip receipt for now. Add a note if useful.</li><li><b>Finish the evidence and returns.</b> Attach missing receipts later. Track an expected refund separately; record it as received only when the money comes back. Actuals update from paid amounts minus received refunds and corrections.</li><li><b>Close out and back up.</b> Review unpaid balances, receipts, expected refunds and unscheduled costs. Close completed lines, download the required reports/binder and keep an external full backup.</li></ol><p>Try <b>Load full example budget</b> above. Trial by Software is a fictional sandbox; loading it creates a separate budget without replacing your existing work.</p>"
  },
  {
    "group": "Quick start",
    "title": "Production closeout checklist",
    "body": "<ul><li><b>Costs:</b> compare Budgeted with Expected final. Review unconfirmed costs and any overpayments or overallocated plans. Do not treat a deposit as a saving.</li><li><b>Payments:</b> verify Still owed and Not scheduled yet. Pay, cancel or revise genuine outstanding obligations; use Finalize cost only when no further cost is expected.</li><li><b>Evidence:</b> attach missing receipts/payment confirmations and check invoice assignments. Review legacy opening Actuals if present.</li><li><b>Returns:</b> record received refunds against the original payment, or cancel a refund expectation that is no longer valid. Do not record expected money as received.</li><li><b>Cash:</b> verify opening cash/as-of date, actual funding and dates against your own bank records. The app does not reconcile them for you.</li><li><b>Closure:</b> close eligible lines. Paid and Closed are different: receipts, refunds or legacy-value review can still block closure.</li><li><b>Delivery:</b> download budget/payment reports and a PDF binder. Review sensitive and archived documents before sending files.</li><li><b>Protection:</b> export a full .nlb budget backup—or a workspace backup for all budgets and contacts—and verify it imports on a separate test copy. A PDF or ZIP is not a restorable budget backup.</li></ul><p>This is a review checklist, not an automatic audit or a promise that the records match your bank.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Budgets, folders, duplication and the example",
    "body": "<p>Click <b>+ New Budget</b>, enter a title and save. New budgets start blank; the template picker is not enabled. Select a budget from the sidebar. Its title appears between Show Actuals and Export &amp; Share.</p><p>The pencil beside a budget opens Rename, Duplicate, Move to Folder and Delete. Folders organize the sidebar; they are not disk directories. Duplicate creates a separate version and clears its locked Original Total. It copies existing estimates, invoices, payment/refund history and documents—it is not a fresh unpaid budget or an external backup. Document originals get independent storage keys so removing one copy cannot break the other. Vendors remain shared contact-book entries.</p><p>Deleting a whole budget is different from deleting a financial row. Keep a full backup first. Load full example budget creates a fresh fictional sandbox; reopening the app preserves your edits to existing examples.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Navigate Top Sheet → Account → Sub-account → detail line",
    "body": "<p>Top Sheet groups accounts under <b>ATL, BTL, BTL POST and OTHER</b>. An account is a numbered heading inside one of those categories; a sub-account sits inside an account; detail lines contain the individual costs. Click account/sub-account descriptions to open them.</p><p>Breadcrumbs and the back arrow go up a level. Up/down arrows beside the title move to the previous/next account or sub-account. Click number/name fields to edit them; use + Add account, + Add sub-account and + Add line at the relevant level. The footer shows category totals and Grand Total.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Edit amounts, formulas, units and long text",
    "body": "<p>Base cost is <b>QTY × X × RATE</b>. UNIT labels the quantity; it does not multiply the amount. Numeric budget fields accept US-style thousands grouping such as <code>1,250.50</code> and expressions such as <code>1,000*3</code>. Payment forms accept formatted amounts, not arbitrary budget formulas. Currency changes the display symbol; it does not convert amounts.</p><p>Tab / Shift+Tab move right/left; Enter / Shift+Enter move down/up in the same editable field. Enter on the last regular detail row with nothing below adds a regular line and keeps the same column selected. A trailing subtotal is not ignored. QTY/X remove leading zeros on commit: 005 becomes 5; 0.5 stays 0.5.</p><p>Long text expands into an editor below the row while selected and collapses when you move away. Selecting a resolved global restores the original expression. UNIT adapts to its displayed value; a narrow window may need horizontal table scrolling. Setup → Units defines singular/plural labels: exactly 1 uses singular; other quantities use plural.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Reorder, renumber, subtotals and notes",
    "body": "<p>Drag the left six-dot handle to reorder accounts, sub-accounts, lines or subtotals within their current parent. Accounts stay in their Top Sheet category; dragging does not move a row into a different account/sub-account.</p><p>Click the <b># heading → Renumber</b>. Accounts renumber by hundreds within the category, starting from the first account’s hundred or the category default. Sub-accounts start at their account number + 1. Review the proposed range; nested lists are not automatically renumbered.</p><p>+ Add subtotal sums the segment since the previous subtotal or list start, including applied fringes. The circular notes icon opens/collapses a note underneath a line without resizing the columns; it highlights when text exists. Undo/Redo applies to supported budget edits, not posted financial history.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Setup, globals and live expressions",
    "body": "<p><b>Setup</b> opens Globals, Units, Fringes, Groups, Currency, Vendors, Payments &amp; Timeline, Timeline &amp; Funding and Documents. Close a manager/workspace with its × control. Vendors are a shared contact book; budget setup and payment records belong to the selected budget.</p><p>Setup → Globals stores named numbers, text or expressions referencing other globals, such as <code>Day Rate * 5</code>. Type a global name directly into Description, QTY, UNIT, X or RATE; autocomplete helps. There is no chain-link button. Leaving a field displays the resolved value; selecting it restores the expression. Updates propagate to references. Uses counts name occurrences in detail fields and other globals—not just distinct rows.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Fringes and groups without double-counting",
    "body": "<p>Setup → Fringes → + Add fringe defines Name, Type and Rate. <b>% of wages</b> applies to the line’s base amount: enter 21.5 for 21.5%, not 0.215. <b>Flat per line</b> adds the amount once per assigned detail line, not per unit. Apply from a row’s six-dot menu → Apply fringes, or the table header’s three-dot menu → Fringes for all/selected lines.</p><p>Applied fringes appear immediately as informational breakdown rows—even at zero rate—and roll up once into totals. Do not add those breakdown amounts again. The manager’s $ Total and Uses show budgeted costs and assigned-line count. Invoice/payroll fringe amounts are separate confirmed amounts; optional employer breakdown explains that total, not extra charges.</p><p>Setup → Groups creates colored tags. Apply groups from row/header menus; click the colored description bar to adjust a line’s tags. Group totals sum tagged base costs. A line may have several groups, so adding group totals can count it twice. Groups and fringes are assigned to detail lines, not directly to accounts.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Confirm cost, inheritance and shared parent invoices",
    "body": "<p>Open <b>Vendor &amp; Payments</b> on a detail line to choose its vendor and agreed base/fringe amounts. Confirm cost preserves the original budget and records the decision. Blank confirmed fields follow current budget values; explicit amounts remain separate from the estimate.</p><p>Account/sub-account six-dot menus or currency signs open parent pages. Set a default Vendor / crew member and Paid through; children inherit unless overridden. Direct payment (override parent) clears inherited payroll handling. Changing defaults does not rewrite historical payment recipients.</p><p>A parent invoice is stored once. Apply it to included detail lines and review proportional, equal or manual base/fringe allocations. Exact shares must sum to the invoice total. Child pages show their shares, not repeated whole-invoice costs. Keep different suppliers on separate detail lines.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Invoices and payment plans",
    "body": "<p><b>Add invoice…</b> records reference, type, recipient, issued/due dates, base/fringe amounts, note and supporting files. Duplicate references for the same recipient are rejected. Invoice information is entered manually; document reading is not implemented.</p><p>If an existing plan covers the same obligation, use <b>Link existing payment plan</b>. A blank invoice due date preserves a linked plan’s milestone timing. Do not enter the same bill as both an unrelated invoice and an extra plan.</p><p><b>Add payment plan…</b> creates an unpaid forecast: Fixed, Percentage or Remaining balance. Unpaid percentage/balance amounts follow applicable expected costs; posted paid amounts stay fixed. Shared fixed plans split their total across lines payable to one recipient. Base and fringes may be planned together or separately. Inapplicable controls are disabled with explanations.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Record paid, receipts and direct reimbursements",
    "body": "<p>Use <b>Record paid</b> for an invoice/plan. Enter the actual amount and date; partial payments allocate across remaining shares. Select/upload a receipt or payment confirmation. To proceed without it, deliberately check <b>Skip receipt for now</b>; the payment stays flagged and cannot complete line closure until evidence is attached. Attach receipt later through payment history.</p><p><b>Record payment without invoice…</b> supports Paid directly or Reimburse someone. Store the merchant/vendor separately from the reimbursement recipient, with base/fringe amounts, real paid date and optional note. This records money already paid; it does not initiate a transfer.</p><p>Uploading or assigning a file never confirms cost or posts Actuals. Payment evidence cannot be permanently removed while a posted payment references it; archive it instead. Archived evidence remains attached.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Payroll, merchants and employer fringes",
    "body": "<p>For a Walmart purchase, Walmart is the merchant/vendor. For crew paid by a payroll company, the individual remains Vendor / crew member; the payroll company is <b>Paid through</b>. A reimbursement can pay a person while retaining Walmart as the merchant.</p><p>Record the actual payroll report: gross base wages plus employer fringes. Optional taxes, pension/health, processing fees and other items describe the fringe total; do not add them again. Employee deductions are already within gross wages. One payroll invoice can be allocated across crew lines payable through that company. The app does not calculate payroll, tax filings or employee withholding.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Expected returns, received refunds and corrections",
    "body": "<p>Track expected refund records money you anticipate receiving back, such as a refundable deposit or unused purchases. It is forecast incoming cash—not received money—and does not reduce Actuals. An undated expectation cannot appear on a calendar.</p><p>When money returns, select the original outgoing payment and relevant detail line. Enter the received date, amount and note. Refunds cannot exceed the unadjusted original payment or remaining expectation. A shared payment can refund one line without changing another. Received cost refunds reduce net paid Actuals and expected cost; they do not reopen a settled invoice/purchase, even when a full refund leaves zero net Actuals.</p><p>Use <b>Correct / reverse</b> for an erroneous posting, not a genuine refund. Original records remain. Financial postings use corrections, not Undo. Cancel an expectation if money will no longer be returned; cancellation itself posts no cash.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Expected final, Actuals, variance and closure",
    "body": "<p><b>Budgeted</b> is your estimate. <b>Confirmed cost</b> is the agreement (or follows budget when blank). <b>Expected final</b> is the current forecast including paid amounts and remaining expected/committed cost. The budget column labels it EXPECTED FINAL; older releases called it Hot Cost or Est. Final.</p><p><b>Actuals / Net paid</b> are paid amounts minus received refunds and corrections, including preserved legacy opening values. Show Actuals reveals ACTUAL, VARIANCE and EXPECTED FINAL; Hide Actuals only hides those columns. Actuals cannot be typed directly. <b>Variance = Expected final − Budgeted</b>: red is over, green is under. Deposits alone do not create savings.</p><p><b>Finalize cost</b> sets remaining expected cost to zero when no further expense is due; it cannot bypass unpaid invoices. It is not the same as <b>Close / reopen line</b>, which checks outstanding money, expected refunds, receipts and legacy-value review. Reopen finalized cost/closed lines if circumstances change.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Production dates, funding and cash flow",
    "body": "<p>Setup → Timeline &amp; Funding sets optional pre-production/production/post-production dates, custom milestones, opening cash and its as-of date. Save timeline switches to a read-only summary; Edit timeline restores editing. Expected and received funding have separate amounts/dates.</p><p>Unpaid milestone-relative dates move when their milestone moves. Fixed dates and historical paid dates stay unchanged. Positive offsets mean days after; negative offsets mean days before. Cash Flow is budget-wide: it includes movements on/after the opening date, while earlier movements are already represented by opening cash. Expected funding is not money already in the bank.</p><p>Unallocated costs and undated installments remain <b>Not scheduled yet</b>. Contingency is a reserve, not invented dated spending. A reserve-funded allocation reduces remaining reserve without adding a second payment. Check missing dates and incoming funding before relying on a forecast.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Documents, privacy, archives and ZIP selection",
    "body": "<p>Setup → Documents allows upload first and assignment later. Keep the original filename and add an internal name, tags and account/sub-account/line/invoice/payment assignments. Search/filter every data column. Assigned means linked; Unassigned means no links; Archived is reversible organization.</p><p>New uploads default to <b>Exclude from binder by default (sensitive)</b> under Export privacy. This is a local export preference, not online sharing or access control. Archive preserves files, links and existing privacy defaults; it does not automatically exclude a file from a binder.</p><p>Preview supported documents, download originals, or use Download ZIP… to select individual, matching or all documents. Hidden checked files stay selected when searching. Review sensitive/archived files before downloading/sending. Each upload is limited to 100 MB; storage and memory also limit total capacity. PDF, PNG and JPEG can appear visibly in binders; other formats need conversion.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Budget reports, payment downloads and binders",
    "body": "<p><b>Export &amp; Share</b> handles budget PDF/Excel/CSV formatting. PDF opens the print flow; choose Save as PDF. Reports are snapshots, not restorable backups or live spreadsheet models. Its Payment &amp; document downloads shortcut opens the separate <b>Downloads</b> tab.</p><p>Downloads provides payment reports, calendars, original-document ZIP selection, a full PDF binder and backups. Payment Account/Sub-account/Vendor filters scope outgoing allocations; Vendor includes the line vendor or Paid through company. Incoming funding stays budget-wide. Payment reports include all dates; calendar date filters do not trim them.</p><p>The binder includes the whole budget, payment summary, document index and visible supported originals; payment/date filters do not trim it. Sensitive documents are excluded unless explicitly included. Missing, encrypted or unsupported included files stop export with an explanation. ZIP has its own selection, independent of payment filters.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Calendar snapshots and date ranges",
    "body": "<p>In Downloads choose <b>One calendar month</b> or <b>From / To dates</b>. PDF and .ics use the same inclusive boundaries, payment scope and history setting. Include paid payments, refunds &amp; received funding to include history. Undated entries cannot be plotted; expected refunds remain forecast incoming items.</p><p>PDF creates a page for each touched month with additional detail pages for crowded dates. A PDF range is limited to 10 years; .ics can cover longer ranges. Empty ranges produce no invented events. Calendar-view buttons use its displayed month; Custom date range… opens Downloads.</p><p>Import .ics into a new dedicated Apple/Google calendar. For an updated snapshot, delete only that old dedicated calendar and import into a new one. There is no live sync; the app does not create/delete external calendars. Live import on your calendar service still needs verification.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Saving, full backups and safe restoration",
    "body": "<p>The current installed app autosaves budgets/settings in <b>local app storage on this computer</b>. Original documents are stored separately in local document storage. It does not autosave independent .nlb files to Documents, cloud-sync, or provide native Save/Open. The Saved indicator is not proof of an external backup.</p><p><b>Export &amp; Share → Export .nlb</b> or <b>Downloads → Download full .nlb backup</b> backs up one budget, all its originals (including sensitive/archived files), history and referenced vendors. It does not include unrelated contacts or other budgets. <b>Downloads → Back up all budgets &amp; contacts…</b> creates a workspace backup with every budget, folder, vendor and original. Both contain sensitive information.</p><p>Import .nlb restores a budget as a new entry. The same import picker accepts a <b>.nlb-workspace.json</b> backup: review the confirmation to add its budgets/folders/contacts without replacing existing work. Imported originals receive new storage keys. Identical contacts can be reused; differing contact records remain separate. Verify a test restore before deleting originals. Keep external copies safely; do not clear app storage or use an uninstaller.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Import CSV / Movie Magic XML and delete safely",
    "body": "<p>The sidebar <b>Import</b> panel accepts budget/workspace backups, CSV and Movie Magic XML. CSV uses the app’s layout and is not a full-fidelity financial/document backup. XML opens a review: confirm ATL/BTL/BTL POST/OTHER, contingency, fringe definitions, groups, globals and unit plurals/hour-equivalence where offered. Bare codes may lack full definitions; compare imported totals with the original.</p><p>A row’s six-dot menu → Delete this line deletes that row and, for a parent, its children. Header three-dot menu → Delete offers all/current-list or selected rows. Enter confirms; Escape cancels. Financial records or protected document links can block deletion: keep history and use payment corrections, cancellations or archival instead. Ordinary budget deletions can be undone; posted financial history cannot be erased by Undo. Back up before removing a whole budget or doing bulk edits.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Contingency, locked baseline, Find and shortcuts",
    "body": "<p>Click the Top Sheet Contingency summary to set its percentage. Budget contingency includes fringes and is included in Grand Total; cash-flow reserve remains separate from dated payments. <b>Lock Budget</b> saves Grand Total as Original Total; it does not prevent editing or freeze each line. Its baseline variance is distinct from Expected final − Budgeted. Re-lock Original replaces the baseline after confirmation; Unlock removes the comparison.</p><p>Find searches the selected budget’s account/sub-account names and detail descriptions. Cmd/Ctrl+N creates a budget; +F toggles Find; +E opens Export &amp; Share; +M opens Setup; +Z undoes supported edits; +Shift+Z redoes. Normal copy/paste works in text fields. Escape closes supported menus/dialogs or cancels confirmation.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Version and manual Mac updates",
    "body": "<p>View version in <b>NO LONGER BUDGET → About</b>. Check for Updates… / How to Update… use guided manual installation, not automatic download/restart.</p><ol><li>Create external full backups of important budgets—or all budgets and contacts.</li><li>Download the release’s <b>arm64.dmg</b> for Apple Silicon Mac.</li><li>Quit with Cmd+Q, open the DMG, drag the app to Applications and choose Replace.</li><li>Reopen from Applications; check About, budgets, payment history and document previews.</li></ol><p>Replacing the application is intended to preserve local data. Do not clear app storage, use an uninstaller or disable macOS security. If blocked, use System Settings → Privacy &amp; Security → Open Anyway if offered. Native Mac installation still requires a real-device check.</p>"
  },
  {
    "group": "How-to guides",
    "title": "Breadcrumbs, Back / Forward and vendor defaults",
    "body": "<p>The Payments &amp; Timeline workspace shows your budget, section and deeper account/sub-account/line or editor in clickable breadcrumbs. Click an ancestor to return up a level. Back / Forward arrows revisit spaces during this open workspace, including document previews and vendor/document editors. History resets when the workspace closes or the budget changes.</p><p>Unposted editor drafts are kept in this temporary history; navigating does not save a cost or post money. A successfully saved/cancelled editor is not restored as a new financial posting. Document preview URLs are recreated on return. Uploaded originals remain in the library even if an invoice draft is not saved.</p><p>Parent <b>Default vendor &amp; payroll company</b> panels start collapsed; click their heading to review/edit defaults. Payment-list PDFs use alternating record backgrounds and separators; the budget PDF, binder and calendar layouts are unchanged.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "What do the stages and yellow/green signs mean?",
    "body": "<p>Estimated means not confirmed/invoiced/paid yet. Confirmed means cost/vendor reviewed. Invoiced means an unpaid invoice exists. Partially paid means paid history exists and cost remains. Paid means the recorded purchase is settled, but evidence/refunds may still need follow-up. Closed means closure checks passed. Stages are calculated, not manually picked. Only the currency sign beside Total changes: yellow for an invoiced line with outstanding cost, green for Paid/Closed. A parent sign aggregates children. Green does not mean every receipt or refund is complete.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "Why does uploading an invoice not change Actuals?",
    "body": "<p>Files are evidence, not financial postings. Enter invoice metadata to record an obligation; explicitly record money already paid to update Actuals. Uploading a receipt or assigning a file never creates a second payment.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "Why is a deposit not showing as under budget?",
    "body": "<p>Actuals show money paid so far. Expected final also keeps remaining expected/committed cost. For a $1,000 job with a $200 deposit, Actuals can be $200 while Expected final remains $1,000. Variance uses the forecast, not simply payments to date.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "Why can I not close a Paid line?",
    "body": "<p>Check outstanding expected refunds, missing payment receipts and unreviewed legacy opening Actuals. Attach evidence, record/cancel legitimate return expectations and review legacy values. Finalize cost and Close line are different; neither should be used to hide genuine unpaid obligations.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "How do I pay without an invoice or receipt?",
    "body": "<p>Record payment without invoice… handles direct expenses/reimbursements. A receipt/payment confirmation is requested. Skip receipt for now must be explicitly checked; add evidence later. A note is optional but helpful. This records an already completed payment—it does not pay the vendor.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "How do I avoid counting invoices, plans and fringes twice?",
    "body": "<p>Link an existing payment plan when the invoice covers the same obligation. Do not add a second unrelated plan for it. Allocate a parent invoice once across children. Base + fringe equals the invoice total; fringe breakdown and budget fringe rows are informational, not extra amounts to add again.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "Can one payroll invoice cover several crew members?",
    "body": "<p>Yes. Keep crew members on separate detail lines, use the payroll company as Paid through, and allocate the shared invoice across their lines. Crew/vendor and actual payment recipient remain distinct. Enter figures from the payroll report; payroll/tax calculations are outside this app.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "What happens when I change costs or production dates?",
    "body": "<p>Blank confirmed costs follow budget changes; explicit confirmed amounts do not. Unpaid percentage/remaining plans adjust with applicable expected costs. Paid postings and fixed invoice amounts remain historical. Unpaid milestone-relative dates slide; fixed dates and posted paid dates stay unchanged.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "Why is money listed as Not scheduled yet?",
    "body": "<p>Some expected cost has not been allocated to a plan, or an installment has no usable due date/milestone date. It remains visible as a requirement but cannot be put on a calendar. Contingency is a separate reserve; the app does not invent spending dates for it.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "What is the difference between a refund and a correction?",
    "body": "<p>A refund records genuine money coming back. A correction/reversal fixes an erroneous outgoing posting. Both retain original history. Expected refunds are forecasts only; received refunds reduce net Actuals. Fully refunded purchases remain settled even when net paid becomes zero.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "What does Archived or Export privacy protect?",
    "body": "<p>Archive preserves records/files/links and can be undone; it is not deletion or automatic export exclusion. Export privacy controls default binder inclusion only. Explicit ZIP selection and full backups can include sensitive/archived files. There are no online access permissions or share links.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "Which file should I send, and which file should I keep?",
    "body": "<p>Send reviewed PDF/Excel/CSV reports or a binder for reading; ZIP carries selected original documents. Keep .nlb for restoring one budget, or .nlb-workspace.json for all budgets/contacts/folders. Backups contain financial history and sensitive originals; they are not sanitized sharing files.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "Does a budget backup include my whole vendor contact book?",
    "body": "<p>No. A single-budget .nlb includes referenced vendors only. Use Back up all budgets &amp; contacts… for every contact, including unassigned/archived contacts, and all budgets/folders/documents. Import is additive; it does not overwrite existing budgets.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "Does Duplicate create an unpaid budget for a new project?",
    "body": "<p>No. Duplicate copies the current financial state, invoices, posted history and documents while clearing its locked Original Total. Original document storage is independent; vendor contacts stay shared. Use + New Budget for a blank project. Duplication is not an external backup.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "Where is my data, and what if saving or export fails?",
    "body": "<p>Data is local to this app/computer; Saved means local autosave, not cloud backup. If saving fails or storage is full, keep the app open, stop editing and try exporting a full backup. If a binder reports a missing/unsupported/encrypted document, restore the original or convert it to supported PDF/PNG/JPEG; do not assume it was included. Do not clear storage to troubleshoot before securing backups.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "What is not implemented, and what still needs real-device verification?",
    "body": "<p>No bank transfers/reconciliation, automatic document reading, payroll engine, live calendar sync, cloud collaboration or online document sharing. Mac updates are manual. Browser workflow and backup tests do not substitute for native Mac installation/printing or Apple/Google calendar-import checks. The app is a budgeting/payment-record tool, not a full general ledger or tax system.</p>"
  },
  {
    "group": "FAQ & troubleshooting",
    "title": "Can I buy the developers a coffee?",
    "body": "<p>The support option is a placeholder: <b>Not active at the moment</b>. Buy us a coffee is disabled. It does not open a website, collect payment details, create a subscription or add a budget expense. The approved message includes: “Contribute once, regularly, or never—the app works exactly the same either way.”</p><p>Any future support will go to No Longer Network. Stripe and the NLN website are not connected to this placeholder; hosting is being changed. There is no annual-cost claim or required contribution.</p>"
  }
];
