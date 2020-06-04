#!/usr/local/bin/node
 
var fs = require('fs');
 
// if(process.argv.length < 3){
//     console.log('usage: ./watch.js filename');
//     process.exit(0);
// }
 
// fs.watchFile(process.argv[2],function(curr,prev){
//     if(curr.size > prev.size){
//         var file = fs.createReadStream(process.argv[2],{flags:'r',start:prev.size,end:curr.size});
//         file.pipe(process.stdout);
//     }
// });

fs.watchFile("/Users/qliu/qliu/monit/test.txt",function(curr,prev){
    if(curr.size > prev.size){
        var file = fs.createReadStream("/Users/qliu/qliu/monit/test.txt",{flags:'r',start:prev.size,end:curr.size});
        var i = 0
        file.on('data', function(chunk){
            var strs = new Array()
            strs = strs.concat(chunk.toString().split("\n"))
            for(i=1;i<strs.length;i++)
            {
                console.log(i +": "+ strs[i])
            }
            strs = new Array()
            console.log("typeof " + typeof(chunk))
          }) 
    }
});