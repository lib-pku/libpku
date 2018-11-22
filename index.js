const dirTree = require("directory-tree");
const tree = dirTree(".", {
  exclude: /node_modules|\.git/,
  extensions: /^((?!js).)*$/
});

let prefix = `https://github.com/lib-pku/libpku/tree/master/`;
function solve(e, depth) {
  let s = "";
  let res = [];
  if (e.type == "directory") {
    for (let i = 0; i < depth; ++i) s += "#";
    res.push(`${s} ${e.name}`);
  } else if (e.type == "file") {
    res.push(`[${e.name}](${prefix + encodeURIComponent(e.path)})`);
  }
  if (e.children) {
    e.children.forEach(ww => {
      res.push(solve(ww, depth + 1));
    });
  }
  return res.join("\n");
}

console.log(solve(tree, 1));
