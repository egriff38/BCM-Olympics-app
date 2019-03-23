const Server = require('socket.io')
const EventEmitter = require('events')
const HOST = 'localhost'
const PORT = 8081
const server = require('http').Server({ origins: '*'})
let io = Server(PORT)
const ticker = new EventEmitter()
io.close() // Close current server

server.listen(PORT) // PORT is free to use

io = Server(server)
console.log("Socket Server started on "+HOST+ ":"+PORT)
let names = {}
let votes = {}
let timer = {
  totalTime: 0,
  timeElapsed: 0,
  running: false,
  color: 'red'
}

let donationList = {}

setInterval(() => { ticker.emit('tick') }, 1000)
ticker.on('tick', function tick () {
  if (!timer.running) return null
  else if (timer.timeElapsed >= timer.totalTime) {
    timer.running = false
    timer.timeElapsed = 0
  } else {
    timer.timeElapsed++
  }
  emitTimer()
})
let page = '/'
let score = new Array(5).fill(0).map(() => ({red: 0, blue: 0}))
let slideNumber = 0
let donations = []
io.on('connection', function (socket) {
  names[socket.id] = socket.id
  emitNames()
  socket.on('name', function (data) {
    names[socket.id] = data.name
    emitNames()
    emitPage()
    emitDonations()
    emitScore()
  })
  socket.on('disconnect', function () {
    delete names[socket.id]
    emitNames()
  })
  socket.on('refresh', emitNames)
  socket.on('pushDonation', function pushDonation (value) {
    console.log(`Donation of $${value} recieved`)
    donations.push({
      amount: Number(value),
      time: Date.now()
    })
    emitDonations()
  })
  socket.on('popDonation', function popDonation () {
    donations.splice(-1)
    emitDonations()
  })

  socket.on('requestToDonate', function requestToDonate () {
    let name = names[socket.id]
    donationList[name] = function release () {
      delete donationList[name]
      socket.emit('releaseDonation')
      emitDonationList()
    }
    emitDonationList()
  })
  socket.on('releaseDonationTable', function releaseTable (table) {
    if (table === null) {
      for (table in donationList) {
        donationList[table]()
      }
    } else {
      donationList[table]()
    }
  })
  
    socket.on('setColor', function setColor (data) {
      timer.color = data.color
      emitUpdateColor()
    })
    socket.on('setPage', function setPage (data) {
      page = data.page
      emitPage()
    })
    socket.on('startVote', function startVote () {
      votes = {}
      Object.values(names).filter((e) => e !== 'screen' && e !== 'admin' && e.length < 20).forEach(element => {
        votes[element] = null
      })
      io.emit('votesOpened')
      emitVoteResults()
      socket.on('closeVote', function closeVote () {
        emitVoteResults()
        io.emit('votesClosed')
      })
    })
    socket.on('setTimer', function setTimer (totalTime) {
      timer.totalTime = totalTime
      emitTimer()
    })
    socket.on('startTimer', function startTimer () {
      timer.running = true
      emitTimer()
    })
    socket.on('pauseTimer', function pauseTimer () {
      timer.running = false
      emitTimer()
    })
    socket.on('endTimer', function endTimer () {
      timer.running = false
      timer.timeElapsed = 0
      emitTimer()
    })
  socket.on('vote', function (vote) {
    let name = names[socket.id]
    if (votes.hasOwnProperty(name)) {
      votes[name] = Number(vote)
    }
    emitVoteResults()
  })
  socket.on('setSlideshow', function setSlideshow (data) {
    slideNumber = Number(data)
    emitslideShow()
  })

  socket.on('setScore', function setScore ([event, color, value]) {
    console.log(`setting score of ${color} team for event ${event} from ${score[event][color]} to ${value}.`)
    score[event][color] = value
    emitScore()
  })
  socket.on('setFullScore', function setFullScore (newScore) {
    score = newScore
    emitScore()
  })
})

function emitUpdateColor () {
  io.emit('colorUpdate', {color: timer.color})
}
function emitNames (socket) {
  io.emit('roster', { roster: names, page })
}
function emitPage () {
  io.emit('pageUpdate', {page})
}
function emitScore () {
  io.emit('scoreUpdate', score)
}
function emitslideShow () {
  io.emit('slideshowUpdate', slideNumber)
}
function emitDonations () {
  let total = donations.reduce((p, n) => p + n.amount, 0)
  console.log(`Total donations is $${total}`)
  io.emit('donationsUpdate', total)
}
function emitTimer () {
  io.emit('timerUpdate', { timeElapsed: timer.timeElapsed, totalTime: timer.totalTime, isPlaying: timer.running })
}
function emitVoteResults () {
  io.emit('voteResultsUpdate', votes)
}
function emitDonationList () {
  io.emit('updateDonationList', Object.keys(donationList))
}
