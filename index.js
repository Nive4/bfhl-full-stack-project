const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Validate edge
function isValidEdge(edge) {
    return /^[A-Z]->[A-Z]$/.test(edge) && edge[0] !== edge[3];
}

app.post("/bfhl", (req, res) => {
    try {
        const input = req.body.data || [];

        let validEdges = [];
        let invalidEntries = [];
        let duplicateEdges = [];

        const seen = new Set();

        // ✅ Step 1: Validate + remove duplicates
        for (let edge of input) {
            if (typeof edge !== "string") {
                invalidEntries.push(edge);
                continue;
            }

            edge = edge.trim();

            if (!isValidEdge(edge)) {
                invalidEntries.push(edge);
                continue;
            }

            if (seen.has(edge)) {
                if (!duplicateEdges.includes(edge)) {
                    duplicateEdges.push(edge);
                }
            } else {
                seen.add(edge);
                validEdges.push(edge);
            }
        }

        // ✅ Step 2: Build graph
        const graph = {};
        const childrenSet = new Set();

        validEdges.forEach(edge => {
            const [parent, child] = edge.split("->");

            if (!graph[parent]) graph[parent] = [];
            graph[parent].push(child);

            childrenSet.add(child);
        });

        // ✅ Step 3: Collect nodes
        const nodes = new Set();
        validEdges.forEach(e => {
            const [p, c] = e.split("->");
            nodes.add(p);
            nodes.add(c);
        });

        // ✅ Step 4: Find roots
        let roots = [...nodes].filter(n => !childrenSet.has(n));

        // If no root → cycle case → pick smallest
        if (roots.length === 0 && nodes.size > 0) {
            roots = [Array.from(nodes).sort()[0]];
        }

        // ✅ Step 5: Build tree + detect cycle
        function buildTree(node, visited = new Set()) {
            if (visited.has(node)) return null; // cycle
            visited.add(node);

            let obj = {};

            if (graph[node]) {
                for (let child of graph[node]) {
                    const subtree = buildTree(child, new Set(visited));
                    if (subtree === null) return null;
                    obj[child] = subtree;
                }
            }

            return obj;
        }

        // ✅ Step 6: Depth calculation
        function getDepth(tree) {
            if (!tree || Object.keys(tree).length === 0) return 1;

            let max = 0;
            for (let key in tree) {
                max = Math.max(max, getDepth(tree[key]));
            }
            return max + 1;
        }

        let hierarchies = [];
        let totalTrees = 0;
        let totalCycles = 0;
        let maxDepth = 0;
        let largestRoot = "";

        // ✅ Step 7: Process each root
        for (let root of roots) {
            const tree = buildTree(root);

            if (tree === null) {
                hierarchies.push({
                    root,
                    tree: {},
                    has_cycle: true
                });
                totalCycles++;
            } else {
                const depth = getDepth(tree);

                hierarchies.push({
                    root,
                    tree: { [root]: tree },
                    depth
                });

                totalTrees++;

                if (
                    depth > maxDepth ||
                    (depth === maxDepth && (largestRoot === "" || root < largestRoot))
                ) {
                    maxDepth = depth;
                    largestRoot = root;
                }
            }
        }

        // ✅ Final response
        res.json({
            user_id: "nivethithasivaraj_04112005",
            email_id: "ns1840@srmist.edu.in",
            college_roll_number: "RA2311026050083",
            hierarchies,
            invalid_entries: invalidEntries,
            duplicate_edges: duplicateEdges,
            summary: {
                total_trees: totalTrees,
                total_cycles: totalCycles,
                largest_tree_root: largestRoot
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// ✅ KEEP SERVER ALIVE
app.listen(3000, () => {
    console.log("Server running on port 3000");
});