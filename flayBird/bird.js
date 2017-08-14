function Bird(drawInfo) {
    this.ctx = drawInfo.ctx;
    this.image = drawInfo.image;
    this.width = this.image.width / 3;
    this.height = this.image.height;
    this.x = drawInfo.x;
    this.y = drawInfo.y;
    this.index = 0;
    this.speed = 0;
    this.aspeed = 0.0004;
    this.maxSpeed = 0.3;
    this.maxAngle = 45;
}
Bird.prototype = {
    constructor: Bird,
    draw: function (deltaTime) {
        //计算小鸟的当前位子
        //小鸟改变之后的速度
        this.speed = this.speed + this.aspeed * deltaTime;
        //改变后的位移位置
        this.y += this.speed * deltaTime + this.aspeed * deltaTime * deltaTime / 2;
        // if (this.y > canvas.height - 150) {
        //     this.y = 0;
        // }
        // //遮罩层
        // ctx.save();
        // ctx.beginPath();
        // ctx.fillStyle = "rgba(0,0,0,0.1)";
        // ctx.fillRect(0,0,canvas.width,canvas.height);
        // ctx.restore();
        //保存当前的状态
        // console.log(this.width+","+this.height);
        ctx.save();
        //小鸟要发生旋转运动,所以把当前画布起始点移动到自己
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        // 公式：当前速度/最大速度 = 当前角度/最大角度
        var currenAngle = this.maxAngle * this.speed / this.maxSpeed;
        ctx.rotate(this.angleToRadian(currenAngle));

        //绘制小鸟
        this.index += 1;
        this.ctx.drawImage(this.image, this.width * (this.index % 3), 0, this.width, this.height,
            -this.width / 2, -this.height / 2, this.width, this.height
        );
        ctx.restore();
    },
    angleToRadian: function (angle) {
        return angle / 180 * Math.PI;
    }






}