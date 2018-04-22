function Cube(x, y, val) {
    this.x = x;
    this.y = y;
    this.val = val;
    this.el = null;
    this.create();
}

Cube.prototype.create = function() {
    var div = document.createElement('div');
    var divin = document.createElement('div');
    div.classList.add('p-' + this.x + '-' + this.y, 'cube-box');
    divin.classList.add('appear', 'cube', 'cube-' + this.val);
    divin.innerText = this.val;
    // merge 效果结束之后就清除
    divin.addEventListener("webkitAnimationEnd",function(e){
      if (e.animationName === "pop") {
        divin.classList.remove('cube-merge');
      }
    },false);
    div.appendChild(divin);
    el.appendChild(div);
    this.el = div;
    this.innerCube = divin;
}

Cube.prototype.update = function(x, y, val) {
    if (x != this.x || y != this.y) {
        this.el.classList.remove('appear', 'p-' + this.x + '-' + this.y);
        this.el.classList.add('p-' + x + '-' + y);
        this.x = x;
        this.y = y; 
    }
    if (typeof val != 'undefined' && val != this.val) {
        this.innerCube.classList.remove('cube-' + this.val);
        this.innerCube.innerText = val;
        this.val = val;
        this.innerCube.classList.add('cube-' + val, 'cube-merge');
    }
}
Cube.prototype.clear = function() {
    this.el.parentNode.removeChild(this.el);
}