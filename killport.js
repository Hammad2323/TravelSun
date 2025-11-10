// killport.js (safe version)
import { exec } from "child_process";

const port = process.argv[2] || "5050"; // default port 5050

exec(`netstat -ano | findstr :${port}`, (err, stdout) => {
  if (err || !stdout) {
    console.log(`✅ No process found using port ${port}`);
    return;
  }

  const lines = stdout.trim().split("\n");
  let killed = false;

  lines.forEach(line => {
    const parts = line.trim().split(/\s+/);
    const pid = parts[parts.length - 1];
    if (pid && pid !== "0") {
      exec(`taskkill /PID ${pid} /F`, (killErr, killOut) => {
        if (killErr) {
          console.warn(`⚠️ Skipping PID ${pid}: ${killErr.message}`);
        } else {
          console.log(`✅ Killed process ${pid} using port ${port}`);
          killed = true;
        }
      });
    }
  });

  setTimeout(() => {
    if (!killed) {
      console.log(`ℹ️ No killable process found, continuing...`);
    }
  }, 2000);
});
