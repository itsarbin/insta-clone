const express = require('express');
const cors = require('cors')
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');
const followRouter = require('./routes/follow.routes');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use('/api/posts', postRouter);
app.use('/api/follow', followRouter);

app.use('/api/auth',authRouter);


module.exports = app;
