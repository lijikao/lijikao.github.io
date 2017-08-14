function Land(drawInfo) {
    this.ctx = ctx;
    this.image = drawInfo.image;
    this.x = drawInfo.x;
    this.y = drawInfo.y;
    this.speed = 2;
}

Land.prototype = {
    constructor: Land,
    draw: function () {
        this.ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
        this.x -= this.speed;
        if (this.x <= -this.image.width) {
            this.x += 4 * this.image.width;
        }
    }





}