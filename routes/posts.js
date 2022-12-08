const express = require("express");
const router = express();
const { Posts, Comments, Likes } = require("../models");
const authMiddleWare = require("../middlewares/auth-middleware");
const sequelize = require("sequelize");

router.post("/", authMiddleWare, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { title, content } = req.body;
    if (!title) {
      res.status(412).json({ errorMessage: "게시글 제목의 형식이 일치하지 않습니다." });
    } else if (!content) {
      res.status(412).json({ errorMessage: "게시글 내용의 형식이 일치하지 않습니다." });
    }
    await Posts.create({ userId, title, content });
    return res.status(200).json({ message: "게시물을 생성하였습니다." });
  } catch (errorMessage) {
    res.status(400).json({ errorMessage: "게시글 작성에 실패하였습니다." });
  }
});

// 게시물 전체 조회, 좋아요 많은 순으로 정렬
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [{ model: Likes }, { model: Comments }],
      // order: [["Likes", "asc"]],
    });

    const likesCount = posts.map((value) => {
      return {
        postId: value.postId,
        userId: value.userId,
        title: value.title,
        content: value.content,
        createdAt: value.createdAt,
        updatedAt: value.updatedAt,
        Likes: value.Likes.length,
        Comments: value.comment,
      };
    });
    return res.send(likesCount);
  } catch (errorMessage) {
    console.log(errorMessage);
    res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다." });
  }
});

module.exports = router;
