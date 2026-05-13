import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const backendRoot = join(__dirname, "..", "..", "backend");
const isWin = process.platform === "win32";
const cmd = isWin ? "mvnw.cmd" : "./mvnw";

const child = spawn(cmd, ["spring-boot:run"], {
  cwd: backendRoot,
  stdio: "inherit",
  shell: isWin,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
