// TODO:
// rename readResource to readMashrResource
// rename writeResource to writeMashrResource
// rename removeResource to removeMashrResource
//
const fs = require('fs');
const { promisify } = require('util');

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const copyFile = promisify(fs.copyFile);
const yaml = require('js-yaml');
const path = require('path');
const os = require('os');
const exec = promisify(require('child_process').exec);
const rimraf = require("rimraf"); // similar to `rm -Rf` for recursive remove
const mashrLogger = require('./mashrLogger');

const homedir = os.homedir();

const exists = async path => (
  new Promise((res) => {
    fs.stat(path, (err) => {
      if (err === null) res(true);
      res(false);
    });
  })
);

const createDirectory = async (name, path) => {
  const dir = `${path}/${name}`;

  const dirExists = await exists(dir);
  if (!dirExists) {
    await mkdir(dir);
  }
};

const createJSONFile = async (fileName, path, json) => {
  const configStr = JSON.stringify(json, null, 2);
  await writeFile(`${path}/${fileName}.json`, configStr);
};

const getMashrPath = homedir => (`${homedir}/.mashr`);

async function readYaml(path) {
  return yaml.safeLoad(fs.readFileSync(path, 'utf8'));
}

const readResources = async () => {
  const mashrPath = getMashrPath(homedir);
  const filePath = `${mashrPath}/info.json`;
  let resourceInfo;

  try {
    resourceInfo = await readFile(filePath);
  } catch(e) {
    if (e.message.includes('no such file')) {
      throw new Error('Please run `mashr init` first.' + `\n${e}`);
    } else {
      throw(e);
    }
  }

  return JSON.parse(resourceInfo);
};

// [TODO: change to singular writeResource]
const writeResources = async (resource, key, object) => {
  const mashrDir = getMashrPath(homedir);
  const filePath = `${mashrDir}/info.json`;
  const data = await readFile(filePath);

  let info = JSON.parse(data);
  info[resource][key] = object;

  info = JSON.stringify(info, null, 2);

  await writeFile(filePath, info);
};

const removeResource = async (resource, key) => {
  const mashrDir = getMashrPath(homedir);
  const filePath = `${mashrDir}/info.json`;
  const data = await readFile(filePath);

  let info = JSON.parse(data);
  delete info[resource][key]

  info = JSON.stringify(info, null, 2);

  await writeFile(filePath, info);
};

module.exports = {
  copyFile,
  createDirectory,
  createJSONFile,
  exec,
  exists,
  getMashrPath,
  mkdir,
  readFile,
  readResources,
  readYaml,
  removeResource,
  rimraf,
  writeFile,
  writeResources,
};
