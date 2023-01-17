"use strict";

let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB,
  problemCx: problemC
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

function problemA() {
  // callback version
  exerciseUtils.readFile("poem-two/stanza-01.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });
  exerciseUtils.readFile("poem-two/stanza-02.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });

  // promise version
 // Tu código acá:
 exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt").then((v1) => {
  exerciseUtils.blue(v1);
});
exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt").then((v2) => {
  exerciseUtils.blue(v2);
});
 // Versión OK del README
  // let p1 = exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt");
  // let p2 = exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt");

  // Promise.all([p1, p2]).then((result) => {
  //   // result -> ["blanafds sfs", "djsgdsfg.."]
  //   exerciseUtils.blue(result[0]);
  //   exerciseUtils.blue(result[1]);
  //   console.log("done");
  // });
}

function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  });

  // promise version
  // Tu código acá:
  var p1 = exerciseUtils.promisifiedReadFile(filenames[0]);
  for (let i = 1; i <= filenames.length; i++) {
    p1 = p1.then((v) => {
      exerciseUtils.blue(v);
      if (i === filenames.length) {
        console.log("done");
      }
      return exerciseUtils.promisifiedReadFile(filenames[i]);
    });
  }
}

function problemC() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
      if (err) exerciseUtils.magenta(new Error(err));
    });
  });

  // promise version
  // Tu código acá:
  var p1 = exerciseUtils.promisifiedReadFile(filenames[0]);
  for (let i = 1; i <= filenames.length; i++) {
    p1 = p1.then((v) => {
      exerciseUtils.blue(v);
      if (i === filenames.length) {
        console.log("done");
      }
      return exerciseUtils.promisifiedReadFile(filenames[i]);
    });
    if(i === filenames.length){
      p1.catch((err)=>{
        exerciseUtils.magenta(new Error(err))
        console.log("done");
      })
    }
  }
}

function problemD() {
  let fs = require("fs");
  function promisifiedWriteFile(filename, str) {
    // tu código acá:
  }
}

// exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt")
// .then((v)=>{
//   exerciseUtils.blue(v)
//   return exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt")
// }).then((v)=>{
//   exerciseUtils.blue(v)
//   return exerciseUtils.promisifiedReadFile("poem-two/stanza-03.txt")
// }).then((v)=>{
//   exerciseUtils.blue(v)
//   return exerciseUtils.promisifiedReadFile("poem-two/stanza-04.txt")
// }).then((v)=>{
//   exerciseUtils.blue(v)
//   return exerciseUtils.promisifiedReadFile("poem-two/stanza-05.txt")
// }).then((v)=>{
//   exerciseUtils.blue(v)
//   return exerciseUtils.promisifiedReadFile("poem-two/stanza-06.txt")
// }).then((v)=>{
//   exerciseUtils.blue(v)
//   return exerciseUtils.promisifiedReadFile("poem-two/stanza-07.txt")
// }).then((v)=>{
//   exerciseUtils.blue(v)
//   return exerciseUtils.promisifiedReadFile("poem-two/stanza-08.txt")
// }).then((v)=>{
//   exerciseUtils.blue(v)
//   console.log("done")
// })

