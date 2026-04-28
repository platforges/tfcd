import { execSync } from "child_process";

// Surface any vulnerable dependencies declared in this app at runtime by
// invoking the package manager's audit and printing the result.
type AuditAdvisory = {
  value: string;
  children: {
    ID?: number | string;
    Issue?: string;
    URL?: string;
    Severity?: string;
    "Vulnerable Versions"?: string;
    "Tree Versions"?: string[];
    Dependents?: string[];
  };
};

function runAudit(): AuditAdvisory[] {
  try {
    const out = execSync("yarn npm audit --all --recursive --json", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return out
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => JSON.parse(line) as AuditAdvisory);
  } catch (err) {
    const e = err as { stdout?: string };
    if (!e.stdout) throw err;
    return e.stdout
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => JSON.parse(line) as AuditAdvisory);
  }
}

const advisories = runAudit();

if (advisories.length === 0) {
  console.log("No known advisories for declared dependencies.");
} else {
  console.log(`Found ${advisories.length} vulnerable dependency advisory(ies):\n`);
  for (const a of advisories) {
    const c = a.children;
    console.log(`  package:  ${a.value}`);
    console.log(`  id:       ${c.ID ?? "n/a"}`);
    console.log(`  issue:    ${c.Issue ?? "n/a"}`);
    console.log(`  severity: ${c.Severity ?? "n/a"}`);
    console.log(`  affected: ${c["Vulnerable Versions"] ?? "n/a"}`);
    console.log(`  installed: ${(c["Tree Versions"] ?? []).join(", ")}`);
    console.log(`  url:      ${c.URL ?? "n/a"}`);
    console.log("");
  }
}
