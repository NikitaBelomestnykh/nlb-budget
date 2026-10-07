# Payments, timeline and documents — v1.10.0

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
