"use strict";

let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB,
  problemCx: problemC,
  problemDx: problemD,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

async function problemA() {
  // // callback version
  exerciseUtils.readFile("poem-one/stanza-01.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });
  exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });

  // async await version
  // Tu código acá:
  // const p1 = exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt")
  // const p2
  // [p1,p2]
  const stanzas = await Promise.all([
    exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt"),
    exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt"),
  ]); // [{pending},{pending}] -> [value,value]
  stanzas.forEach((st) => exerciseUtils.blue(st));
  console.log("done");
}

async function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  });

  // async await version
  // Tu código acá:
  const promises = filenames.map((file) =>
    exerciseUtils.promisifiedReadFile(file)
  );
  const stanzas = await Promise.all(promises);
  stanzas.forEach((st) => exerciseUtils.blue(st));
  console.log("done");
}

function problemC() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  });

  // async await version
  // Tu código acá:
  const promises = filenames.map((file) =>
    exerciseUtils.promisifiedReadFile(file)
  );
  promises.forEach(async (promise) => {
    const value = await promise;
    exerciseUtils.blue(value);
  });
  console.log("done");
}

async function problemD() {
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

  // async await version
  // Tu código acá:
  try {
    const promises = filenames.map((file) =>
      exerciseUtils.promisifiedReadFile(file)
    );
    const stanzas = await Promise.all(promises);
    stanzas.forEach((st) => exerciseUtils.blue(st));
  } catch (error) {
    exerciseUtils.magenta(new Error(error));
  } finally {
    console.log("done");
  }
}
