const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const socket = require('socket.io');
const { disconnect } = require('process');
//const http = require('http').server(app)

const origin = process.env.ORIGIN;
const port = process.env.PORT;

const app = express();
app.use(cookieParser());
app.use(cors({credentials: true, origin: origin}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/post.routes')(app);

const server= app.listen(8001,()=>{
    console.log(`Socket is listening on port: 8001`)
});

const io= socket(server,{    
    cors:{
        origins: '*:*',
        methods: ['GET','POST'],
        allowedHeaders:['*'],
        credentials: true,
    }
});


// io.on("connection", (socket) =>{     
//     console.log('socket id:' + socket.id);
//     socket.on("event_from_client", data =>{
//             socket.broadcast.emit("event_to_all_other_clients", data)
//             console.log("Nice to meet you")
//             socket.emit("Heya")
//         })
//     })
    
//     const socketIO = require('socket.io')(http,{     second try
//         cors:{
//             origin: 'http://localhost:3000'
//         }
//     });

//     socketIO.on('connection', (socket)=>{        second try
//         console.log(`${socket.id} connected`)
//         socket.on('disconnect', ()=>{
//             console.log(`${socket.id} disconnected`)
//         })
//     })

//     app.get('/api', (req, res)=>{
//     res.json({
//         message: 'Hello World'
//     })
// })

app.listen(port, () => console.log(`Listening on port: ${port}`));