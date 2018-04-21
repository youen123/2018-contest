function Cube(x, y, val) {
    this.x = x;
    this.y = y;
    this.val = val;
    this.el = null;
    this.create();
}

Cube.prototype.create = function() {
    var div = document.createElement('div');
    div.classList.add('cube', 'appear', 'p-' + this.x + '-' + this.y, 'cube-' + this.val);
    div.innerText = this.val;
    el.appendChild(div);
    this.el = div;
}

Cube.prototype.update = function(x, y, val) {
    if (x != this.x || y != this.y) {
        this.el.classList.remove('appear', 'p-' + this.x + '-' + this.y);
        this.el.classList.add('p-' + x + '-' + y);
        this.x = x;
        this.y = y; 
    }
    if (typeof val != 'undefined' && val != this.val) {
        this.el.classList.remove('cube-' + this.val);
        this.el.classList.add('cube-' + val);
        this.el.innerText = val;
        this.val = val;
    }
}
Cube.prototype.clear = function() {
    this.el.parentNode.removeChild(this.el);
}