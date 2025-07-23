## 8. Monitor Phase Checklist
**Goal: Gain insights into system behavior, user experience, and app health.**

- [ ] Are key metrics (e.g., latency, errors, usage) being collected?
- [ ] Are alerts firing appropriately (not too noisy or silent)?
- [ ] Are log files complete and accessible?
- [x] Is end-user feedback monitored?
- [ ] Are monitoring tools integrated into dashboards?
- [ ] Are business metrics (conversion, retention) visible?
- [x] Have recent anomalies been investigated?
- [ ] Are alerts reviewed and refined regularly?

## 1. Plan Phase Checklist
**Goal: Align on goals, priorities, and project scope.**

- [x] Are the goals and deliverables for the sprint/project clearly defined?
- [x] Are user stories/tasks well-defined and prioritized?
- [x] Are dependencies identified and addressed?
- [ ] Is the backlog refined and up to date?
- [x] Are planning tools (GitHub projects) current?
- [x] Has stakeholder feedback been considered?
- [x] Do team members understand their responsibilities?
- [ ] Are risks identified and mitigation strategies discussed?


## 2. Develop Phase Checklist
**Goal: Ensure high-quality, maintainable code is being written.**

- [x] Is the codebase building and running locally without issues?
- [x] Are coding standards being followed?
- [ ] Are there sufficient unit tests?
- [x] Is code being committed regularly and with meaningful messages?
- [x] Is code reviewed and merged through pull requests?
- [x] Is technical debt being tracked and managed?
- [x] Is documentation (code/comments) being updated?
- [x] Are new features being tested in isolation?

## 3. Build Phase Checklist
**Goal: Confirm the application is being built consistently and reliably.**

- [ ] Are automated builds working correctly?
- [x] Is the build process reproducible?
- [x] Are build times reasonable?
- [ ] Are build scripts version-controlled and documented?
- [ ] Are failed builds being addressed quickly?
- [x] Are build artifacts stored in a repository?
- [x] Are dependencies clearly defined and locked?
- [ ] Are code signing or security scans integrated into the build?

### Tasks
| Task Description | Assigned Team | Notes |
|------------------|---------------|-------|
| User Authentication table creation | DB | Integrate Supabase auth users table |
| Migrate codebase to EJS or React | FE | Move to react or EJS to allow templates |
| Supabase table changes | DB | Fix DB table structure errors |
| Implement CRUD into frontend JS | BE | Use built controllers to begin moving/testing data from DB |

