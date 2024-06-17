var mode = 0
var qrs
var codes
const QRCode = require('qrcode');
try {
    qrs = require("./qrs.json")
    codes = qrs.qrs
    console.log("Qrs.json not found.. Running in interactive mode.")
    console.log(qrs.qrs)
    mode = 1
} catch (error) {
    console.log("qrs.json not found.. Running in interactive mode.")
}

if (mode = 1)
qrs.qrs.forEach(QRCode => {
    GenQRCode(QRCode.name,QRCode.content)
});

if (mode = 0){

const prompt = require('prompt-sync')();
var outfile_name = prompt('File Output Name? (without Extension)')
var content_out = prompt('Content to embed?')
GenQRCode(outfile_name,content_out)
}


function GenQRCode(name,content){
    console.log(`Generating QR Code ${name} with content ${content}`)
    QRCode.toFile(`./OUTPUT/${name}.png`, content, { errorCorrectionLevel: 'H' }, function(err) {
        if (err) throw err;
        console.log('QR code saved!');
    });

}