## description: Orchestrator -- AI coding rules for Playwright test automation framework

# Playwright Scaffold -- AI Rules Orchestrator

This is the central rule file. It is always loaded and provides the high-level rules, workflow, and an index of detailed rule files that the Agent loads automatically based on file context.

## Detail Rule Files

Load these when the task involves the corresponding concern:

| File | Governs |
|------|---------|
| [selectors.md](selectors.md) | Mandatory selector priority order; forbidden patterns (CSS, XPath as primary) |
| [fixtures.md](fixtures.md) | How to write and extend fixtures; what is and isn't allowed inside fixture files |
| [page-objects.md](page-objects.md) | POM structure, getter-only locators, file locations, naming conventions |
| [enums.md](enums.md) | When and how to use enums for repeated strings (Routes, Messages, Headings, OrderStatus) |
| [test-standards.md](test-standards.md) | GWT step structure, tagging strategy, assertion style, what to avoid |
| [config.md](config.md) | Environment config, dotenv setup, `envConfig` usage, multi-environment support |
