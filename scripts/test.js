const assert = require('assert');
const { add, factorial } = require('../src/math');

function testAdd() {
    assert.strictEqual(add(1, 2), 3);
    assert.strictEqual(add(-1, 1), 0);
    assert.strictEqual(add(0, 0), 0);
}

function testFactorial() {
    assert.strictEqual(factorial(0), 1);
    assert.strictEqual(factorial(1), 1);
    assert.strictEqual(factorial(5), 120);
}

function testErrors() {
    assert.throws(() => factorial(-1), /n must be >= 0/);
    assert.throws(() => factorial(1.5), /n must be an integer/);
}

function main() {
    const tests = [
        { name: 'add()', fn: testAdd },
        { name: 'factorial()', fn: testFactorial },
        { name: 'factorial() errors', fn: testErrors },
    ];

    for (const t of tests) {
        t.fn();
    }

    // Single deterministic success output
    process.stdout.write('All tests passed\n');
}

main();

