var WebSocketClient = require('websocket').client;

client = new WebSocketClient()

client.on("connect",function(connection){
    console.log("connected");
    connection.on('message', function(message) {
        console.log("We get signal");
        console.log(message.utf8Data);
        //转换成json数据
        console.log(JSON.parse(message.utf8Data));
    })
});

client.connect("ws://127.0.0.1:8080/")

