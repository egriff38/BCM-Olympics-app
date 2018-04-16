import {TweenLite, Power4} from 'gsap'
import _ from 'lodash'

// some constants
// const DECAY = 4 // confetti decay in seconds
// const SPREAD = 60 // degrees to spread from the angle of the cannon
// const GRAVITY = 1200
const DEFAULTCONFIG = {
  decay: 4,
  spread: 60,
  gravity: 1200
}
class ConfettiCannon {
  constructor ({element, config = DEFAULTCONFIG}) {
    // setup a canvas
    this.config = config
    this.canvas = element
    this.dpr = window.devicePixelRatio || 1
    this.ctx = this.canvas.getContext('2d')
    this.ctx.scale(this.dpr, this.dpr)

    // add confetti here
    this.confettiSpriteIds = []
    this.confettiSprites = {}

    // vector line representing the firing angle
    this.drawVector = false
    this.vector = [
      {
        x: window.innerWidth,
        y: window.innerHeight * 1.25
      },
      {
        x: window.innerWidth,
        y: window.innerHeight * 2
      }
    ]

    this.pointer = {}

    // bind methods
    this.render = this.render.bind(this)
    this.setCanvasSize = this.setCanvasSize.bind(this)

    this.setupListeners()
    this.setCanvasSize()

    // fire off for a demo
    this.timer = setTimeout(this.handleMouseup, 1000)
  }

  setupListeners () {
    // Use TweenLite tick event for the render loop
    TweenLite.ticker.addEventListener('tick', this.render)

    // bind events
    window.addEventListener('resize', this.setCanvasSize)
  }

  setCanvasSize () {
    this.canvas.width = window.innerWidth * this.dpr
    this.canvas.height = window.innerHeight * this.dpr
    this.canvas.style.width = window.innerWidth + 'px'
    this.canvas.style.height = window.innerHeight + 'px'
  }
  addConfettiParticles (amount, angle, velocity, x, y) {
    let i = 0
    while (i < amount) {
      // sprite
      const r = _.random(4, 6, true) * this.dpr
      const d = _.random(15, 25, true) * this.dpr
      // color
      const cr = _.random(30, 255, true)
      const cg = _.random(30, 230, true)
      const cb = _.random(30, 230, true)
      const color = `rgb(${cr}, ${cg}, ${cb})`

      const tilt = _.random(10, -10, true)
      const tiltAngleIncremental = _.random(0.07, 0.05, true)
      const tiltAngle = 0

      const id = _.uniqueId()
      const sprite = {
        [id]: {
          angle,
          velocity,
          x,
          y,
          r,
          d,
          color,
          tilt,
          tiltAngleIncremental,
          tiltAngle
        }
      }

      Object.assign(this.confettiSprites, sprite)
      this.confettiSpriteIds.push(id)
      this.tweenConfettiParticle(id)
      i++
    }
  }

  tweenConfettiParticle (id) {
    const minAngle = this.confettiSprites[id].angle - this.config.spread / 2
    const maxAngle = this.confettiSprites[id].angle + this.config.spread / 2

    const minVelocity = this.confettiSprites[id].velocity / 4
    const maxVelocity = this.confettiSprites[id].velocity

    // Physics Props
    const velocity = _.random(minVelocity, maxVelocity, true)
    const angle = _.random(minAngle, maxAngle, true)
    const gravity = this.config.gravity
    const friction = _.random(0.1, 0.25, true)
    const d = 0

    TweenLite.to(this.confettiSprites[id], this.config.decay, {
      physics2D: {
        velocity,
        angle,
        gravity,
        friction
      },
      d,
      ease: Power4,
      onComplete: () => {
        // remove confetti sprite and id
        _.pull(this.confettiSpriteIds, id)
        delete this.confettiSprites[id]
      }
    })
  }

  updateConfettiParticle (id) {
    const sprite = this.confettiSprites[id]

    const tiltAngle = 0.0005 * sprite.d

    sprite.angle += 0.01
    sprite.tiltAngle += tiltAngle
    sprite.tiltAngle += sprite.tiltAngleIncremental
    sprite.tilt = Math.sin(sprite.tiltAngle - sprite.r / 2) * sprite.r * 2
    sprite.y += Math.sin(sprite.angle + sprite.r / 2) * 2
    sprite.x += Math.cos(sprite.angle) / 2
  }

  drawConfetti () {
    this.confettiSpriteIds.map(id => {
      const sprite = this.confettiSprites[id]

      this.ctx.beginPath()
      this.ctx.lineWidth = sprite.d / 2
      this.ctx.strokeStyle = sprite.color
      this.ctx.moveTo(sprite.x + sprite.tilt + sprite.r, sprite.y)
      this.ctx.lineTo(
        sprite.x + sprite.tilt,
        sprite.y + sprite.tilt + sprite.r
      )
      this.ctx.stroke()

      this.updateConfettiParticle(id)
    })
  }

  render () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawConfetti()
  }
}

export default ConfettiCannon
