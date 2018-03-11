import {
  grey300,
  grey400,
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500
} from 'material-ui/styles/colors'

const colors = [
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
  grey300,
  grey400
]

const getColor = () => {
  let index = Math.floor(Math.random() * (colors.length - 0) + 0)
  return colors[index]
}

export default getColor
