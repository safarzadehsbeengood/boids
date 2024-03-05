let view = 40;
let maxSpeed = 5;
let turnFactor = 0.2;
class Boid {
    constructor(x, y, i) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 5));
        this.acceleration = createVector();
        this.speed = sqrt(this.velocity.x**2 + this.velocity.y ** 2);
        this.i = i;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.speed = sqrt(this.velocity.x**2+this.velocity.y**2);
        // if (this.speed != 0 && this.speed > maxSpeed) {
        //     this.velocity.x = (this.velocity.x/speed) * maxSpeed;
        //     this.velocity.y = (this.velocity.y/speed) * maxSpeed;
        // }
        // check x
        if (this.position.x > width) {
            this.position.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = width;
        }
        // check y
        if (this.position.y > height) {
            this.position.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    turn() {
         if (this.position.x > width-100) {
            this.velocity.x -= turnFactor;
        }
        if (this.position.x < 100) {
            this.velocity.x += turnFactor;
        }
        // check y
        if (this.position.y > height-100) {
            this.velocity.y -= turnFactor;
        }
        if (this.position.y < 100) {
            this.velocity.y += turnFactor;
        }
    }
    
    align(boids) {
        let alignmentFactor = 0.06;
        let visibleBoids = 0;
        let total = createVector();
        for (let boid of boids) {
            if (boid != this && dist(this.position.x, this.position.y, boid.position.x, boid.position.y) < view) {
                total.add(boid.velocity);
                visibleBoids++;
            }
        }
        if (visibleBoids > 0) {
            total.div(visibleBoids);
            total.sub(this.velocity);
            total.x *= alignmentFactor;
            total.y *= alignmentFactor;
        }
        return total;
    }

    separate(boids) {
        let protectedRange = 20;
        let avoidFactor = 0.005;
        let close = createVector();
        for (let boid of boids) {
            if (boid != this && dist(this.position.x, this.position.y, boid.position.x, boid.position.y) < protectedRange) {
                close.x += this.position.x - boid.position.x;
                close.y += this.position.y - boid.position.y;
            }
        }
        close.x *= avoidFactor;
        close.y *= avoidFactor;
        return close;
    }

    cohesion(boids) {
        let total = createVector();
        let visibleBoids = 0;
        let centeringFactor = 0.0005;
        for (let boid of boids) {
            if (boid != this && dist(this.position.x, this.position.y, boid.position.x, boid.position.y) < view) {
                total.add(boid.position);
                visibleBoids++;
            }
        }
        if (visibleBoids > 0) {
                total.div(visibleBoids);
                total.x = (total.x - this.position.x) * centeringFactor;
                total.y = (total.y - this.position.y) * centeringFactor;
        } 
        return total;
    }
    
    flock(boids) {
        let alignment = this.align(boids);
        let separation = this.separate(boids);
        let cohesion = this.cohesion(boids);
        this.acceleration = alignment.add(separation.add(cohesion));
    }

    show() {
        fill(255);
        noStroke();
        // point(this.position.x, this.position.y);
        this.angle = this.velocity.heading();
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        triangle(15, 0, 0, 5, 0, -5);
        pop();
        strokeWeight(0);
        fill(0);
        textSize(8);
        // text(this.i, this.position.x-2, this.position.y+1);
        fill(255);
        // text(`${Math.round(this.speed)}`, this.position.x+2, this.position.y-20);
        // text(`(${Math.round(this.velocity.x)}, ${Math.round(this.velocity.y)})`, this.position.x + 10, this.position.y - 10);
    }
}