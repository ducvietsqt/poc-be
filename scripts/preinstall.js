#!/usr/bin/env node

/*eslint no-process-env: "off"*/
/*eslint no-console: "off"*/

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

function ensureDotEnvExist() {
  if (!fs.existsSync('.env')) {
    fs.copyFileSync('env.default', '.env');
  }
}

function ensureSSHDirExist() {
  let sshDir = process.env.HOME + '/.ssh';

  if (!fs.existsSync(sshDir)) {
    fs.mkdirSync(sshDir, 0o700);
  }
}

function setupNpmPrivateModulesKey() {
  if (fs.existsSync('npm-private-modules-key')) {
    fs.copyFileSync(
      'npm-private-modules-key',
      process.env.HOME + '/.ssh/npm-private-modules-key'
    );

    // Change the permissions on the file to be read-write for this user
    fs.chmodSync(process.env.HOME + '/.ssh/npm-private-modules-key', 0o600);

    let content = `Host gitlab.blockchainlabs.asia
  IdentityFile ~/.ssh/npm-private-modules-key
  IdentitiesOnly yes
  UserKnownHostsFile=/dev/null
  StrictHostKeyChecking no`;

    if (!fs.existsSync(process.env.HOME + '/.ssh/config')) {
      fs.writeFileSync(process.env.HOME + '/.ssh/config', '', 'utf8', 0o644);
    }

    try {
      fs.appendFileSync(process.env.HOME + '/.ssh/config', content);
    } catch (err) {
      console.warn('Preinstall::Append ssh config data error: ', err);
    }
  }
}

function installLocalModuleDependencies() {
  const moduleDir = path.resolve(__dirname, '../app/lib');

  fs.readdirSync(moduleDir).forEach(module => {
    let modulePath = path.join(moduleDir, module);

    if (!fs.existsSync(path.join(modulePath, 'package.json'))) {
      return;
    }

    childProcess.spawn('npm', ['i'], {
      env: process.env,
      cwd: modulePath,
      stdio: 'inherit',
    });
  });
}

ensureDotEnvExist();
ensureSSHDirExist();
setupNpmPrivateModulesKey();
installLocalModuleDependencies();
