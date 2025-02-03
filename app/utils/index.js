

exports.shuffleArr = function (arr) {
  const len = arr.length
  let index = 0
  for (let i = len - 1; i > 0; i--) {
    index = Math.floor(Math.random() * (i + 1))
    let temp = arr[index]
    arr[index] = arr[i]
    arr[i] = temp
  }
}