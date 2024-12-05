const axios=require("axios");
const path=require("path");
const fs=require("fs");

const files=[
    ["input.m4a","output.mp3"],
    ["input2.m4a","output2.mp3"],
]
// Lendo o arquivo como um Buffer
fs.readFile(path.join(__dirname, files[0][0]), (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }

    // Criando o Blob a partir do Buffer
    const blob = new Blob([data], { type: 'audio/m4a' });

    const fd=new FormData();
    fd.append("file",blob)
    axios.post("https://ffmpeg-4tcj.onrender.com/convert",fd,{
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        responseType:'stream'
}).then(async response=>{
        const writer = fs.createWriteStream(files[0][1]);
        response.data.pipe(writer);

        writer.on('finish', () => {
        console.log('Arquivo baixado com sucesso!');
        });

        writer.on('error', (err) => {
        console.error('Erro ao salvar o arquivo:', err);
        });
        // const blob=new Blob([response.data],{type:"audio/mp3"});
        // fs.writeFileSync("output.mp3",Buffer.from(await blob.arrayBuffer()));
    });
    console.log('Blob criado com sucesso!');
    console.log('Tamanho do Blob:', blob.size, 'bytes');
    console.log('Tipo do Blob:', blob.type);
});
fs.readFile(path.join(__dirname, files[1][0]), (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }

    // Criando o Blob a partir do Buffer
    const blob = new Blob([data], { type: 'audio/m4a' });

    const fd=new FormData();
    fd.append("file",blob)
    axios.post("https://ffmpeg-oba2.onrender.com/convert",fd,{
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        responseType:'stream'
    }).then(async response=>{
        const writer = fs.createWriteStream(files[1][1]);
        response.data.pipe(writer);

        writer.on('finish', () => {
        console.log('Arquivo baixado com sucesso!');
        });

        writer.on('error', (err) => {
        console.error('Erro ao salvar o arquivo:', err);
        });
        // const blob=new Blob([response.data],{type:"audio/mp3"});
        // fs.writeFileSync("output.mp3",Buffer.from(await blob.arrayBuffer()));
    });
    console.log('Blob criado com sucesso!');
    console.log('Tamanho do Blob:', blob.size, 'bytes');
    console.log('Tipo do Blob:', blob.type);
});