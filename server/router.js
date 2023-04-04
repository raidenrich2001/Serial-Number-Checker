const multer = require('multer');
const express = require('express')
const readXlsxFile = require('read-excel-file/node');
const router = express.Router()
const path = require('path');
const fs = require('fs');
const noDupesSchema = require('./schema/noDupesSchema');
const pagesize = 30;

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './excel/')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname))
    }
})



const upload = multer({ storage: Storage })


router.post('/', upload.single('file'), function (req, res) {
    readXlsxFile(`./excel/${req.file.filename}`).then((rows) => {
        res.json(rows);
        fs.unlink(req.file.path, (err => {
            if (err) {
                console.log("error")
            }
            else {
                console.log("deleted in file system")
            }
        }))
    })
});

router.post('/savewithoutduplicates', async (req, res) => {
    try {
        const serialnos = req.body.serialnos;
        const chunkSize = 10;
        const chunks = [];
        for (let i = 0; i < serialnos.length; i += chunkSize) {
            chunks.push(serialnos.slice(i, i + chunkSize));
        }
        const existingSerialnos = new Set();
        const existingDocuments = await noDupesSchema.find({ serialno: { $in: serialnos } });
        existingDocuments.forEach(doc => existingSerialnos.add(doc.serialno));
        const newDocuments = [];
        for (let i = 0; i < chunks.length; i++) {
            const newSerialnos = chunks[i].filter(serialno => !existingSerialnos.has(serialno));
            const documents = newSerialnos.map(serialno => ({
                stb: req.body.stb,
                accessories: req.body.accessories,
                vendor: req.body.vendor,
                serialno: serialno
            }));
            newDocuments.push(...documents);
        }
        await noDupesSchema.insertMany(newDocuments, { ordered: false, upsert: true });
        const result = [...existingDocuments];
        res.json({ message: 'Data saved successfully', data: result });
    } catch (error) {
        console.error('Error finding or adding documents:', error);
        res.status(500).json({ error: 'Error finding or adding documents' });
    }
});



router.get('/getDuplicates', async (req, res) => {
    const findDupes = await noDupesSchema.aggregate([
        {
            $group: {
                _id: "$serialno",
                count: { $sum: 1 },
                first: { $first: "$$ROOT" }
            }
        },
        {
            $match: {
                count: { $gt: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                stb: "$first.stb",
                accessories: "$first.accessories",
                vendor: "$first.vendor",
                serialno: "$first.serialno",
                count: 1
            }
        }
    ]);
    res.json(findDupes);
});

router.get('/getsorted/:searches1/:searches2/:searches3', async (req, res) => {
    const { searches1, searches2, searches3 } = req.params;
    const { page = 0 } = req.query;
    // Check if all three search parameters are present
    if (searches1 && searches2 && searches3) {
      const data = await noDupesSchema.find({
        $and: [
          { stb: { $regex: new RegExp(searches1), $options: "i" } },
          { accessories: { $regex: new RegExp(searches2), $options: "i" } },
          { vendor: { $regex: new RegExp(searches3), $options: "i" } }
        ]
      }, null, { skip: (parseInt(page * pagesize)), limit: pagesize });

      const findcount = await noDupesSchema.find({
        $and: [
          { stb: { $regex: new RegExp(searches1), $options: "i" } },
          { accessories: { $regex: new RegExp(searches2), $options: "i" } },
          { vendor: { $regex: new RegExp(searches3), $options: "i" } }
        ]
      }).count();
  
      res.json({data : data, count : findcount});
    } else {
      // Return an error response if any of the search parameters are missing
      res.status(400).json({ message: "Missing search parameter(s)" });
    }
  });

router.get('/getLimited',async (req,res) => {
    const { page = 0 } = req.query;
    const find30 = await noDupesSchema.find({}, null, { skip: (parseInt(page * pagesize)), limit: pagesize })
    const findcount = await noDupesSchema.find().count()
    res.json({data : find30, count : findcount})
})

router.get('/findserialno/:serialno',async (req,res) => {
    const findSerialNo = await noDupesSchema.findOne({serialno : req.params.serialno})
    res.json({data : findSerialNo})
})


module.exports = router