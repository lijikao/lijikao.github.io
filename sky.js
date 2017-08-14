function Sky(drawInfo) {
    this.ctx = drawInfo.ctx;
    this.image = drawInfo.image;
    this.x = drawInfo.x;
    this.speed = 2;
}

Sky.prototype = {
    constructor: Sky,
    draw: function () {
        this.ctx.drawImage(this.image, this.x, 0, this.image.width, this.image.height);
        //移动坐标
        this.x -= this.speed;
        //进行条件约束,如果当前的图片到达就切换到另外一张
        if (this.x <= -this.image.width) {
            // console.log(this.image.width);
            // this.x  =  parseInt(this.image.width);
            this.x = this.image.width;
            // console.log(this.x);
            // console.log(this);
        }


    }
}