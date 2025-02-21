function getVersion() {
  const buildInfo = require('./git_build_info').getGitBuildInfo();
  if (!buildInfo) {
    console.error('[!] Unable to retrieve git build info.');
    process.exit(1);
  }

  // e.g. "hues-a339x-dal-v1.2.3"
  const { tag, shortHash } = buildInfo;

  if (tag) {
    // Attempt to parse a version from the tag. Adjust the regex to your tag pattern:
    // This regex looks for "-v" followed by something like "1.2.3"
    const match = tag.match(/-v(\d+\.\d+\.\d+)/);
    if (match) {
      // e.g. match[1] is "1.2.3"
      return match[1];
    }
    // If there's a tag but not in the expected format, log a warning and fallback
    console.warn(`[!] Tag "${tag}" not in the expected format. Using short commit hash instead.`);
  }

  // Fallback to short commit hash
  if (shortHash) {
    return shortHash;
  }

  console.error('[!] No valid version found (no suitable tag, no commit hash).');
  process.exit(1);
}

module.exports = { version: getVersion() };