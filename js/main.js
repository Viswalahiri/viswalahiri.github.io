import { Terminal } from './terminal.js';
import { registerCommands, printBanner } from './commands.js';

const term = new Terminal();
registerCommands(term);
printBanner(term);

// Deep links: viswalahiri.github.io/#projects runs that command on arrival,
// so a specific view can be shared or bookmarked. Unknown values fall through
// to the normal "command not found" path, and exec() escapes what it echoes.
const deepLink = decodeURIComponent(location.hash.replace(/^#/, '')).trim();
if (deepLink && deepLink.length <= 64) term.exec(deepLink);

// Focus on load for desktop; mobile users tap to summon the keyboard.
if (matchMedia('(pointer: fine)').matches) term.focus();
