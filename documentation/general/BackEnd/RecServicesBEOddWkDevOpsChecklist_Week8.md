# DevOps Odd Week Planning Checklist

Complete the following checklist as part of your weekly meetings:

## 4. Test Phase Checklist
**Goal: Verify the application’s functionality, stability, and security.**

- [X] Are automated tests (unit, integration, end-to-end) passing?
- [X] Is there adequate test coverage for new features?
- [X] Are flaky tests being addressed?
- [X] Is regression testing being done?
- [X] Are test environments stable and reflective of production?
- [X] Are test results visible to the team?
- [ ] Are edge cases and error states tested?
- [ ] Is performance or load testing being considered?

Evidance Summary:
> Provide evidence that each of these items was completed.
* Due to the current status and nature of our tasking (in relying on multiple systems that our team does not govern), we do not have any automated tests, but all manual tests are currently passing.
* We test all new features and do not move on until they pass.
* Flaky tests up to this point have almost always been caused by not installing the right dependencies.
* Due to the change in our project structure a few weeks ago, there is not much to test regressively, but we do test the whole product as far as we are capable about once a week or more.
* Test environments been made stable and reflective of production
* Test cases in code are not shown or logged, but errors are logged and successes are repeated by other team members.
* Edge cases have not yet been tested.
* Performance and load testing has not been considered yet - the team's project environment is too small for that at the moment.
---

## 5. Release Phase Checklist
**Goal: Ensure readiness and coordination for safe deployments.**

- [X] Is the release process documented and repeatable?
- [X] Has the release been tested in a staging/pre-prod environment?
- [X] Are all release artifacts validated and versioned?
- [X] Is the changelog updated and shared?
- [ ] Have release notes been created for stakeholders?
- [X] Are rollback procedures ready and tested?
- [X] Are there any manual deployment steps?
- [X] Is a release window or approval needed?


Evidance Summary:
> Provide evidence that each of these items was completed.
* We are working on all documentation as needed.
* All functional components have been tested in a pre-production environment.
* All releases and updates are processed and stored through GitHub.
* Github changelogs are automatically updated and public for all to see.
* Notes for stakeholders have not yet been provided.
* Rollback procedures are ready and have been tested.
* Yes, all updates are fully handled manually.
* Approval for major changes is needed.

---

## 6. Deploy Phase Checklist
**Goal: Deploy the application reliably with minimal downtime.**

- [ ] Is deployment automated (CI/CD pipeline)?
- [X] Have recent deployments succeeded?
- [X] Are post-deployment checks or smoke tests passing?
- [X] Is monitoring set up to track deployment issues?
- [X] Have environment-specific configs been verified?
- [ ] Is feature flagging or canary deployment being used?
- [ ] Are stakeholders informed of the deployment?
- [ ] Are deployment metrics being tracked?
* Everything is manual at the moment.
* Nothing is deployed until it is successful unless it needs to be pushed forward for others to work on it.
* Smoke tests are passing in every major deployment.
* Github monitoring and team checks are set up.
* Environment-specific configs have been verified.
* I am unaware of any updates being sent to the stakeholders.
* We are not gathering data on deployment statistics.

---

## 7. Operate Phase Checklist
**Goal: Ensure the system is stable, scalable, and performant.**

- [X] Are infrastructure and services healthy?
- [X] Are incidents or outages documented and reviewed?
- [ ] Are monitoring dashboards accurate and actionable?
- [X] Is logging sufficient and searchable?
- [ ] Are SLAs/uptime goals being met?
- [X] Are cost metrics or optimizations reviewed?
- [X] Are backups working and recoverable?
- [ ] Is infrastructure-as-code being used and versioned?

Evidance Summary:
> Provide evidence that each of these items was completed.
* All reports are showing positive signs.
* All BE issues are sent up to me, and then they are reviewed either by myself or during team meetings.
* We have no monitoring dashboards.
* Github tools provide us with searchable logs.
* Uptimes are not being measured.
* All updates are reviewed.
* Backups, both local and on GitHub, are working and recoverable.
* Everygthing is manual for now.
