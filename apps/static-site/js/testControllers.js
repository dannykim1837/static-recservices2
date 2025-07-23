/******************************************************************************
 ==============================================================================
 * testControllers.js
 * ---------------------------------------------
 * @description
 * Automated API endpoint tester for backend controllers.
 *
 * - Tests REST endpoints (getMany, getOne, create, update, deleteOne) for
 * employees, positions, locations, and shifts controllers.
 * - Uses fetch to send requests to the backend and records results.
 * - Writes a Markdown summary file
 * (testControllersResults/testControllersResults.md) with pass/fail status and
 * links to detailed response/error files for each test.
 * - Each detail file includes a back-link to the summary for easy navigation.
 * - Designed to be run with Node.js (not browser).
 *
 * Usage:
 *   $ node testControllers.js
 * Output:
 *   - testControllersResults/testControllersResults.md (summary)
 *   - testControllersResults/*.md (detailed results for each test)
 * @author @sowbyspencer
===============================================================================
 *****************************************************************************/

// Test each controller's REST endpoints using fetch
// Adjust baseURL if your backend runs on a different port or path
const baseURL = "http://localhost:3000";
// Use Node.js require for fs if running in Node, otherwise null for browser
const fs = typeof window === "undefined" ? require("fs") : null;
const path = typeof window === "undefined" ? require("path") : null;
const resultsDir = "./testControllersResults";
const resultsFile = path ? path.join(resultsDir, "testControllersResults.md") : "./testControllersResults/testControllersResults.md";
if (fs && !fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir);
} else if (fs && fs.existsSync(resultsDir)) {
  // Delete all files in the results directory before running tests
  for (const file of fs.readdirSync(resultsDir)) {
    fs.unlinkSync(path.join(resultsDir, file));
  }
}

const results = {};
let total = 0;
let passed = 0;
let failed = 0;

// Global file order for navigation links
const fileOrder = [];
function writeAllNavLinks() {
  for (let i = 0; i < fileOrder.length; i++) {
    const fileName = fileOrder[i];
    const filePath = path.join(resultsDir, fileName);
    const prev = i > 0 ? fileOrder[i - 1] : null;
    const next = i < fileOrder.length - 1 ? fileOrder[i + 1] : null;
    let navLinks = "";
    if (prev) navLinks += `< [Previous](${prev})`;
    if (prev && next) navLinks += " | ";
    if (next) navLinks += `[Next](${next}) >`;
    if (navLinks) navLinks = navLinks + "\n\n";
    let content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    lines.splice(1, 0, navLinks); // after the title
    fs.writeFileSync(filePath, lines.join("\n"));
  }
}

// Helper to sanitize filenames
function safeFileName(str) {
  return str.replace(/[^a-zA-Z0-9_-]/g, "_");
}

async function testController(controller) {
  results[controller] = {};
  const endpoints = {
    getMany: `${baseURL}/${controller}`,
    getOne: controller === "positions" ? `${baseURL}/${controller}/1` : `${baseURL}/${controller}/test-id-123`,
    create: `${baseURL}/${controller}`,
    update: controller === "positions" ? `${baseURL}/${controller}/1` : `${baseURL}/${controller}/test-id-123`,
    deleteOne:
      controller === "positions"
        ? `${baseURL}/${controller}/20`
        : controller === "shifts"
        ? `${baseURL}/${controller}/99999`
        : `${baseURL}/${controller}/test-id-123`,
  };
  const dummy = {
    employees: {
      user_id: "00000000-0000-0000-0000-000000000000", // optional, allow null
      first_name: "TestFirst",
      last_name: "TestLast",
      position_id: null, // optional, allow null
      location_id: null, // optional, allow null
      email: "test.user@example.com",
      phone_number: "000-000-0000", // optional, allow null or ""
      is_hourly: true,
      is_salaried: false,
      is_active: true,
    },
    positions: {
      name: "Test Position",
      count: 1, // optional, allow null
    },
    locations: {
      name: "Test Location",
      count: 1, // optional, allow null
      address: "123 Test St", // optional, allow null or ""
    },
    shifts: {
      id: 999, // Use a high number to avoid PK conflict; required
      created_at: new Date().toISOString(), // optional, will be ignored if default is set in DB
      start_time: new Date().toISOString(), // optional, allow null
      end_time: new Date(Date.now() + 3600000).toISOString(), // 1 hour later, optional, allow null
      up_for_trade: false, // optional, allow null
      duration: 60, // optional, allow null (e.g., 60 minutes)
    },
  };

  // Helper to record result and write details to file
  function record(endpoint, ok, error, details, payload = null) {
    let errSummary = "";
    let fileLink = "";
    if (!ok && error) {
      if (typeof error === "string" && error.match(/^\d{3}/)) {
        errSummary = error.split(":")[0];
      } else if (typeof error === "string") {
        errSummary = error.split(" ")[0];
      } else {
        errSummary = "Error";
      }
    }
    // Navigation links logic
    const fileBase = `${controller}_${endpoint}`;
    const fileName = safeFileName(fileBase) + ".md";
    fileOrder.push(fileName);
    // Write after all tests are done
    record.writeAll = function () {
      for (let i = 0; i < fileOrder.length; i++) {
        const fileName = fileOrder[i];
        const filePath = path.join(resultsDir, fileName);
        const prev = i > 0 ? fileOrder[i - 1] : null;
        const next = i < fileOrder.length - 1 ? fileOrder[i + 1] : null;
        let navLinks = "";
        if (prev) navLinks += `< [Previous](${prev})`;
        if (prev && next) navLinks += " | ";
        if (next) navLinks += `[Next](${next}) >`;
        if (navLinks) navLinks = navLinks + "\n\n";
        // Read the file, insert navLinks at the top after the first line
        let content = fs.readFileSync(filePath, "utf8");
        const lines = content.split("\n");
        lines.splice(1, 0, navLinks); // after the title
        fs.writeFileSync(filePath, lines.join("\n"));
      }
    };
    // Always write both Request and Response sections
    if (fs && details) {
      const filePath = path.join(resultsDir, fileName);
      const backLink = `[Back to summary](testControllersResults.md)`;
      const requestSection = `\n\n**Request:**\n\n\`\`\`json\n${JSON.stringify(payload, null, 2)}\n\`\`\`\n`;
      const responseSection = `\n**Response:**\n\n\`\`\`json\n${details}\n\`\`\``;
      fs.writeFileSync(filePath, `# ${controller} ${endpoint} Result\n\n${backLink}${requestSection}${responseSection}`);
      fileLink = `([details](${fileName}))`;
    }
    results[controller][endpoint] = ok ? `PASS ${fileLink}` : `FAIL - ${errSummary} ${fileLink}`;
    total++;
    if (ok) passed++;
    else failed++;
  }

  // GET all
  try {
    const res = await fetch(endpoints.getMany);
    const text = await res.text();
    if (res.ok) {
      record("getMany", true, null, text);
    } else {
      record("getMany", false, `${res.status} ${res.statusText}`, text);
    }
  } catch (e) {
    record("getMany", false, e.message, e.stack);
  }

  // GET one
  try {
    const res = await fetch(endpoints.getOne);
    const text = await res.text();
    if (res.ok) {
      record("getOne", true, null, text);
    } else {
      record("getOne", false, `${res.status} ${res.statusText}`, text);
    }
  } catch (e) {
    record("getOne", false, e.message, e.stack);
  }

  // CREATE
  try {
    const payload = dummy[controller];
    const res = await fetch(endpoints.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    if (res.ok) {
      record("create", true, null, text, payload);
    } else {
      record("create", false, `${res.status} ${res.statusText}`, text, payload);
    }
  } catch (e) {
    record("create", false, e.message, e.stack, dummy[controller]);
  }

  // UPDATE
  try {
    const payload = dummy[controller];
    const res = await fetch(endpoints.update, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    if (res.ok) {
      record("update", true, null, text, payload);
    } else {
      record("update", false, `${res.status} ${res.statusText}`, text, payload);
    }
  } catch (e) {
    record("update", false, e.message, e.stack, dummy[controller]);
  }

  // DELETE
  try {
    const res = await fetch(endpoints.deleteOne, { method: "DELETE" });
    const text = await res.text();
    if (res.ok) {
      record("deleteOne", true, null, text);
    } else {
      record("deleteOne", false, `${res.status} ${res.statusText}`, text);
    }
  } catch (e) {
    record("deleteOne", false, e.message, e.stack);
  }
}

async function runAllTests() {
  for (const controller of ["employees", "positions", "locations", "shifts"]) {
    await testController(controller);
  }
  if (fs) {
    writeAllNavLinks();
  }
  // Write results to Markdown file (Node.js/Electron only)
  let md = `# Controller API Test Results\n\n`;
  md += `Summary: ${passed}/${total} tests passed\n\n`;
  for (const [controller, endpoints] of Object.entries(results)) {
    // Count passes and total for this controller
    let passCount = 0;
    let totalCount = 0;
    for (const result of Object.values(endpoints)) {
      totalCount++;
      if (result.startsWith("PASS")) passCount++;
    }
    md += `Controller: ${controller}: ${passCount}/${totalCount} tests passed\n`;
    for (const [fn, result] of Object.entries(endpoints)) {
      md += `  - ${fn}: ${result}\n`;
    }
    md += `\n`;
  }
  if (fs) {
    fs.writeFileSync(resultsFile, md);
    console.log(`Test results written to ${resultsFile}`);
  } else {
    console.log("\n---\nMarkdown results (copy/paste to .md file):\n\n" + md);
  }
}

runAllTests();
