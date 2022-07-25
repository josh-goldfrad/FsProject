const express = require("express"),
    router = express.Router(),
    fileLogic = require("./fileLogic"),
    multer = require("multer"),
    upload = multer();




router.post("/file", fileLogic.isValid, async (req, res) => {
    console.log(req);
    try {

        const result = await fileLogic.createFile(req.body.fileName, req.body.content)
        // console.log(result);
        res.send(stringify(result))
    } catch (err) {
        res.status(400).json(err || "error")
    }
})


router.delete("/file", fileLogic.isValid, async (req, res) => {
    // console.log(req.body);
    try {
        const result = await fileLogic.deleteFile(req.body.fileName)
        res.send(result)

    } catch (err) {
        res.status(400).send(err || "error")
    }
})
router.put("/file", fileLogic.isValid, async (req, res) => {
    // console.log(req.body);
    try {
        const result = await fileLogic.updateFile(req.body.fileName, ` ${req.body.content} `)
        res.status(202).send(result)
    } catch (error) {
        res.status(400).send(error || "error")

    }
})//fileLogic.isValid,
router.get("/file/:fileName", async (req, res) => {
    console.log(111, req.params.fileName);
    const fileName = req.params.fileName


    try {
        const result = await fileLogic.readFile(fileName)
        res.status(202).send(result)

    } catch (error) {
        res.status(400).send(error || "error")

    }
})

router.post("/uploadFolder", [fileLogic.isValid, upload.single()], async (req, res) => {
    console.log(req.body);
    try {
        const result = await fileLogic.createFolder(req.body.folderName)
        res.status(202).send(result)
    } catch (error) {
        res.status(400).send(error || "error")

    }
})
router.post("/upload", upload.single("myFile"), async (req, res) => {
    try {
        const { file } = req
        const x = await fileLogic.createFile(file.originalname, file.buffer)
        if (!x) throw error
        res.send('file uploaded')
    } catch (error) {
        res.status(400).send(error || "error")
    }
})

router.post("/multiple", upload.array("manyFiles", 8), async (req, res) => {
    try {
        console.log(req);
        const { files } = req.files
        const x = await fileLogic.createFile(files.originalname, files.buffer)
        if (!x) throw error
        res.send('multiple ok')
    } catch (error) {
        res.status(400).send(error || "error")
    }
})

router.post("/getFromServer", async (req, res) => {
    try {
        const data = await fileLogic.readFolder(req.body.folderName)
        // console.log(data);
        res.status(200).send(data)
    } catch (error) {
        console.log(error || "error");
    }
})


module.exports = router



