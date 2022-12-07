(function (source) {
    const folderSizes = function (root) {
        const folderSizeMap = [];

        const calcSize = function (node) {
            let folderSize = 0;
            for (const c in node.children) {
                const cnode = node.children[c];
                if (typeof cnode === "object") {
                    folderSize += calcSize(cnode);
                } else {
                    folderSize += cnode;
                }
            }
            folderSizeMap.push({name:node.name, size:folderSize});
            return folderSize;
        };

        calcSize(root);

        return folderSizeMap;
    }

    const lines = source.split('\n');

    const tree = {parent:null,children:{},name:"/"};
    let currentNode = tree;
    let state = null;
    for (const line of lines) {
        if (line.at(0) === '$') {
            // cd <path>
            const {command, param} = line.match(/^\$ (?<command>\w+)\s?(?<param>[^\s]*)/).groups;
            switch (command) {
                case 'cd':
                    switch (param) {
                        case '/': currentNode = tree; break;
                        case '..': currentNode = currentNode.parent; break;
                        default:
                            currentNode = currentNode.children[param];
                            break;
                    }
                    break;
                case 'ls':
                    // we could recurse here
                    break;
            }
            // ls
        } else if (/^dir/.test(line)) {
            // dir <name> so create nodes on current node
            const {nodeName} = line.match(/^dir (?<nodeName>\w+)$/).groups;
            currentNode.children[nodeName] = {parent:currentNode,children:{},name:nodeName};
        } else {
            const {size, name} =  line.match(/^(?<size>\d+) (?<name>[\w\.]+)$/).groups;
            currentNode.children[name] = parseInt(size);
        }
    }

    const s = folderSizes(tree);
    console.log("Part 1", s.filter(i => i.size <= 100000).reduce((a,b)=>a+b.size, 0));

    const totalSpace = 70000000;
    const totalSpaceNeeded = 30000000;
    const usedSpace = s.at(-1).size;
    const spaceNeeded = (usedSpace + totalSpaceNeeded) - totalSpace;

    const dirToDelete = s.filter(i => i.size >= spaceNeeded)
        .sort((a, b) => a.size === b.size ? 0 : (b.size > a.size ? 1 : -1))
        .pop();
    const dirSize = dirToDelete.size;
    console.log("Part 2", dirSize);

})(document.body.innerText.trim());