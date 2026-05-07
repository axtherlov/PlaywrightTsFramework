# Test case guide

> **Purpose:** This document defines the structure and conventions for all test cases `.md` files in this project.
> Every story file is designed to be read by an agent that will generate test cases in BrowserStack Test Management using the **Steps** template.

---

## File Naming Convention

Each test case file follows this pattern:

```
<user-story-id>_<short-description>.md
```

| Part                | Description                                                                    |
| ------------------- | ------------------------------------------------------------------------------ |
| `user-story-id`     | The story identifier in uppercase (e.g. `US-001`)                              |
| `short-description` | Lowercase, hyphen-separated summary of the scenario (e.g. `purchase-as-guest`) |

**Examples:**

- `US-001_purchase-as-guest.md`
- `US-002_purchase-as-registered-user.md`

---

## Location of Test Cases

All test case files live under: `docs/test-cases/`

---

## Test Design Techniques Used

| Technique                | Abbreviation | When applied                                                                |
| ------------------------ | ------------ | --------------------------------------------------------------------------- |
| Equivalence Partitioning | EP           | Input fields with many possible values — group into valid/invalid classes   |
| Boundary Value Analysis  | BVA          | Numeric or length inputs — test at min, max, min-1, max+1                   |
| Decision Table           | DT           | Business rules with multiple condition combinations                         |
| State Transition         | ST           | Flows where the system changes state (e.g. logged out → logged in → locked) |
| Use Case / User Journey  | UC           | End-to-end happy path and main alternative flows                            |

Each test case is tagged with the technique(s) it applies.

---

## Test Case Fields (BrowserStack Steps Template)

Each test case in the `.md` maps to the following BrowserStack fields:

| Field               | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| **Title**           | Short, action-oriented. Format: `[Verb] [what] [condition]` |
| **Preconditions**   | System state required before executing the test             |
| **Priority**        | Critical / High / Medium / Low                              |
| **Type**            | Functional / Negative / Boundary / Regression / Smoke       |
| **Steps**           | Numbered. Each step is one discrete action                  |
| **Expected Result** | What the system must do — per step or at the end            |
| **Technique**       | Which test design technique(s) this case applies            |

---

## Priority Definitions

| Priority     | Meaning                                                  |
| ------------ | -------------------------------------------------------- |
| **Critical** | Core user journey — if this fails, the feature is broken |
| **High**     | Important alternate path or error scenario               |
| **Medium**   | Edge case or less common flow                            |
| **Low**      | Cosmetic, copy, or very edge input                       |

---
