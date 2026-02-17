import blessed from "blessed";
process.env.TERM = 'xterm-256color';

// ==========================================
// SETUP SCREEN
// ==========================================

const screen = blessed.screen({
    useBCE: true,
    title: "TUI",
    mouse: true,
    fullUnicode: true,
    warnings: false
});

const THE_GREY_COLOR = "#222"

// ==========================================
// DEFINE LAYOUT
// ==========================================

const left = blessed.box({
    top: 0, left: 0, width: "75%", height: "100%",
});

let mode = 'BUILD';

const inputBox = blessed.box({
    parent: left,
    bottom: 0,
    width: "100%-4",
    left: "center",
    height: 5,
    tags: true,
    style: { bg: THE_GREY_COLOR, fg: 'white' },
    content:
        '{red-fg}▌{/}\n' +
        '{red-fg}▌{/}\n' +
        '{red-fg}▌{/}\n' +
        '{red-fg}▌{/}  ' + mode + ' - Ctrl+C to Exit\n' +
        '{red-fg}▌{/}'
});

const input = blessed.textbox({
    parent: inputBox,
    top: 1, left: 3, width: "100%-6", height: 1,
    style: { bg: THE_GREY_COLOR },
    inputOnFocus: true,
    mouse: true,
    keys: true,
});

const messages = blessed.box({
    parent: left, top: 0, left: "center", width: "100%-4", height: "100%-6",
    padding: { top: 1, bottom: 1 },
    scrollable: true, alwaysScroll: true, mouse: true, keys: true, vi: true,
});

const right = blessed.box({
    top: 0, left: "75%", width: "25%", height: "100%",
    style: { bg: THE_GREY_COLOR },
    padding: { left: 3, right: 1, top: 1, bottom: 1 },
    content: "Static content here"
});

screen.append(left);
screen.append(right);

// ==========================================
// LOGIC
// ==========================================
let messageOffset = 0;

function addMessage(text) {
    const bubbleHeight = 3;
    const gap = 1;
    const formattedContent =
        '{blue-fg}▌{/}\n' +
        '{blue-fg}▌{/}   ' + text + '\n' +
        '{blue-fg}▌{/}';

    const bubble = blessed.box({
        parent: messages,
        left: 0,
        top: messageOffset,
        width: "100%",
        height: bubbleHeight,
        tags: true,
        content: formattedContent,
        style: { bg: THE_GREY_COLOR, fg: 'white' }
    });
    messageOffset += (bubbleHeight + gap);
    screen.render();
    messages.setScrollPerc(100);
    screen.render();
}

// ==========================================
// INPUT HANDLING
// ==========================================

input.on("submit", (value) => {
    if (value.trim()) addMessage(value);
    input.clearValue();
    input.focus();
    screen.render();
});

function setMode(newMode) {
    mode = newMode;
    const color = mode === "PLAN" ? "green" : "red";
    inputBox.setContent(
        `{${color}-fg}▌{/}\n` +
        `{${color}-fg}▌{/}\n` +
        `{${color}-fg}▌{/}\n` +
        `{${color}-fg}▌{/}  ${mode} - Ctrl+C to Exit\n` +
        `{${color}-fg}▌{/}`
    );
}

input.key("tab", () => {
    const val = input.getValue().replace(/\t/g, "");
    input.setValue(val);
    setMode(mode === "PLAN" ? "BUILD" : "PLAN");
    screen.render();
    return false;
});

// ==========================================
// EXIT HANDLING (Clean Exit)
// ==========================================

const forceExit = () => {
    screen.destroy();
    process.exit(0);
};

screen.key(['C-c', 'q'], forceExit);
input.key(['C-c'], forceExit);
screen.program.key('C-c', forceExit);
screen.key(['C-z'], forceExit);
screen.program.key('C-z', forceExit);

input.focus();
screen.render();
