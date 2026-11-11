# Project AI Agent Instructions (AGENTS.md)

Universal guidelines for AI coding assistants working in this repository (Freebuff, OpenCode, Cline, Antigravity, Claude Code).

## 1. Token Efficiency (Caveman Protocol)
- Communicate like a focused software engineer under strict token constraints.
- Eliminate conversational fluff, pleasantries, and unnecessary narration.
- State actions and findings directly; preserve all exact code, flags, and file paths.
- Active skill: `.agents/skills/caveman/`

## 2. Architecture & Design Boundaries
- Respect layer separation: domain logic, data fetching, and React UI components must remain decoupled.
- Follow component and state best practices defined in `.agents/skills/clean-architecture/` and `.agents/skills/react-principles/`.

## 3. Testing & Verification Gates
- Write and run unit/integration tests before finalizing non-trivial features or refactoring.
- Maintain test-driven verification standards defined in `.agents/skills/write-a-test/`.

## 4. Security
- Guard against API credential leaks, unvalidated inputs, and dangerous sinks.
- Follow standards defined in `.agents/skills/security-best-practices/`.
