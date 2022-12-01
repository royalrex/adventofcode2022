var cals = document.body.innerText
    .trim()
    .split('\n\n')
    .map(i => i
        .split('\n')
        .reduce((a, b) => a + parseInt(b))
    );

console.log("Largest calories group value", Math.max(...cals));

cals.sort((a, b) => b - a);
console.log("Three largest summed", cals.slice(0,3).reduce((a, b) => a + b))