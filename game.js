let = btn = document.getElementById('start_btn');
let el = document.getElementById('cube-container');
let score = document.getElementById('score');
let game = null;
btn.addEventListener('click', function() {
    if (game) {
        game.reset();
    }
    game = new Game();
})

document.addEventListener("keydown", function (event) {
    event.preventDefault();
    if (!game) {
        game = new Game();
    }
    switch(event.keyCode) {
        case 40: 
            game.move(3);
            break;
        case 38:
            game.move(2);
            break;
        case 37:
            game.move(0);
            break;
        case 39:
            game.move(1);
            break;
    }
  });

function Game(size) {
    this.board = new Board(size || 4)
    this.state = 'pending';
    this.score = 0;
    this.maxNum = 2;
    this.finishNum = 2048;
    this.start();
}

Game.prototype.reset = function() {
    el.innerHTML = "";
}

Game.prototype.start = function() {
    this.board.addNew();
    this.board.addNew();
    this.updateInfo();
}

Game.prototype.move = function(dirc) {
    if (this.state == 'finished' || !this.canMove(dirc)) {
        return;
    }
    switch(dirc) {
        case 0:
            this.moveLeft()
            break;
        case 1:
            this.moveRight()
            break;
        case 2:
            this.moveUp();
            break;
        case 3:
            this.moveDown();
            break;
    }
    this.board.addNew();
    this.updateInfo();
}
Game.prototype.canMove = function(dirc) {
    if (dirc == 0) {
        for (var i = 0; i < this.board.size; i++) {
            var j = 0;
            while(j < this.board.size && this.board.cells[i][j]) {
                if (j > 0 && this.board.cells[i][j].val == this.board.cells[i][j - 1].val) {
                    return true;
                }
                j++;

            }
            while(j < this.board.size && !this.board.cells[i][j]) {
                j++;
            }
            if (j < this.board.size) {
                return true;
            }
        }
        return false;
    }
    if (dirc == 1) {
        for (var i = 0; i < this.board.size; i++) {
            var j = this.board.size - 1;
            while(j >= 0 && this.board.cells[i][j]) {
                if (j < this.board.size - 1 && this.board.cells[i][j].val == this.board.cells[i][j + 1].val) {
                    return true;
                }
                j--;
            }
            while(j >= 0 && !this.board.cells[i][j]) {
                j--;
            }
            if (j >= 0) {
                return true;
            }
        }
        return false;
    }
    if (dirc == 2) {
        for (var i = 0; i < this.board.size; i++) {
            var j = 0;
            while(j < this.board.size && this.board.cells[j][i]) {
                if (j > 0 && this.board.cells[j][i].val == this.board.cells[j - 1][i].val) {
                    return true;
                }
                j++;
            }
            while(j < this.board.size && !this.board.cells[j][i]) {
                j++;
            }
            if (j < this.board.size) {
                return true;
            }
        }
        return false;
    }
    if (dirc == 3) {
        for (var i = 0; i < this.board.size; i++) {
            var j = this.board.size - 1;
            while(j >= 0 && this.board.cells[j][i]) {
                if (j < this.board.size - 1 && this.board.cells[j][i].val == this.board.cells[j + 1][i].val) {
                    return true;
                }
                j--;
            }
            while(j >= 0 && !this.board.cells[j][i]) {
                j--;
            }
            if (j >= 0) {
                return true;
            }
        }
        return false;
    }
}

Game.prototype.moveLeft = function() {
    // 逐行移动数字，都移到一侧
    for (let i = 0; i < this.board.size; i++) {
        var k = 0;
        for (let j = 0; j < this.board.size; j++) {
            if (this.board.cells[i][j]) {
                if (j != k) {
                    this.board.cells[i][k] = this.board.cells[i][j];
                    this.board.cells[i][j] = null;
                }
                k++;
            }
        }
    }
    // 合并数字，计算score
    for (let i = 0; i < this.board.size; i++) {
        var j = 0;
        var k = 0;
        if (this.board.cells[i][0] === null) {
            continue;
        }
        while (j < this.board.size && this.board.cells[i][j]) {
            let cur = this.board.cells[i][j];
            if (j == this.board.size - 1) {
                this.board.cells[i][k] = cur;
                this.board.cells[i][k].update(i, k);
                k++;
                j++;
                break;
            }
            let next = this.board.cells[i][j + 1]
            if (!next || cur.val!= next.val) {
                this.board.cells[i][k] = cur;
                this.board.cells[i][k].update(i, k);
                k++;
                j++;
            } else {
                this.board.cells[i][k] = cur;
                this.board.cells[i][k].update(i, k, 2 * cur.val);
                this.score += cur.val;
                this.maxNum = cur.val > this.maxNum ? cur.val : this.maxNum;
                next.clear();
                j += 2;
                k++;
            }
        }
        while (k < this.board.size) {
            this.board.cells[i][k] = null;
            k++;
        }
    }
}
Game.prototype.moveUp = function() {
    // 逐行移动数字，都移到一侧
    for (let i = 0; i < this.board.size; i++) {
        var k = 0;
        for (let j = 0; j < this.board.size; j++) {
            if (this.board.cells[j][i]) {
                if (j != k) {
                    this.board.cells[k][i] = this.board.cells[j][i];
                    this.board.cells[j][i] = null;
                }
                k++;
            }
        }
    }
    // 合并数字，计算score
    for (let i = 0; i < this.board.size; i++) {
        var j = 0;
        var k = 0;
        if (this.board.cells[0][i] === null) {
            continue;
        }
        while (j < this.board.size && this.board.cells[j][i]) {
            let cur = this.board.cells[j][i];
            if (j == this.board.size - 1) {
                this.board.cells[k][i] = cur;
                this.board.cells[k][i].update(k, i);
                k++;
                j++;
                break;
            }
            let next = this.board.cells[j + 1][i]
            if (!next || cur.val!= next.val) {
                this.board.cells[k][i] = cur;
                this.board.cells[k][i].update(k, i);
                k++;
                j++;
            } else {
                this.board.cells[k][i] = cur;
                this.board.cells[k][i].update(k, i, 2 * cur.val);
                this.score += cur.val;
                this.maxNum = cur.val > this.maxNum ? cur.val : this.maxNum;

                next.clear();
                j += 2;
                k++;
            }
        }
        while (k < this.board.size) {
            this.board.cells[k][i] = null;
            k++;
        }
    }
}
Game.prototype.moveDown = function() {
    // 逐行移动数字，都移到一侧
    for (let i = 0; i < this.board.size; i++) {
        var k = this.board.size - 1;
        for (let j = this.board.size - 1; j >= 0; j--) {
            if (this.board.cells[j][i]) {
                if (j != k) {
                    this.board.cells[k][i] = this.board.cells[j][i];
                    this.board.cells[j][i] = null;
                }
                k--;
            }
        }
    }
    // 合并数字，计算score
    for (let i = 0; i < this.board.size; i++) {
        var j = this.board.size - 1;
        var k = this.board.size - 1;
        if (this.board.cells[this.board.size - 1][i] === null) {
            continue;
        }
        while (j >= 0 && this.board.cells[j][i]) {
            let cur = this.board.cells[j][i];
            if (j == 0) {
                this.board.cells[k][i] = cur;
                this.board.cells[k][i].update(k, i);
                k--;
                j--;
                break;
            }
            let next = this.board.cells[j - 1][i]
            if (!next || cur.val!= next.val) {
                this.board.cells[k][i] = cur;
                this.board.cells[k][i].update(k, i);
                k--;
                j--;
            } else {
                this.board.cells[k][i] = cur;
                this.board.cells[k][i].update(k, i, 2 * cur.val);
                this.score += cur.val;
                this.maxNum = cur.val > this.maxNum ? cur.val : this.maxNum;
                next.clear();
                j -= 2;
                k--;
            }
        }
        while (k >= 0) {
            this.board.cells[k][i] = null;
            k--;
        }
    }
}
Game.prototype.moveRight = function() {
    // 逐行移动数字，都移到右侧
    for (let i = 0; i < this.board.size; i++) {
        var k = this.board.size - 1;
        for (let j = this.board.size - 1; j >= 0; j--) {
            if (this.board.cells[i][j]) {
                if (j != k) {
                    this.board.cells[i][k] = this.board.cells[i][j];
                    this.board.cells[i][j] = null;
                }
                k--;
            }
        }
    }
    // 合并数字，计算score
    for (let i = 0; i < this.board.size; i++) {
        var j = this.board.size - 1;
        var k = this.board.size - 1;
        if (this.board.cells[i][j] === null) {
            continue;
        }
        while (j >= 0 && this.board.cells[i][j]) {
            let cur = this.board.cells[i][j];
            if (j == 0) {
                this.board.cells[i][k] = cur;
                this.board.cells[i][k].update(i, k);
                k--;
                j--;
                break;
            }
            let next = this.board.cells[i][j - 1]
            if (!next || cur.val!= next.val) {
                this.board.cells[i][k] = cur;
                this.board.cells[i][k].update(i, k);
                k--;
                j--;
            } else {
                this.board.cells[i][k] = cur;
                this.board.cells[i][k].update(i, k, 2 * cur.val);
                this.score += cur.val;
                this.maxNum = cur.val > this.maxNum ? cur.val : this.maxNum;
                next.clear();
                j -= 2;
                k--;
            }
        }
        while (k >= 0) {
            this.board.cells[i][k] = null;
            k--;
        }
    }
}
Game.prototype.updateInfo = function() {
    this.showScore();
    if (this.maxNum == this.finishNum) {
        this.state = 'finished';
        alert('you win!')
    }
    if (this.board.isFill()) {
        this.state = 'finished';
        alert('game over');
    }
}
Game.prototype.showScore = function() {
    score.innerText = this.score;
}

function Board(size) {
    this.size = size;
    this.cells = this.init();
}
Board.prototype.init = function() {
    let cells = [];
    for (let i = 0; i < this.size; i++) {
        cells[i] = [];
        for (let j = 0; j < this.size; j++) {
            cells[i][j] = null;
        }
    }
    return cells;
}
Board.prototype.addNew = function() {
    let arr = [];
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            if (this.cells[i][j] === null) {
                arr.push([i, j]);
            }
        }
    }
    if (arr.length == 0) {
        return;
    }
    var index = Math.floor(Math.random() * arr.length);
    this.cells[arr[index][0]][arr[index][1]] = new Cube(arr[index][0], arr[index][1], 2);
}
Board.prototype.isFill = function() {
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            if (!this.cells[i][j]) {
                return false;
            }
            if (j - 1 >= 0 && this.cells[i][j].val == this.cells[i][j - 1].val) {
                return false;
            }
            if (i - 1 >= 0 && this.cells[i][j].val == this.cells[i - 1][j].val) {
                return false;
            }
        }
    }
    return true;
}