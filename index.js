const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 BFHL API is running successfully!");
});

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

        const graph = {};
        const childrenSet = new Set();

        validEdges.forEach(edge => {
            const [parent, child] = edge.split("->");

            if (!graph[parent]) graph[parent] = [];
            graph[parent].push(child);

            childrenSet.add(child);
        });

        const nodes = new Set();
        validEdges.forEach(e => {
            const [p, c] = e.split("->");
            nodes.add(p);
            nodes.add(c);
        });

        let roots = [...nodes].filter(n => !childrenSet.has(n));

        if (roots.length === 0 && nodes.size > 0) {
            roots = [Array.from(nodes).sort()[0]];
        }

        function buildTree(node, visited = new Set()) {
            if (visited.has(node)) return null;

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
