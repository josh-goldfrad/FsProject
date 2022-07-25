const fs = require("fs")


// create folder
function createFolder(folderName) {
    try {
        if (fs.existsSync(`${folderName}`)) throw { message: "folder already exists" }
        fs.mkdirSync(`${folderName}`)
        return "success"
    } catch (error) {
        console.log(error || "error");
    }
}


// create file
function createFile(fileName, data, encoding = "utf-8") {
    try {
        if (!fs.existsSync(`./uploads/${fileName}`)) {
            fs.writeFileSync(`./uploads/${fileName}`, data, { encoding })
            return "success"
        }
    } catch {
        return false
    }
}

// does it exist
function doesItExist(fileOrFOlder) {
    let exist = !fs.existsSync(`${fileOrFOlder}`)
    console.log(exist);
    return exist
}

//read file
function readFile(fileName) {
    const text = fs.readFileSync(`./uploads/${fileName}`, { encoding: "utf-8" })
    console.log(text);
    return text
}

// read folder 
function readFolder(folderName) {
    data = { files: [], folders: [] }
    const directory = fs.readdirSync(folderName, { encoding: "utf-8" })
    for (i of directory) {
        if (fs.statSync('uploads/' + i).isDirectory()) {
            data.folders.push(i)
        }
        else {
            data.files.push(i)
        }
    }
    console.log(data);
    return data
}
// readFolder("uploads")

// update file
function updateFile(fileName, newData) {
    if (doesItExist(fileName) === true) {
        let updated = fs.appendFileSync(fileName, newData, () => {
            console.log("done")
        })
        console.log(`file ${fileName} updated`);
    }
}


//delete file
function deleteFile(fileName) {
    if (doesItExist(fileName) === true) {
        let deleted = fs.rmSync(fileName)
        console.log(`file ${fileName} deleted`);
    }
}

function deleteFolder(folderName) {
    if (doesItExist(folderName) === true) {
        fs.rmdirSync(folderName)
        console.log(`file ${folderName} deleted`);
    }
}
// fs.rmdirSync("root")


// function isExist(filename) {
//     return fs.existsSync('./data/' + filename);
// }


function isValidName(fileName = "") {
    return ["/", "\\", "+", ":", "|", "?", "<", ">", '"'].find((char) =>
        fileName.includes(char)
    )
        ? false
        : true;
}
function isValidFolderName(folderName = "") {
    return ["/", "\\", "+", ":", "|", "?", "<", ">", '"'].find((char) =>
        folderName.includes(char)
    )
        ? false
        : true;
}

function isValidExtentions(fileName = "") {
    let ext = fileName.slice(fileName.lastIndexOf(".") + 1);
    return [".pdf", ".txt", ".png", ".jpg", ".js", ".html", ".css", ".jsx", ".ts"].find(
        (char) => ext == char
    )
        ? true
        : false;
}


async function isValid(req, res, next) {
    // console.log();
    if ((isValidName(req.body.fileName) || isValidFolderName(req.body)) && isValidExtentions) {
        next()
    }
    else {

        res.status(404).send("file logic line 92 error")
    }
}

module.exports = { readFolder, isValid, createFile, updateFile, deleteFile, readFile, createFolder }

