const fs = require('fs');
const path = require('path');

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    for (const e of entries) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) files.push(...walk(p));
        else files.push(p);
    }
    return files;
}

function main() {
    const projectRoot = path.join(__dirname, '..');
    const files = walk(projectRoot)
        .filter((p) => p.endsWith('.js'))
        .filter((p) => !p.includes(`${path.sep}node_modules${path.sep}`));

    let errors = 0;
    for (const f of files) {
        const content = fs.readFileSync(f, 'utf8');

        // Very small deterministic lint checks (fast, no dependencies)
        if (content.includes('\r\n')) {
            console.warn(`[lint] CRLF found in: ${f}`);
        }

        if (/var\s+/.test(content)) {
            console.error(`[lint] 'var' is not allowed (use const/let): ${f}`);
            errors++;
        }

        if (/console\.log\(/.test(content)) {
            // Allow logs in scripts if desired, but fail to keep tests clean.
            console.error(`[lint] console.log found; use console.error or remove: ${f}`);
            errors++;
        }
    }

    if (errors > 0) {
        process.exitCode = 1;
    }
}

main();

