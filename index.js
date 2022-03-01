const fs = require('fs');
const cp = require('child_process');

const hasFlag = flag => {
  const index = process.argv.indexOf(flag);
  return index !== -1;
}

function buildFileStructure(startPath, base) {
  const entries = fs.readdirSync(startPath);

  for (const entry of entries) {
    const path = `${startPath}/${entry}`;
    const reBase = `${base}/${entry}`;

    if (fs.lstatSync(path).isDirectory()) {
      fs.mkdir(reBase, d => d);
      buildFileStructure(path, reBase);
    } else {
      fs.copyFileSync(path, reBase)
    }
  }
}

const baseDir = process.cwd();
const withReact = hasFlag("--with-react");
const withReactAuth = hasFlag('--with-react-auth');
const openWhenComplete = hasFlag('--code');

if (withReact && withReactAuth) {
  process.stdout.write('you can use --with-react or --with-react-auth, but not both');
  process.exit(1);
}

if (withReact) {
  const reactSh = __dirname + '/scripts/with-react.sh';
  cp.execSync('sh ' + reactSh, function (err, stdout, stderr) {
    if (err) console.log('err in with-react.sh child process:::', err);
  });
}

if (withReactAuth) {
  buildFileStructure(__dirname + '/react_auth', baseDir);
  const authSh = __dirname + '/scripts/with-react-auth.sh';
  cp.execSync('sh ' + authSh, function (err, stdout, stderr) {
    if (err) console.log('err in with-react-auth.sh child process:::', err);
  });
}

buildFileStructure(__dirname + '/file_content', baseDir);

const initSh = __dirname + '/scripts/init.sh';
cp.execSync('sh ' + initSh, function (err, stdout, stderr) {
  if (err) console.log('err in init.sh child process:::', err);
});

if (openWhenComplete) {
  const codeSh = __dirname + '/scripts/code.sh';
  cp.execSync('sh ' + codeSh, function (err, stdout, stderr) {
    if (err) console.log('err in code.sh child process:::', err);
  });
}