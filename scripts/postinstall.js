#!/usr/bin/env node

/*eslint no-process-env: "off"*/

const fs = require('fs');

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function restoreSSHConfig() {
  fs.readFile(process.env.HOME + '/.ssh/config', function(err, data) {
    if (!err) {
      let content = `Host gitlab.blockchainlabs.asia
  IdentityFile ~/.ssh/npm-private-modules-key
  IdentitiesOnly yes
  UserKnownHostsFile=/dev/null
  StrictHostKeyChecking no`;

      data = data.toString();
      // removedData = data.replace(content, '');
      removedData = replaceAll(data, content, '');

      fs.writeFile(process.env.HOME + '/.ssh/config', removedData, function(
        err
      ) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}

function removeNpmPrivateModulesKey() {
  fs.unlinkSync(process.env.HOME + '/.ssh/npm-private-modules-key');
}

function symlinkApp() {
  if (!fs.existsSync('./node_modules/app')) {
    fs.symlinkSync('../app', './node_modules/app', 'dir');
  }
}

restoreSSHConfig();
removeNpmPrivateModulesKey();
symlinkApp();
