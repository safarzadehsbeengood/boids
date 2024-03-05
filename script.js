const flock = [];
const n = 20;
let removeBtn = document.getElementById('removeBtn');
let addBtn = document.getElementById('addBtn');
function setup() {
    // var cnv;
    // if (windowWidth > windowHeight) {
    //     cnv = createCanvas(windowHeight / 2 + 200, windowHeight / 2 + 200);
    // } else {
    //     cnv = createCanvas(windowWidth / 2 + 200, windowWidth / 2 + 200);
    // }
    var cnv = createCanvas(windowWidth-100, windowHeight-100);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    for (var i = 0; i < n; i++) {
        flock.push(new Boid(floor(random(width)), floor(random(height)), i));
    }
}

function draw() {
    background(100);
    noFill();
    strokeWeight(5);
    stroke(0);
    rect(0, 0, width, height);
    for (let boid of flock) {
        boid.flock(flock);
        boid.turn();
        boid.update();
        boid.show();
    }
}

addBtn.onclick = function() {
    let x = event.clientX-50;
    let y = event.clientY-50;
    flock.push(new Boid(floor(random(width)), floor(random(height)), flock.length));
};

removeBtn.onclick = function() {
    flock.pop();
}

window.onresize = () => {
    resizeCanvas(windowWidth-100, windowHeight-100);
}