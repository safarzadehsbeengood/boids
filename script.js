const flock = [];
let showView = false;
let alignSlider, cohesionSlider, separationSlider, viewButton;
const n = 20;
let removeBtn = document.getElementById('removeBtn');
let addBtn = document.getElementById('addBtn');
function setup() {
    var cnv = createCanvas(windowWidth-100, windowHeight-100);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    alignSlider = createSlider(0, 2, 1.5, 0.1);
    cohesionSlider = createSlider(0, 2, 1, 0.1);
    separationSlider = createSlider(0, 2, 2, 0.1);
    viewButton = createCheckbox("View", false);
    viewButton.class("btn");
    viewButton.parent("btnContainer");
    alignSlider.parent('sliders');
    cohesionSlider.parent('sliders');
    separationSlider.parent('sliders');
    alignSlider.class('slider');
    cohesionSlider.class('slider');
    separationSlider.class('slider');
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
        boid.edge();
        boid.flock(flock);
        boid.turn();
        boid.update();
        boid.show();
        if (viewButton.checked()) {
            boid.showView();
        }
    }
}

addBtn.onclick = function() {
    flock.push(new Boid(floor(random(width)), floor(random(height)), flock.length));
};

removeBtn.onclick = function() {
    flock.pop();
}

window.onresize = () => {
    resizeCanvas(windowWidth-100, windowHeight-100);
}