import randomSeed from 'random-seed'
const TODAY = new Date().toDateString()

const colors = [
  { name: 'blue',    bg: '#0074d9', },
  { name: 'navy',    bg: '#001f3f', },
  { name: 'lime',    bg: '#88bd9f', },
  { name: 'teal',    bg: '#39cccc', },
  { name: 'cyan',    bg: '#448898', },
  { name: 'fuchsia', bg: '#ce71d1', },
  { name: 'blue',    bg: '#595a7d', },
  { name: 'dark-blue',bg: '#1117d1',},
  { name: 'orange',  bg: '#ff851b', },
  { name: 'maroon',  bg: '#85144b', },
  { name: 'purple',  bg: '#b10dc9', },
  { name: 'yellow',  bg: '#ffdc00', },
  { name: 'aqua',    bg: '#7fdbff', },
]

const unknownColor = { name: 'grey', bg: '#aaaaaa', }

export default function getColor(no) {
  const rand = randomSeed.create(TODAY)
  const startIndex = rand(colors.length)
  const color = no < 0
    ? unknownColor
    : colors[(startIndex + no) % colors.length]

  return {
    backgroundColor: color.bg,
    opacity: 0.3,
  }
}

global.getColor = getColor
