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
  switch (input) {
    case "os --cpus":
      const cpus = os.cpus();
      console.log(`CPUS amount: ${cpus.length}`);
      cpus.forEach((cpu) => {
        console.log(`model: ${cpu.model} speed: ${cpu.speed / 1000} GHz`);
      });
      break;
    case "os --homedir":
      const homedir = os.homedir();
      console.log(homedir);
      break;
    case "os --username":
      console.log(username);
      break;
    case "os --architecture":
      const arch = os.arch();
      console.log(arch);
      break;
    case "os --hostname":
      const host = os.hostname();
      console.log(host);
      break;
    case "os --platform":
      const platform = os.platform();
      console.log(platform);
      break;
    case "os --memory":
      const totalMemory = os.totalmem();
      console.log(totalMemory);
      break;
    case "ls":
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
      break;
    case ".exit":
      process.exit();
    default:
      console.log("Invalid input");
  }
});
