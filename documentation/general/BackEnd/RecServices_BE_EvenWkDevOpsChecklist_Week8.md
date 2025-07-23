# RecServices BE DevOps Even Week Planning Checklist

Complete the following checklist as part of your weekly meetings:

> As there no installation expected for the 1st interation, this checklist is not applicabile for week 04.
## 8. Monitor Phase Checklist
**Goal: Gain insights into system behavior, user experience, and app health.**

- [ ] Are key metrics (e.g., latency, errors, usage) being collected?
- [X] Are alerts firing appropriately (not too noisy or silent)?
- [X] Are log files complete and accessible?
- [X] Is end-user feedback monitored?
- [ ] Are monitoring tools integrated into dashboards?
- [ ] Are business metrics (conversion, retention) visible?
- [X] Have recent anomalies been investigated?
- [X] Are alerts reviewed and refined regularly?

Evidance Summary:
> Provide evidence that each of these items was completed.
* Latency and performance metrics are not being measured yet, nor have we tested business metrics yet.  We also do not currently have a dashboard to monitor any data.  However, we are logging error data and using the Chrome developer tools to read feedback from the console.
* We are keeping track of long-lasting errors and communicating with each other about them while we work on creating fixes.
* Some errors are affecting other teams, but we are communicating with them to make progress as efficiently as possible.

## 1. Plan Phase Checklist
**Goal: Align on goals, priorities, and project scope.**

- [X] Are the goals and deliverables for the sprint/project clearly defined?
- [X] Are user stories/tasks well-defined and prioritized?
- [X] Are dependencies identified and addressed?
- [ ] Is the backlog refined and up to date?
- [X] Are planning tools (GitHub projects) current?
- [X] Has stakeholder feedback been considered?
- [X] Do team members understand their responsibilities?
- [X] Are risks identified and mitigation strategies discussed?

Evidance Summary:
> Provide evidence that each of these items was completed.
* We have a document used for keeping track of tasks, issues, and methodologies.
* We are still developing functionalities after the switch to RLS and react, but GitHub has been updated with everything we need to continue.
* We are meeting with the customer now and then to make sure we know what they want, and incorporate those needs into our tasking.
* We hold weekly meetings to discuss team and individual tasks.
* We discuss potential conflicts of tasks during our team meetings
* We have ensured that each system has installed all necessary libraries to run our code.  These dependencies are listed in the project files

---

## 2. Develop Phase Checklist
**Goal: Ensure high-quality, maintainable code is being written.**

- [X] Is the codebase building and running locally without issues?
- [X] Are coding standards being followed?
- [ ] Are there sufficient unit tests?
- [X] Is code being committed regularly and with meaningful messages?
- [X] Is code reviewed and merged through pull requests?
- [ ] Is technical debt being tracked and managed?
- [X] Is documentation (code/comments) being updated?
- [X] Are new features being tested in isolation?

Evidance Summary:
> Provide evidence that each of these items was completed.
* The code runs well.  Only one new issue has arisen, with which we are awaiting the FE team's review in order to proceed
* We keep code organized the same way, following industry standards as closely as we can
* Code-based unit tests are yet to be developed, but we do have a testing procedure for each completed task
* Each team member pushes their code to the BE-Development branch or a related branch and I review them
* ReadMe files and comments are frequently added to the code to aid with the development process
* New features are tested by at least two people after completion

---

## 3. Build Phase Checklist
**Goal: Confirm the application is being built consistently and reliably.**

- [X] Are automated builds working correctly?
- [X] Is the build process reproducible?
- [X] Are build times reasonable?
- [X] Are build scripts version-controlled and documented?
- [X] Are failed builds being addressed quickly?
- [X] Are build artifacts stored in a repository?
- [X] Are dependencies clearly defined and locked?
- [ ] Are code signing or security scans integrated into the build?

Evidance Summary:
> Provide evidence that each of these items was completed
* Builds are working quickly and effectively on each system that has the correct dependencies installed
* Build changes are logged in GitHub with effective push notes
* Failed builds are always fixed within 2-3 days
* Dependencies are listed in the project files and hidden from the public
* There are currently no automated code review systems
