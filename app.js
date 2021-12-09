const canvas = document.getElementById('canvas')
const tolerance = 165
const referenceColor = {
    r: 0,
    g: 255,
    b: 0
}
const image = new Image()

image.src = './maxresdefault.jpg'
image.onload = drawImage

function drawImage() {
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)
    processImage(ctx)
}

function processImage(context) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        const color = {r, g, b}

        if (distance(color, referenceColor) < tolerance) {
            data[i + 3] = 0
        }
        
    }
    context.putImageData(imageData, 0, 0)
}

function distance(color, reference) {
    const diff = { 
        r: reference.r - color.r,
        g: reference.g - color.g,
        b: reference.b - color.b 
    }
    const module =
         Math.sqrt((diff.r * diff.r) + (diff.g * diff.g) + (diff.b * diff.b));
    return module
}