const express = require('express')
const { Canvas, loadImage, loadFont } = require('canvas-constructor/napi-rs')
const { resolve, join } = require('path')

const app = express()

app.get('/:nombre', async (req, res) => {
  // height: 1920 px width: 1080 px
  const image = await loadImage('./src/images/cumple.png')

  const { nombre } = req.params
  
  loadFont(resolve(join(__dirname, './font/BobbyJonesSoft.otf' )), 'Bobby Jones Soft')

  const img = new Canvas(1080, 1920)
  .printImage(image, 0, 0, 1080, 1920)
  .setTextAlign('center')
  .setTextFont('102px Bobby Jones Soft')
  .printText(nombre.toUpperCase(), 540, 1070)
  .png();

  res.set({ 'Content-Type': 'image/png'})
  res.send(img)
})

app.listen(8080, () => {
  console.log(`Server ready on: http://localhost:${8080}`)
})