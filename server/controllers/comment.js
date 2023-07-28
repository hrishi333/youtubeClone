const Video = require("../models/Video.js");
const Comment = require("../models/Comment.js");
const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError.js");

const addComment = async (req, res, next) => {
    const{desc,videoId}=req.body;
  try {
    const newComment = new Comment({ userId: req.user.id, desc,videoId});
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {

  try {
    const comment = await Comment.findById(req.params.id);
    console.log(req.user);
    console.log(comment);
    /*   const video = await Video.findById(req.params.id);
       console.log(video);*/
    if (req.user.id === comment.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment has been deleted.");
    } else {
      return next(new CustomError("You can delete only your comment", 403));
    }
  } catch (err) {
    next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).populate('userId','name profile_image');
    res.status(200).json(comments);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addComment,
  deleteComment,
  getComments,
};
