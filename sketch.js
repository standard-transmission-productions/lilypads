let b1 = [];
let b2 = [];
let b3 = [];
let b4 = [];
let b5 = [];
let s = [b1,b4,b2,b3,b5];
let p = [];
let pads = [];
let padx = [100,200,300,400,100,200,300,400];
let pady = [100,100,100,100,200,200,200,200];
let keys = [65,83,68,70,90,88,67,86];
let bank = 0;

function preload() {
  b1[0] = loadSound('audio1/G2.wav');
  b1[1] = loadSound('audio1/C3.wav');
  b1[2] = loadSound('audio1/E3.wav');
  b1[3] = loadSound('audio1/G3.wav');
  b1[4] = loadSound('audio1/C4.wav');
  b1[5] = loadSound('audio1/E4.wav');
  b1[6] = loadSound('audio1/G4.wav');
  b1[7] = loadSound('audio1/C5.wav');

  b2[0] = loadSound('audio2/G2.wav');
  b2[1] = loadSound('audio2/C3.wav');
  b2[2] = loadSound('audio2/E3.wav');
  b2[3] = loadSound('audio2/G3.wav');
  b2[4] = loadSound('audio2/C4.wav');
  b2[5] = loadSound('audio2/E4.wav');
  b2[6] = loadSound('audio2/G4.wav');
  b2[7] = loadSound('audio2/C5.wav');
  
  b3[0] = loadSound('audio3/sG3.wav');
  b3[1] = loadSound('audio3/sC4.wav');
  b3[2] = loadSound('audio3/sE3.wav');
  b3[3] = loadSound('audio3/sG4.wav');
  b3[4] = loadSound('audio3/lG3.wav');
  b3[5] = loadSound('audio3/lC4.wav');
  b3[6] = loadSound('audio3/lE3.wav');
  b3[7] = loadSound('audio3/lG4.wav');

  b4[0] = loadSound('audio4/G2.wav');
  b4[1] = loadSound('audio4/C3.wav');
  b4[2] = loadSound('audio4/E3.wav');
  b4[3] = loadSound('audio4/G3.wav');
  b4[4] = loadSound('audio4/C4.wav');
  b4[5] = loadSound('audio4/E4.wav');
  b4[6] = loadSound('audio4/G4.wav');
  b4[7] = loadSound('audio4/C5.wav');

  b5[0] = loadSound('audio5/0.wav');
  b5[1] = loadSound('audio5/1.wav');
  b5[2] = loadSound('audio5/2.wav');
  b5[3] = loadSound('audio5/3.wav');
  b5[4] = loadSound('audio5/4.wav');
  b5[5] = loadSound('audio5/5.wav');
  b5[6] = loadSound('audio5/6.wav');
  b5[7] = loadSound('audio5/7.wav');
}

function setup() {
  masterVolume(1);
  colorSetup();
  var canvas = createCanvas(500, 300);
  canvas.parent('sketch-holder')
  background(250);
  for(i=0;i<8;i++) {
    s[i]
    pads[i] = new pad(padx[i],pady[i],c[i],ch[i],0);
  }
}

function draw() { 
  noStroke();
  for(i=0;i<8;i++) {
    pads[i].display();
  }
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
    //this.s = s;
    this.p = p;
  }

  display() {
    if(dist(this.x, this.y, mouseX, mouseY)<25){
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
    if (dist(pads[i].x, pads[i].y, mouseX, mouseY)<25){
      if(pads[i].p<1){
        s[bank][i].fade(1,0);
        s[bank][i].play();
        pads[i].p=1;
      }
      print("pressed");
    }
  }
}

function mouseReleased(){
  for(i=0;i<8;i++){
    s[bank][i].fade(0,1);
    pads[i].p = 0;
    pads[i].hover = ch[i];
  }
}

function keyPressed(){
  for(i=0;i<8;i++){
    if(keyCode==keys[i]){
      pads[i].fill = cc[i];
      if(pads[i].p<1){
        s[bank][i].fade(1,0);
        s[bank][i].play();
        pads[i].p=1;
      }
    }
  }
}

function keyReleased(){
  for(i=0;i<8;i++){
    if(keyCode==keys[i]){
      pads[i].fill = c[i];
      s[bank][i].fade(0,1);
      pads[i].p = 0;
    }
  }
}

function touchStarted() {
  if (dist(pads[i].x, pads[i].y, mouseX, mouseY)<25){
    if(pads[i].p<1){
      s[bank][i].fade(1,0);
      s[bank][i].play();
      pads[i].p=1;
    }
    print("pressed");
  }
  return false;
}

function touchEnded(){
  for(i=0;i<8;i++){
    s[bank][i].fade(0,1);
    pads[i].p = 0;
    pads[i].hover = ch[i];
  }
  return false;
}



function bankFunction(num) {
  bank = num;
  print(num);
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function helpFunction() {
  document.getElementById("myDropdown2").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('#b1')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if (!event.target.matches('#b2')) {
    var dropdowns = document.getElementsByClassName("dropdown-content2");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}