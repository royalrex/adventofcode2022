(function (source) {
    const unique = (a) => !a.some((i, idx) => a.indexOf(i) !== idx);
    const parse = (input, markerSize) => {
        const buffer = Array.from({length: markerSize});
        let p = 0;
        let c = 0;
        for (; c < input.length; c++) {
            buffer[p] = input.at(c);

            if (c >= markerSize && unique(buffer)) {
                return c + 1;
            }

            p++;
            if (p === markerSize) p = 0;
        }
        return null;
    };

    const marker1 = parse(source, 4);
    console.log("Part 1", marker1);
    const marker2 = parse(source, 14);
    console.log("Part 2", marker2);
})(document.body.innerText.trim());