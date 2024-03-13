const flock = [];
let showView = false;
let alignSlider, cohesionSlider, separationSlider, viewButton, boidsSlider;
const alignVal = document.getElementById("alignInfo");
const cohesionVal = document.getElementById("cohesionInfo");
const separationVal = document.getElementById("separationInfo");
const count = document.getElementById("count");
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
    boidsSlider = createSlider(0, 100, 20, 1);
    boidsSlider.id("boidsSlider");
    boidsSlider.class("slider");
    viewButton = createCheckbox("View", false);
    viewButton.class("btn");
    viewButton.parent("btnContainer");
    alignSlider.parent('sliders');
    cohesionSlider.parent('sliders');
    separationSlider.parent('sliders');
    alignSlider.class('slider');
    cohesionSlider.class('slider');
    separationSlider.class('slider');
    for (var i = 0; i < boidsSlider.value(); i++) {
        flock.push(new Boid(floor(random(width)), floor(random(height)), i));
    }
}

function updateBoids(val) {
    while (flock.length > val) {
        flock.pop();
    }
    while (flock.length < val) {
        flock.push(new Boid(floor(random(width)), floor(random(height)), flock.length));
    }
}

function draw() {
    background(0);
    noFill();
    strokeWeight(5);
    stroke(255);
    rect(0, 0, width, height);
    count.textContent = `n = ${boidsSlider.value()}`;
    alignVal.textContent = `A: ${alignSlider.value()}`;
    cohesionVal.textContent = `C: ${cohesionSlider.value()}`;
    separationVal.textContent = `S: ${separationSlider.value()}`;
    if (flock.length != boidsSlider.value()) {
        updateBoids(boidsSlider.value());
    }

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

window.onresize = () => {
    resizeCanvas(windowWidth-100, windowHeight-100);
}