import { readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const directory = dirname(fileURLToPath(import.meta.url));
const [html, css, javascript] = await Promise.all([
  readFile(join(directory, "index.html"), "utf8"),
  readFile(join(directory, "styles.css"), "utf8"),
  readFile(join(directory, "script.js"), "utf8"),
]);

let standalone = html
  .replace('    <link rel="stylesheet" href="styles.css" />', `    <style>\n${css}\n    </style>`)
  .replace('    <script src="script.js"></script>', `    <script>\n${javascript}\n    </script>`);

const mimeTypes = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

const inlineAssets = Array.from(standalone.matchAll(/<(?:img|source)\b[^>]*\bdata-inline-asset\b[^>]*>/g));

for (const [assetTag] of inlineAssets) {
  const source = assetTag.match(/\bsrc="([^"]+)"/)?.[1];
  if (!source || source.startsWith("data:") || /^https?:\/\//.test(source)) continue;

  const extension = extname(source).toLowerCase();
  const mimeType = mimeTypes[extension];
  if (!mimeType) throw new Error(`Formato de imagen no compatible: ${source}`);

  const assetPath = resolve(directory, source);
  const assetData = await readFile(assetPath);
  const dataUrl = `data:${mimeType};base64,${assetData.toString("base64")}`;
  standalone = standalone.replace(assetTag, assetTag.replace(`src="${source}"`, `src="${dataUrl}"`));
}

if (standalone === html || standalone.includes('href="styles.css"') || standalone.includes('src="script.js"')) {
  throw new Error("No se pudieron incorporar todos los recursos.");
}

await writeFile(join(directory, "presentation.html"), standalone, "utf8");
console.log("presentation.html generado correctamente.");
