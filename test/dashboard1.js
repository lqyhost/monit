const axios = require('axios');
var blessed = require('blessed')
  , contrib = require('../index')

var screen = blessed.screen()

//create layout and widgets

var grid = new contrib.grid({rows: 12, cols: 12, screen: screen})


var strategy_table =  grid.set(0, 0, 6, 2, contrib.table, 
  { keys: true
  , fg: 'yellow'
  , label: 'Strategy'
  , columnSpacing: 1
  , columnWidth: [24, 5]})

var captial_table =  grid.set(6, 0, 6, 2, contrib.table, 
  { keys: true
    , fg: 'green'
    , label: 'Captial'
    , columnSpacing: 1
    , columnWidth: [24, 10]})

var order_table =  grid.set(0, 2, 12, 3, contrib.table, 
  { keys: true
    , fg: 'green'
    , label: 'Order'
    , columnSpacing: 1
    , columnWidth: [12, 12, 12,12]})

var log = grid.set(0, 5, 12, 7, contrib.log, 
  { fg: "green"
  , selectedFg: "green"
  , label: 'Server Log'})

//dummy data
var servers = ['US1', 'US2', 'EU1', 'AU1', 'AS1', 'JP1']
var commands = ['grep', 'node', 'java', 'timer', '~/ls -l', 'netns', 'watchdog', 'gulp', 'tar -xvf', 'awk', 'npm install']

var strategys = [['ma_089270','On'],['ma_089270','Off'],['ma_089270','Error']]
var captials = [['available','700000.0'],['holding_value','190800.8']]
var instruments = ['600000','300012','600009','301012','612003','302212','603892','301236']
var status = ['Send', 'Pending', 'PartTrade', 'AllTrade', 'Canceled', 'Failed']

//set dummy data for table
function generateTableStrategy() {
   strategy_table.setData({headers: ['Name', 'Staus'], data: strategys})
}

//set dummy data for table
function generateTableCaptial() {
  captial_table.setData({headers: ['Name', 'Num'], data: captials})
}

//set dummy data for table
function generateTableOrder() {
  var data = []

  for (var i=0; i<10; i++) {
    var row = []          
    row.push(instruments[Math.round(Math.random()*(instruments.length-1))])
    row.push(Math.round(Math.random()*50)*100)
    row.push(Math.round(Math.random()*10000)/100.0)
    row.push(status[Math.round(Math.random()*(status.length-1))])

    data.push(row)
  }
  order_table.setData({headers: ['Instrument', 'Volume', 'Last_price', 'Status'], data: data})
}

generateTableStrategy()
generateTableCaptial()
generateTableOrder()
strategy_table.focus()
setInterval(generateTableOrder, 3000)


// //set log dummy data
// setInterval(function() {
//    var rnd = Math.round(Math.random()*2)
//    if (rnd==0) log.log('starting process ' + commands[Math.round(Math.random()*(commands.length-1))])   
//    else if (rnd==1) log.log('terminating server ' + servers[Math.round(Math.random()*(servers.length-1))])
//    else if (rnd==2) log.log('avg. wait time ' + Math.random().toFixed(2))
//    screen.render()
// }, 500)

//set log dummy data
setInterval(function() {
  var rnd = Math.round(Math.random()*3)
  if (rnd==0) log.log('on md last price: ' + commands[Math.round(Math.random()*(commands.length-1))])   
  else if (rnd==1) log.log('sign ' + servers[Math.round(Math.random()*(servers.length-1))])
  else if (rnd==2) log.log('call after: ' + Math.random().toFixed(2))
  else if (rnd==3){
    axios.get('https://www.baidu.com/sugrec').then(function(response){log.log('queryid is '+response.data.queryid)})
  }
  screen.render()
}, 500)


screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// fixes https://github.com/yaronn/blessed-contrib/issues/10
screen.on('resize', function() {
  //table.emit('attach');
  strategy_table.emit('attach');
  captial_table.emit('attach');
  order_table.emit('attach');
  log.emit('attach');
});

screen.render()
