const express = require("express");
const router = express.Router();
const Video = require("../../models/Video");
const multer = require('multer');
const AWS = require('aws-sdk')
require('dotenv').config();

const validateVideoInput = require("../../validation/video");
const video = require("../../validation/video");

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

const filefilter = (req, file, cb) => {
    if (
        file.mimetype === 'video/mp4'
        // || file.mimetype === 'video/mov'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

multer({
    
})

const upload = multer({
    storage: storage,
    fileFilter: filefilter,
    limits: { fieldSize: 25 * 1024 * 1024 },
});

const bucketRegion = process.env.AWS_BUCKET_REGION
const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretKey = process.env.AWS_SECRET_KEY

const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretKey
})

router.post("/upload", upload.single("video[video]") , (req, res) => {
    const { errors, isValid } = validateVideoInput(req.body.video);
    let video = req.body.video;
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newVideo = new Video({
        title: video.title,
        description: video.description,
        category: video.category,
        topic: video.topic,
        // url: video.url,
        uploaderId: video.uploaderId
    });
    
    if (video.url.startsWith("data:video/mp4;base64")) {
        const params = {
            Bucket: bucketName,
            Key: req.file.originalname,
            Body: req.file.buffer,
            ACL:"public-read-write",
            ContentType:"video/mp4",
        };

        s3.upload(params, (err, data) => {
            if (err) {
                res.status(500).send({"Error": err})
                return
            }
            newVideo.url = data.Location;
            newVideo.save()
                .then(video => {
                    res.json(
                        video
                    )
                })
                .catch(err => res.status(400).json({ failedUpload: "Failed to upload video"}))
            }
        )
    } else {
        newVideo.url = video.url;
            newVideo.save()
                .then(video => {
                    res.json(video)
                })
                .catch(err => res.status(400).json({ failedUpload: "Failed to upload video"}))
    }
});

router.put("/:videoId", upload.single("video[video]"), (req, res) => {
    const { errors, isValid } = validateVideoInput(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    Video.updateOne({ _id: req.params.videoId }, req.body)
        .then(video => res.json(video))
        .catch(err => res.status(404).json({ failedupdate: "Failed to update" }))
});

router.delete("/:videoId", (req, res) => {
    const videoId = req.params.videoId;
    Video.findByIdAndDelete(videoId)
        .then((err, video) => {
            if (err) {
                return res.json(err);
            } else {
                return res.json(video);
                // Can chain a .then if we want to send a "Deleted x video" message
            }
        })
});

router.get("/", (req, res) => {
    Video.find()
    .then(videos => {
        let newVideos = {}
        videos.forEach(video => {
            newVideos[video._id] = video;
        });
        return res.json(newVideos);
    })
    .catch(err => res.status(404).json({ novideosfound: "No videos found :("}))
});


router.get("/user/:userId", (req, res) => {
    Video.find({ uploaderId: req.params.userId })
        .then(videos => res.json(videos))
            // let newVideos = {}
            // videos.forEach(video => {
            //     newVideos[video._id] = video;
            // });
            
            // return res.json(newVideos);
        
        .catch(err => res.status(404).json({ novideosfound: "No videos found :(" }))
});

// router.get("/topic/:topic", (req, res) => {
//     Video.find({ topic: req.params.topic })
//     .then(videos => {
//         let newVideos = {}
//         videos.forEach(video => {
//             newVideos[video._id] = video;
//         });
//         return res.json(newVideos);
//     })
//     .catch(err => res.status(404).json({ novideosfound: "No videos found :(" }))
// });

router.get(`/topic/:query`, (req, res)=> {
    let query = req.params.query;
    // Video.find({topics: {'$regex' : req.params.topic, '$options' : 'i'}});
    // Video.find({topics: new RegExp(req.params.topic, 'i')});
    // Video.find({$or: [{topics: {$regex: req.params.topic}}, {description: {$regex: req.params.topic}}]})
    // Video.find({topics: {$regex: req.params.topic}})
    // Video.find(
    //     {
    //         $or: [
    //             {topics: { $regex: query, "$options":"i" }},
    //             {description: {$regex: query, "$options": "i"}}
    //         ]
    //     } 
    //     )
    // Video.find({topics: new RegExp(query), description: new RegExp(query)})

    Video.find({
        $or: [
            {topic: {$regex: req.params.query}},
            {title: {$regex: req.params.query}},
            {description: {$regex: req.params.query}}
        ]
    })
        .then(videos=> {
            let newVideos = {}
            videos.forEach(video => {
                newVideos[video._id] = video;
            });
            return res.json(newVideos);
        })
        .catch(err => res.status(405).json({novideosfound: "No videos found"}))
});

router.get("/:id", (req, res) => {
    Video.find({ _id: req.params.id })
    .then(videos => {
        let newVideos = {}
        videos.forEach(video => {
            newVideos[video._id] = video;
        });
        return res.json(newVideos);
    })
    .catch(err => res.status(404).json({ novideofound: "This video does not exist :(" }))
});

module.exports = router;