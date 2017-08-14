function Pipe(drawInfo) {
    this.ctx = drawInfo.ctx;
    this.topImage = drawInfo.topImage;
    this.bottomImage = drawInfo.bottomImage;
    this.x = drawInfo.x;
    this.bottom = drawInfo.bottom;
    //两个通道之间的空隙
    this.space = drawInfo.space;
    //通道之间的距离
    this.gap = drawInfo.gap;
    this.speed = 2;
    this.canvasWidth = drawInfo.canvasWidth;
    this.canvasHeight = drawInfo.canvasHeight;
    this.topPipeHeight = 0;
    this.bottomPipeHeight = 0;
    //先计算高度
    this.initHeight();
}

Pipe.prototype = {
    constructor: Pipe,
    draw: function () {
        // this.initHeight();
        //线画出上面的管道
        this.ctx.drawImage(this.topImage, this.x, 0, this.topImage.width, this.topPipeHeight);
        //再画下面的管道
        this.ctx.drawImage(this.bottomImage, this.x, this.topPipeHeight + this.space, this.topImage.width, this.bottomPipeHeight);
        //画两个方形
         //画两个方形
        ctx.rect(this.x, 0, this.topImage.width, this.topPipeHeight);
        ctx.rect(this.x, this.topPipeHeight + this.space, this.topImage.width, this.bottomPipeHeight);
        //移动坐标
        this.x -= this.speed;
        if (this.x < -this.topImage.width) {
            //如果管道移动到canvas之外的画就重新再重新开始画
            this.x = this.canvasWidth - this.topImage.width + this.gap;
            this.initHeight();
            // console.log(this.topPipeHeight);
        }
    },

    initHeight: function () {
        //随机计算高度
        this.topPipeHeight = Math.random() * 200 + 100;
        this.bottomPipeHeight = this.canvasHeight - this.topPipeHeight - this.space - this.bottom;
    }



}