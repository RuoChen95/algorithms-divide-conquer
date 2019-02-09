let rs = require("fs");

let data = rs.readFileSync("kargerMinCut.txt","utf-8");
// let data = rs.readFileSync("test.txt","utf-8");


let array = data.split('\n');

let inputVertices = [];
let inputEdges = [];

for (let i = 0; i < array.length; i ++) {
  array[i] = array[i].split(' ').map(function(n, index) {
    return parseInt(n)
  })
}

inputVertices = array.map(function(n) {
  return n[0]
})

array.forEach(function (n) {
  n.forEach(function (m, index, array) {
    // 数组是引用类型
    if (index >= 1 && !inputEdges.some(function (arr) {return JSON.stringify(arr) === JSON.stringify([m, array[0]])})) {
      inputEdges.push([array[0], m])
    }
  })
})

// console.log(inputVertices)
// console.log(inputEdges)
// console.log(array)

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

/*
**** Karger's Min-Cut Algorithm ****

While there are more than 2 vertices:
1. pick a remaining edge (u,v) uniformly at random
2. merge (or "contract") u and v into a single vertex
3. remove self-loops
4. return cut represented by final 2 vertices.
*/

// 图的合并
function contract(vertices, edges) {
  if (vertices.length > 2) {
    let ind = getRandomIntInclusive(0, edges.length-1);

    let u = edges[ind][0];
    let v = edges[ind][1];

    vertices.splice(vertices.indexOf(v),1);

    let newList = [];

    edges.splice(ind,1);

    for (let i = 0; i < edges.length; i++) {
      if (edges[i][0] == v) edges[i][0] = u;
      if (edges[i][1] == v) edges[i][1] = u;
      if (edges[i][0] !== edges[i][1]) newList.push(edges[i])
    }

    return contract(vertices, newList)
  } else {
    return edges.length
  }
}

// 多次计算获取最小值
// TODO 随机计算
console.log(contract(inputVertices, inputEdges))
console.log(contract(inputVertices, inputEdges)) //?
console.log(contract(inputVertices, inputEdges)) //?
