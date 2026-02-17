# Blessed TUI Base (Opencode-Inspired)

A minimal, extensible Terminal UI built with blessed for Node.js.

This is a clean base layout designed to be expanded into more complex systems (chat interfaces, AI shells, planners, builders, dashboards, etc.).  
The UI is inspired by the Opencode interface concept: split layout, message bubbles, mode switching, and keyboard-driven control.

---

## Features

- Split 75% / 25% layout
- Scrollable message panel
- Bottom input panel with mode indicator
- Mode switching (PLAN / BUILD) via Tab
- Clean Ctrl+C / Ctrl+Z exit handling
- Mouse + keyboard support
- 256-color terminal support
- Fully extensible component structure

---

## Architecture Overview

### Screen

const screen = blessed.screen({
    useBCE: true,
    title: "TUI",
    mouse: true,
    fullUnicode: true,
    warnings: false
});

- fullUnicode enables proper block characters.
- useBCE improves background rendering.
- Mouse and keyboard enabled.

---

### Panels

#### Left Panel (75%)
Main interactive area:
- Scrollable messages
- Input box

#### Right Panel (25%)
Static content area.
Can later hold:
- Logs
- Context
- File tree
- Status indicators
- Metrics
- AI thoughts
- Anything structured

---

### Message System

Messages are rendered as fixed-height bubbles with vertical accent bars:

Positioning is controlled manually using messageOffset.

This allows:
- Custom bubble layout
- Variable rendering logic
- Easy theming
- Future animation control

---

### Mode System

Modes:
- PLAN
- BUILD

Switch with:

Tab

The input box accent color changes:
- PLAN → Green
- BUILD → Red

Mode rendering is centralized via:

function setMode(newMode)

This makes extending modes trivial.

---

## Controls

Key        | Action
-----------|--------------------
Enter      | Submit message
Tab        | Toggle mode
Ctrl+C     | Exit cleanly
Ctrl+Z     | Exit cleanly
q          | Exit cleanly
Mouse      | Scroll messages

---

## Extending This Base

This is intentionally minimal.

You can build on top of it:

### 1. Dynamic Bubble Height
Calculate height based on text wrapping.

### 2. Message Types
Different colors for:
- User
- System
- Error
- Assistant
- Debug

### 3. Command Parsing
Add /commands inside submit handler.

### 4. Async Streaming
Replace addMessage() with streaming chunks.

### 5. Status Line
Add:
- Token counters
- Network state
- Mode hints

### 6. Right Panel Expansion
Ideas:
- File explorer
- JSON inspector
- Execution logs
- AI reasoning tree
- Network scanner output
- Markdown preview

### 7. Multi-Line Input
Switch to:
- blessed.textarea
- Auto-resize height

### 8. State Engine
Move logic into:
- UI layer
- State layer
- Command layer
- Renderer layer

---

## Design Philosophy

- Keyboard-first
- Minimal but expressive
- Visual clarity via accent bars
- No unnecessary borders
- Expandable without layout rewrites
- Controlled rendering
- No external UI dependencies

---

## Why Inspired by Opencode

The design takes inspiration from Opencode's:
- Clean split interface
- Minimal UI noise
- Mode-driven workflow
- Developer-centric UX

This implementation recreates the structural feel while remaining fully customizable and self-contained.

---

## Terminal Requirements

Recommended:

TERM=xterm-256color

Ensure your terminal supports:
- 256 colors
- Unicode block characters

---

## Installation

npm install blessed

Run with:

node index.js

---

## Next Step Suggestions

- Convert into a reusable TUI framework
- Abstract bubble renderer
- Implement layout engine
- Add plugin system
- Build AI shell
- Build network toolkit
- Build structured workflow engine

---

## License

Use freely. Extend aggressively.
