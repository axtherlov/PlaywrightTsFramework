# Agents & Documentation Index

Entry point for AI agents working in this repository.

## Project Overview

See [README.md](README.md) for setup instructions, project layout, and how to run tests and reports.

---

## Framework Rules

Load [docs/test-framework/rules.md](docs/test-framework/rules.md) first — it is the master orchestrator and references all detail rule files:

| File                                                       | Governs                                       |
| ---------------------------------------------------------- | --------------------------------------------- |
| [selectors.md](docs/test-framework/selectors.md)           | Selector priority order; forbidden patterns   |
| [page-objects.md](docs/test-framework/page-objects.md)     | POM structure, `goto()`, getter-only locators |
| [fixtures.md](docs/test-framework/fixtures.md)             | Fixture dependency injection                  |
| [enums.md](docs/test-framework/enums.md)                   | Enums for repeated strings                    |
| [test-standards.md](docs/test-framework/test-standards.md) | GWT steps, tagging, assertions, imports       |
| [config.md](docs/test-framework/config.md)                 | Environment config, `envConfig` usage         |

---

## Agents

| Agent                       | File                                                                                                   | Use when                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `playwright-test-healer`    | [.github/agents/playwright-test-healer.agent.md](.github/agents/playwright-test-healer.agent.md)       | Tests are failing and need to be fixed     |
| `playwright-test-generator` | [.github/agents/playwright-test-generator.agent.md](.github/agents/playwright-test-generator.agent.md) | Generating tests from a scenario or plan   |
| `playwright-test-planner`   | [.github/agents/playwright-test-planner.agent.md](.github/agents/playwright-test-planner.agent.md)     | Creating a test plan for a page or feature |

---

## Skills

| Skill            | File                                                                             | Use when                                                         |
| ---------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `playwright-cli` | [.claude/skills/playwright-cli/SKILL.md](.claude/skills/playwright-cli/SKILL.md) | Exploring a live page, discovering locators, debugging selectors |

---

## Prompts

See [docs/prompts/prompts.md](docs/prompts/prompts.md) for ready-to-use prompts for common tasks.
