<!--
Sync Impact Report
Version change: Unadopted scaffold -> 1.0.0
Modified principles:
- Principle slot 1 -> I. Specification-First Development
- Principle slot 2 -> II. Responsible AI Use
- Principle slot 3 -> III. Incremental, Verifiable Delivery
- Principle slot 4 -> IV. Meaningful Version Control
- Principle slot 5 -> V. Documented Decisions and Simplicity
Added sections: Technology and Quality Constraints; Development Workflow
Removed sections: None
Follow-up TODOs: Confirm the original ratification date with the project owner.
-->
# Course Web Application Constitution

## Core Principles

### I. Specification-First Development
Every feature MUST begin with a written specification that states its purpose, user-visible
behavior, and acceptance criteria. Implementation MUST wait until those criteria are clear.

### II. Responsible AI Use
AI tools MAY be used throughout the project. Students MUST understand, verify, and be able to
explain all submitted work, including AI-generated work; unverified or misunderstood output MUST
be corrected or excluded.

### III. Incremental, Verifiable Delivery
Features MUST be implemented in small, runnable increments. Each increment MUST be checked against
its relevant acceptance criteria before work proceeds to the next one.

### IV. Meaningful Version Control
Each Git commit MUST capture one coherent change and use a concise, descriptive message. Commits
MUST NOT include secrets or unrelated changes.

### V. Documented Decisions and Simplicity
Important technical or product decisions MUST record their context, chosen option, and consequences
in the project documentation. Implementations MUST prefer the simplest approach that satisfies the
approved specification.

## Technology and Quality Constraints
The application MUST use HTML, CSS, and JavaScript. It MUST use semantic HTML and support usable
layouts on common screen sizes. Additional frameworks or dependencies require justification in the
feature specification and approval before adoption.

## Development Workflow
For each feature, write and review its specification, implement it in small increments, check the
affected behavior in a browser and against its acceptance criteria, then commit the completed
changes. Update relevant documentation when behavior or an important decision changes.

## Governance
This constitution governs project engineering practice; feature specifications define feature
behavior. Conflicts MUST be resolved by updating the relevant specification or constitution before
implementation continues. The student author MUST review each feature and submission for
compliance, and record any approved exception with its rationale.

Amendments MUST state their rationale and be reviewed by the project owner before adoption.
Versioning follows semantic rules: MAJOR for removed or redefined principles, MINOR for new or
materially expanded requirements, and PATCH for clarifications that do not change requirements.
The project owner MUST review compliance at feature completion and before final submission.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirm with project owner | **Last Amended**: 2026-09-26
