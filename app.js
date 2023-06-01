#!/usr/bin/env node

import os from "os";
import process from "node:process";
import fs from "node:fs";

const { username } = os.userInfo();
const currentDir = process.cwd();
console.log(`Welcome ${username}!`);

process.on("exit", () => {
  console.log(`Thank you ${username}, goodbye!`);
});

process.on("SIGINT", () => {
  process.exit();
});

process.stdin.on("data", (data) => {
  const input = data.toString().trim();

  if (input === "os --cpus") {
    const cpus = os.cpus();
    console.log(`CPUS amount: ${cpus.length}`);
    cpus.forEach((cpu) => {
      console.log(`model: ${cpu.model} speed: ${cpu.speed / 1000} GHz`);
    });
  } else if (input === "os --homedir") {
    const homedir = os.homedir();
    console.log(homedir);
  } else if (input === "os --username") {
    console.log(username);
  } else if (input === "os --architecture") {
    const arch = os.arch();
    console.log(arch);
  } else if (input === "os --hostname") {
    const host = os.hostname();
    console.log(host);
  } else if (input === "os --platform") {
    const platform = os.platform();
    console.log(platform);
  } else if (input === "os --memory") {
    const totalMemory = os.totalmem();
    console.log(totalMemory);
  } else if (input === "ls") {
    fs.readdir(currentDir, (err, allContent) => {
      const folders = [];
      const files = [];
      if (err) console.log(err);
      else {
        console.log("\nCurrent directory content:");
        allContent.forEach((file) => {
          let type;
          const stats = fs.statSync(file);
          if (stats.isDirectory()) {
            folders.push({ Name: file, Type: "directory" });
          } else if (stats.isFile()) {
            type = "file";
            files.push({ Name: file, Type: "file" });
          }
        });
        const content = [
          ...folders.sort((a, b) => a.Name - b.Name),
          ...files.sort((a, b) => a.Name - b.Name),
        ];
        content.forEach((file) => {
          console.log(file);
        });
      }
    });
  } else if (input === ".exit") {
    process.exit();
  } else if (input.substring(0, 3) === "add") {
    const newFileName = input.substring(4);
    fs.writeFile(`${currentDir}/${newFileName}`, "", (err) => {
      if (err) {
        console.error(err);
      }
    });
  } else if (input.substring(0, 2) === "rn") {
    const paths = input.split(" ");
    fs.rename(paths[1], paths[2], (err) => {
      if (err) {
        console.error(err);
      }
    });
  } else if (input.substring(0, 2) === "cp") {
    const paths = input.split(" ");
    fs.copyFile(paths[1], paths[2], (err) => {
      if (err) {
        console.error(err);
      }
    });
  } else if (input.substring(0, 2) === "mv") {
    const paths = input.split(" ");
    fs.rename(paths[1], paths[2], (err) => {
      if (err) {
        console.error(err);
      }
    });
  } else if (input.substring(0, 2) === "rm") {
    const path = input.substring(3);
    fs.rm(path, (err) => {
      console.error(err);
    });
  } else {
    console.log("Invalid input");
  }
});
