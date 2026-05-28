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

## Tags

Each test case must include one tag derived from its Priority:

| Priority | Tag          |
| -------- | ------------ |
| Critical | `smoke`      |
| High     | `regression` |
| Medium   | `regression` |
| Low      | `regression` |

Tags drive test execution filtering in BrowserStack — e.g. run only `smoke` tagged cases on every build, `regression` before a release.

---

## Add New Test Case

Follow these steps **in order** when creating a new test case. Every field is required.

### Step 1 — Write the Title

Format: `[Verb] [what] [condition/context]`

- Use action verbs: _Verify_, _Submit_, _Navigate_, _Display_, _Reject_
- Be specific enough to distinguish from similar cases
- Examples:
    - `Verify checkout completes with valid credit card`
    - `Reject login when password is incorrect`
    - `Display error when required field is empty`

---

### Step 2 — Define Preconditions

List everything that must be true **before** step 1 executes:

- System/environment state (e.g. _User is on the login page_)
- Required data (e.g. _A registered user account exists_)
- Auth state (e.g. _User is not logged in_)
- Any setup that the test itself does not perform

If there are no meaningful preconditions, write: _None_

---

### Step 3 — Assign Priority

Ask: _what is the impact if this scenario fails?_

| If the failure…                                         | Priority     |
| ------------------------------------------------------- | ------------ |
| Blocks the core user journey entirely                   | **Critical** |
| Breaks an important alternate path or key error message | **High**     |
| Affects an edge case or less-used flow                  | **Medium**   |
| Is cosmetic, copy-related, or an extreme edge input     | **Low**      |

**Do not default every case to the same priority.** A test suite where everything is Critical signals no real triage has been done.

> **BrowserStack note:** The `createTestCase` API does not accept a priority field — all cases are created with the default priority (Medium). After creation, call `updateTestCase` with the intended priority for each case.

---

### Step 4 — Select the Type

| Type           | Use when…                                                  |
| -------------- | ---------------------------------------------------------- |
| **Functional** | Verifying a feature works as specified (happy path)        |
| **Negative**   | Verifying the system handles invalid input or error states |
| **Boundary**   | Testing at or just outside the limit of an allowed value   |
| **Regression** | Re-verifying existing behaviour after a change             |
| **Smoke**      | Minimal check that the feature is alive and reachable      |

---

### Step 5 — Write the Steps with Expected Results

Each step must be **one discrete, observable action**. Embed the expected result **inside the same step** using an `→` marker so the reader knows what to verify without hunting through a separate section.

Format:

```
1. [Action] → [Expected result]
2. [Action] → [Expected result]
...
```

Rules:

- Start each action with a verb (_Click_, _Enter_, _Select_, _Navigate to_, _Submit_)
- Expected results describe what the **system** does, not what the user does
- If a step has no verifiable output (e.g. a navigation step leading into the next action), combine it with the next step or note the URL/page that appears
- The final step must always have a clear, unambiguous expected result

Example:

```
1. Navigate to /login → Login page is displayed with email and password fields
2. Enter an invalid email format in the email field → No immediate error shown
3. Leave the password field empty and click "Sign in" → Error message "Invalid email or password" is displayed; user remains on /login
```

---

### Step 6 — Apply the Tag

Derive the tag directly from the Priority assigned in Step 3:

| Priority | Tag          |
| -------- | ------------ |
| Critical | `smoke`      |
| High     | `regression` |
| Medium   | `regression` |
| Low      | `regression` |

---

### Quick Checklist Before Saving

- [ ] Title follows `[Verb] [what] [condition]` format
- [ ] Preconditions cover all required setup (or explicitly say _None_)
- [ ] Priority reflects actual impact — not every case is Critical
- [ ] Type matches the nature of the scenario
- [ ] Every step has an expected result inline (`→`)
- [ ] Tag matches Priority per the table above
- [ ] Technique tag is included (EP / BVA / DT / ST / UC)

---
