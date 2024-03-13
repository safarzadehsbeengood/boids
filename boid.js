let cohesionRadius = 70;
let alignmentRadius = 60;
let avoidanceRadius = 40;
let turnFactor = 0.1;

class Boid {
    constructor(x, y, i) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 5));
        this.acceleration = createVector();
        // this.speed = sqrt(this.velocity.x**2 + this.velocity.y ** 2);
        this.i = i;
        this.maxForce = 0.05;
        this.maxSpeed = 6;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        // this.speed = sqrt(this.velocity.x**2+this.velocity.y**2);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    edge() {
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
        let visibleBoids = 0;
        let total = createVector();
        for (let boid of boids) {
            if (boid != this && dist(this.position.x, this.position.y, boid.position.x, boid.position.y) < alignmentRadius) {
                total.add(boid.velocity);
                visibleBoids++;
            }
        }
        if (visibleBoids > 0) {
            total.div(visibleBoids);
            total.setMag(this.maxSpeed);
            total.sub(this.velocity);
            total.limit(this.maxForce);
        }
        return total;
    }

    separate(boids) {
        let close = createVector();
        let visibleBoids = 0;
        for (let boid of boids) {
            let d = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (boid != this && d < avoidanceRadius) {
                let diff = p5.Vector.sub(this.position, boid.position);
                diff.div(d*d);
                close.add(diff);
                visibleBoids++;
            }
        }
        if (visibleBoids > 0) {
            close.div(visibleBoids);
            close.setMag(this.maxSpeed);
            close.sub(this.velocity);
            close.limit(this.maxForce);
        }
        return close;
    }

    cohesion(boids) {
        let total = createVector();
        let visibleBoids = 0;
        for (let boid of boids) {
            if (boid != this && dist(this.position.x, this.position.y, boid.position.x, boid.position.y) < cohesionRadius) {
                total.add(boid.position);
                visibleBoids++;
            }
        }
        if (visibleBoids > 0) {
                total.div(visibleBoids);
                total.sub(this.position);
                total.setMag(this.maxSpeed);
                total.sub(this.velocity);
                total.limit(this.maxForce);
        }
        return total;
    }
    
    flock(boids) {
        let alignment = this.align(boids);
        let separation = this.separate(boids);
        let cohesion = this.cohesion(boids);
        alignment.mult(alignSlider.value());
        separation.mult(separationSlider.value());
        cohesion.mult(cohesionSlider.value());
        this.acceleration.add(alignment);
        this.acceleration.add(separation);
        this.acceleration.add(cohesion);
    }

    show() {
        // point(this.position.x, this.position.y);
        this.angle = this.velocity.heading();
        strokeWeight(0);
        stroke(255);
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        fill(255);
        triangle(15, 0, 0, 5, 0, -5);
        pop();
    }

    showView() {
        strokeWeight(0);
        stroke(255);
        fill(0, 255, 200, 41);
        circle(this.position.x, this.position.y, alignmentRadius*2);
        fill(255, 0, 0, 71);
        circle(this.position.x, this.position.y, avoidanceRadius*2);
        fill(0, 255, 0, 10);
        circle(this.position.x, this.position.y, cohesionRadius*2);
    }
}