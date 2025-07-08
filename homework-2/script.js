function calculateCollatz() {
    const input = document.getElementById('startNumber').value;
    const n = parseInt(input);
    if (isNaN(n)  || n < 1) {
        alert("Please enter a valid positive integer.");
        return;
    }

    console.log("Starting number:", n);
    let sequence = [n];
    let current = n;

    while (current !== 1) {
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
        sequence.push(current);
    }

    document.getElementById('result').innerText = `Zincir (${sequence.length} adım): ${sequence.join(" → ")}`;
}

function findLongestChain() {
    let maxLength = 0;
    let startingNumber = 0;

    const cache = {};

    function getCollatzLength(n) {
        if (n === 1) return 1;
        if (cache[n]) return cache[n];

        let next = n % 2 === 0 ? n / 2 : 3 * n + 1;
        let length = 1 + getCollatzLength(next);
        cache[n] = length;
        return length;
    }

    for (let i = 1; i < 1000000; i++) {
        let len = getCollatzLength(i);
        if (len > maxLength) {
            maxLength = len;
            startingNumber = i;
        }
    }

    document.getElementById('longestChain').innerText = `En uzun zincir: ${startingNumber} (uzunluk: ${maxLength})`;
}
