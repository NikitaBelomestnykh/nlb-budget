// Ad-hoc code-signs the packaged Mac app so Gatekeeper shows the
// "unidentified developer" flow (which has a working Open Anyway
// override) instead of the harsher "app is damaged" block that
// applies to fully unsigned apps. This does NOT require a paid
// Apple Developer account — ad-hoc signing (identity "-") is free
// and built into macOS. Replace this once real Developer ID signing
// + notarization is set up.

const { execFileSync } = require('child_process');
const path = require('path');

module.exports = async function afterPack(context) {
  if (context.electronPlatformName !== 'darwin') return;

  const appName = context.packager.appInfo.productFilename;
  const appPath = path.join(context.appOutDir, `${appName}.app`);

  console.log(`[adhocSign] Ad-hoc signing ${appPath}`);
  execFileSync('codesign', ['--force', '--deep', '--sign', '-', appPath], {
    stdio: 'inherit',
  });
  console.log('[adhocSign] Done.');
};
