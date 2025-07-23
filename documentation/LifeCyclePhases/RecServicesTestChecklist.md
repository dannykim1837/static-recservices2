# RecServices UTP Checklist

## Contributor Table
List the names of the individuals who contributed to the UTP and what sections they completed.
| Contributor| Section assigned Task|
| --- | --- |
| Alex | Tested DB connection with CRUD operations from backend | 

## Tasks:
The following tasks should be completed in the project's repo not in the class repo, to ensure separation of tasking.

For each of the tasks, link the UTP files to the assoicated sections. (Note: when copied to the class's repo, students from other teams, will not be able to access based on access control, and that is ok.)

### Team tasks
- [ ] Create outline of Unit Test Plan and linked markdown files
- [ ] Create Section 1: System Tests (End to End or DB-FE tests)
- [ ] Create Section 2: Integration or Interface Tests
- [ ] Create Section 3: Tier Tests

### Individual tasks
For each feature that is being implemented, the associate Tier, Component, and Unit should be created. The type and feature of the test should be determine by the scope of the task. 
- [ ] Feature's Unit Tests
    * Unit test for each of the Feature's CRUD operations at the Component level.
    * If the Component Test does not exist, then it needs to be created.
    * Modify the Component Test to include the Feature's unit test.
- [ ] Feature's Component Tests
    * Component test for each of the Feature's MVC operations at the Tier level.
    * If the Tier Test does not exist, then it needs to be created.
    * Modify the Tier Test to include the Feature's component test.
- [ ] Feature's Tier Tests
    * Tier tests for each of the architecture tiers (Front-End, Back-End, and Database)
    * If the Integration Tests do not exist, then it needs to be created.
    * Modify the Integration Tests do reference the Feature's Tier tests
- [ ] Feature's Integration Tests
    * Integration Tests for each of the communications APIs. 
    * If the System Tests do not exist, then it needs to be created.
    * Modify the System tests to reference the Feature's Integration tests.
- [ ] Feature's System (End-to-End) Integration Tests
    * System tests validates that the system is working as the customer wants it.


## Audit:
- [ ] All sections are filled out base on know information
- [ ] All tests should be completed and mapped 1-to-1 to each items found in the SRS and SDD. 

## Additional Elicitation Elements not found in
If you find that a requirement or eliciation element is missing a cross reference, than as part of the review meeting add it to the meeting notes. And as an Action Item fix it. (Make sure that this document is added to SRS: Section 2)
* Action Item 1: