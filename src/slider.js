import {Draggable} from 'gsap'
let gridWidth = 200
let gridHeight = 100
Draggable.create('.slider', {
  type: 'x',
  edgeResistance: 0.65,
  bounds: '.slider',
  throwProps: false,
  snap: {
    x: function (endValue) {
      return Math.round(endValue / gridWidth) * gridWidth
    },
    y: function (endValue) {
      return Math.round(endValue / gridHeight) * gridHeight
    }
  }
})
