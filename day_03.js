(function (source) {

    const prio = (item) => item.charCodeAt(0) + (item.charCodeAt(0) >= 97 ? -96 : -38);

    const sacks = source.split("\n")

    const result = sacks.map(s => {
        const [c1, c2] = [s.substring(0, s.length / 2), s.substring(s.length / 2)];
        const inBoth = c1.split('').find(c => c2.includes(c));
        return prio(inBoth);
    });

    console.log("Part 1", result.reduce((a, b) => a + b));

    let groupsPrioSum = 0;
    for (let i = 0; i < sacks.length; i+=3) {
        const inAll = sacks[i].split('').find(c => sacks[i+1].includes(c) && sacks[i+2].includes(c));
        groupsPrioSum += prio(inAll);
    }

    console.log("Part 2", groupsPrioSum);
})(document.body.innerText.trim());