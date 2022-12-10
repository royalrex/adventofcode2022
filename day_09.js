(function (source) {
    const moves = source.split('\n').map(m => ({dir:m.at(0),dist:parseInt(m.split(' ')[1])}));

    const positions = new Map();

    const h = {x:0, y:0};
    let t = {x:0, y:0};

    const update = (move, idx) => {
        for (let i = 0; i < move.dist; i++) {
            switch (move.dir) {
                case "U": h.y += 1; break;
                case "D": h.y -= 1; break;
                case "R": h.x += 1; break;
                case "L": h.x -= 1; break;
            }

            const distX = Math.pow(t.x - h.x, 2);
            const distY = Math.pow(t.y - h.y, 2);
            const dist = Math.sqrt(distX + distY);

            if (dist >= 2) {
                // below -PI/2 -1.57
                // left 0
                // above PI/2 1.57
                // right PI 3.14
                const angle = Math.atan2((t.y - h.y), (t.x - h.x));
                //console.log((t.y - h.y), (t.x - h.x), angle);

                if (angle > -Math.PI * 0.75 && angle < -Math.PI/4) {
                    // tail is mostly below
                    t = {...h, y:h.y-1};
                }
                else if (angle > Math.PI/4 && angle < Math.PI * 0.75) {
                    // tail is mostly above
                    t = {...h, y:h.y+1};
                } else if (angle > -Math.PI/4 && angle < 0 || angle >= 0 && angle < Math.PI * 0.25) {
                    // tail mostly right
                    //console.log("mostly right")
                    t = {...h, x:h.x+1};
                } else { //if (angle > Math.PI * 1.75 || angle < Math.PI * 0.25) {
                    // tail mostly left
                    //console.log("mostly left")
                    t = {...h, x:h.x-1};
                }
            }
            positions.set(t.x+'-'+t.y, true);
            //console.log(`${idx}-${i}`, JSON.stringify(h), JSON.stringify(t));
        }
    };
    moves.forEach((m, idx) => {update(m, idx)});
    console.log("Part 1", positions.size);
    /*})(`R 3
    L 1
    U 4
    L 2`);
    /*/ })(document.body.innerText.trim());