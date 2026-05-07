const fs = require('fs');
const path = require('path');

function main() {
    const outDir = path.join(__dirname, '..', 'dist');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

    // Create a deterministic artifact to prove build ran in CI
    const artifact = {
        name: 'testsuite-github-ci',
        builtAt: new Date('2000-01-01T00:00:00Z').toISOString(),
        version: require('../package.json').version,
    };

    fs.writeFileSync(path.join(outDir, 'artifact.json'), JSON.stringify(artifact, null, 2));
}

main();

