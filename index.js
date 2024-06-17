var mode = 0
var qrs
var codes
const QRCode = require('qrcode');
const fs = require('node:fs')
const cliProgress = require('cli-progress');
const progBar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
var codes_len = 0
var current_code = 0
const { v4: uuidv4 } = require('uuid'); 
try {
    qrs = require("./qrs.json")
    codes = qrs.qrs
    codes_len = codes.length
    console.log("Qrs.json found.. Running in Automatic mode.")
    mode = 1
} catch (error) {
    console.log("qrs.json not found.. Running in interactive mode.")
}

if (mode == 1){

    const folderName = './OUTPUT'

    try {
      if (!fs.existsSync(folderName)) {
        console.log("Creating Output Folder...")
        fs.mkdirSync(folderName);
      }
    } catch (err) {
      console.error(err);
    }

    progBar1.start(codes.length,0)
    codes.forEach(QRCode => {
        GenQRCode(QRCode.name,QRCode.content)
        current_code +=1
        updateProgress(current_code)
        
    });
    progBar1.stop()


}



if (mode == 0){

const prompt = require('prompt-sync')();
var outfile_name = prompt('File Output Name? (without Extension)')
var content_out = prompt('Content to embed?')
GenQRCode(outfile_name,content_out)
}


function GenQRCode(name,content){

    if (name.length == 0 || name == " ") {
        name = uuidv4()
    }
    if (content.length == 0 || content == " "){
        content = uuidv4()
    }
    QRCode.toFile(`./OUTPUT/${name}.png`, content, { errorCorrectionLevel: 'H' }, function(err) {
        if (err) throw err;
    });

}

function updateProgress(progress){
progBar1.update(progress)
}

