
const options = {
 host: "10.0.2.63",
 port: "22",
 user: "site_ftp_fdj_admin",
 password: "fdj_admin#com"
 // proxy:{
 //   host: '',
 //   port: '',
 // }
};
// const options = {
//   host: "172.17.0.2",
//   port: "22",
//   user: "site_ftp_fdj_admin",
//   password: "vocenCY"
//   // proxy:{
//   //   host: '',
//   //   port: '',
//   // }
// };


const FtpDeploy = require("ftp-deploy");

const ftpDeploy = new FtpDeploy();

const config = {
  ...options,
  localRoot: `${__dirname}/dist/build/h5`,
  remoteRoot: "/fdj-wap/",
  include: ["*", "**/*"], // this would upload everything except dot files
  // include: ["*.php", "dist/*", ".*"],
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  // exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"],
  exclude: [],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: false,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: false,
  sftp: true
};

// use with promises
// ftpDeploy
//   .deploy(config)
//   .then(res => console.log('finished:', res))
//   .catch(err => {
//     let { message, name } = err;
//     console.log({
//       name,
//       message
//     });
//   });

// use with callback
ftpDeploy.deploy(config, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("finished:", res);
    process.exit();
  }
});

ftpDeploy.on("uploading", data => {
  // console.log(data.totalFilesCount); // total file count being transferred
  // console.log(data.transferredFileCount); // number of files transferred
  console.log(`start up ${data.filename} ，fileSize ${data.totalFilesCount}`); // partial path with filename being uploaded
});
ftpDeploy.on("uploaded", data => {
  console.log("\033[33m " + data.filename + " upload done \033[39m"); // same data as uploading event
});
ftpDeploy.on("log", data => {
  console.log(data); // same data as uploading event
});
ftpDeploy.on("upload-error", data => {
  console.log(data.err); // data will also include filename, relativePath, and other goodies
});
