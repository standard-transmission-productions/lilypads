let s = [];
let p = [];
let pads = [];
let padx = [100,200,300,400,100,200,300,400];
let pady = [100,100,100,100,200,200,200,200];
let keys = [65,83,68,70,74,75,76,186];

function preload() {
  s[0] = loadSound('audio/G2.wav');
  s[1] = loadSound('audio/C3.wav');
  s[2] = loadSound('audio/E3.wav');
  s[3] = loadSound('audio/G3.wav');
  s[4] = loadSound('audio/C4.wav');
  s[5] = loadSound('audio/E4.wav');
  s[6] = loadSound('audio/G4.wav');
  s[7] = loadSound('audio/C5.wav');
}

function setup() {
  masterVolume(0.25);
  colorSetup();
  createCanvas(500, 300);
  
  background(240);
  for(i=0;i<8;i++) {
    s[i]
    pads[i] = new pad(padx[i],pady[i],c[i],ch[i],s[i],0);
  }
}

function draw() { 
  translate(windowWidth/2, windowHeight/2);
  noStroke();
  for(i=0;i<8;i++) {
    pads[i].display();
  }
  fill(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
}

function press(n) {
  let h = 0;
  for (let r = 60; r > 0; --r) {
    if(r>40){
      fill(70+h, 120+h, 220+h);
    }
    else{
      fill(100,150,250);
    }
    ellipse(n.x, n.y, r);
    h = (h + 1.5);
  }
}

function hover(n) {
  let h = 0;
  for (let r = 60; r > 0; --r) {
    if(r>40){
      fill(50+h, 100+h, 200+h);
    }
    else{
      fill(70,120,220);
    }
    ellipse(n.x, n.y, r, r);
    h = (h + 1);
  }
}

class pad {
  constructor(x,y,c,ch,s,p) {
    this.x = x;
    this.y = y;
    this.fill = c;
    this.hover = ch;
    this.s = s;
    this.p = p;
  }

  display() {
    if(dist(this.x, this.y, mouseX-(windowWidth/2), mouseY-(windowHeight/2))<25){
      hover(this);
    }
    else {
      fill(this.fill);
      ellipse(this.x,this.y,60,60);
    }
    if(this.p){
      press(this);
    }
  }
}

function colorSetup() {
  c  = [[50,100,200],[50,100,200],[50,100,200],[50,100,200],[50,100,200],[50,100,200],[50,100,200],[50,100,200]];
  ch = [[70,120,220],[70,120,220],[70,120,220],[70,120,220],[70,120,220],[70,120,220],[70,120,220],[70,120,220]];
  cc = [[100,150,250],[100,150,250],[100,150,250],[100,150,250],[100,150,250],[100,150,250],[100,150,250],[100,150,250]];
}

function mousePressed(){
  for(i=0;i<8;i++) {
    if (dist(pads[i].x, pads[i].y, mouseX-(windowWidth/2), mouseY-(windowHeight/2))<25){
      if(pads[i].p<1){
        pads[i].s.play();
        pads[i].p=1;
      }
      print("pressed");
    }
  }
}

function mouseReleased(){
  for(i=0;i<8;i++){
    pads[i].p = 0;
    pads[i].hover = ch[i];
  }
}

function keyPressed(){
  for(i=0;i<8;i++){
    if(keyCode==keys[i]){
      pads[i].fill = cc[i];
      if(pads[i].p<1){
        pads[i].s.play();
        pads[i].p=1;
      }
    }
  }
}

function keyReleased(){
  for(i=0;i<8;i++){
    if(keyCode==keys[i]){
      pads[i].fill = c[i];
      pads[i].p = 0;
    }
  }
}