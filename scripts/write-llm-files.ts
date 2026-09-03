import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  aboutMarkdown,
  llmsFullText,
  llmsTxt,
  obrasMarkdown,
} from "../src/app/lib/site";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

const files: Record<string, string> = {
  "llms.txt": llmsTxt(),
  "llms-full.txt": llmsFullText(),
  "about.md": aboutMarkdown(),
  "obras.md": obrasMarkdown(),
};

for (const [name, contents] of Object.entries(files)) {
  writeFileSync(join(pub, name), contents, "utf8");
  console.log(`wrote public/${name}`);
}
