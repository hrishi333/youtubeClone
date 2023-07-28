const Video = require("../models/Video.js");
const User = require("../models/User.js");
const CustomError = require("../helpers/error/CustomError.js");

const addVideo = async (req, res, next) => {
  console.log(req.files ,req.body, "body request")
  try {
    const newVideo = await Video.create({
      userId: req.user.id,
      title: req.body.title,
      desc: req.body.description,
      imgUrl: `http://localhost:5000/images/${req.savedImage}`,
      videoUrl: `http://localhost:5000/videos/${req.savedVideo}`,
    });

    await newVideo.save();
    res.status(200).json("Video has been updated!");
  } catch (err) {
    res.status(400).json({error:err});
    next(err);
  }
};

const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return next(new CustomError("User not found", 404));
    }

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(new CustomError("You can update only your video", 404));
    }
  } catch (err) {
    next(err);
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(new CustomError("User not found", 404));
    }
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Video has been deleted");
    } else {
      return next(new CustomError("You can delete only your video", 404));
    }
  } catch (err) {
    next(err);
  }
};

const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

const getVideosByUser = async (req, res, next) => {
  const id = req.params.id;
  try{
    const userVideos = await Video.find({userId: id});
    res.status(200).json(userVideos);
  }catch(err){
    next(err)
  }
}

const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased");
  } catch (err) {
    next(err);
  }
};

const random = async (req, res, next) => {

  try {

    const videos = await Video.aggregate([{ $sample: { size: 40 } }]).exec();
    const filterdVideo =await Video.populate(videos, { path: 'userId' });
    res.status(200).json(filterdVideo);
  } catch (err) {
    next(err);
  }
};

const smallRandom = async (req, res, next) => {
  try {
    /*
    {$sample: {size: 40}} 
    */
    const videos = await Video.aggregate([{ $sample: { size: 10 } }]).populate('userId');
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const trend = async (req, res, next) => {
  /* Trend videolar sort (sıralama) algoritmasıyla getirilecek. sort() ile 1 en az izlenen videoları getirir, -1 en çok izlenen videoları getirir. */
  try {
    const videos = await Video.find().sort({ views: -1 }).populate('userId');
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );


    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

const getByTag = async (req, res, next) => {

  const tags = req.query.tags.split(",");

  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const search = async (req, res, next) => {

  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  getVideosByUser,
  addView,
  trend,
  random,
  smallRandom,
  sub,
  getByTag,
  search,
};
