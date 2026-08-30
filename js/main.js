import { Terminal } from './terminal.js';
import { registerCommands, printBanner } from './commands.js';

const term = new Terminal();
registerCommands(term);
printBanner(term);

// Focus on load for desktop; mobile users tap to summon the keyboard.
if (matchMedia('(pointer: fine)').matches) term.focus();
