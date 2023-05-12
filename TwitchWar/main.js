var canvas = document.getElementById('canvas');

canvas.width = 1920;

//canvas.width = window.innerWidth;
canvas.height = 1080;


//canvas.height = 1000;

var ctx = canvas.getContext('2d');
ctx.font = "20pt Calibri,Geneva,Arial";
ctx.strokeStyle = "rgb(0,0,0)";
ctx.fillStyle = "rgb(180,180,180)";
ctx.textAlign = "center";

var mort_l=0
var mort_r=0

var spike_stats={
  type:'spike',
  hp:100,
  size:20,
  range:40,
  speed:8,
  damage:10,
  nb_frame:3,
  attack_list:[['target','damage']],
  armor:1,


}

var barbarian_stats={
  type:'barbarian',
  hp:60,
  size:20,
  range:30,
  speed:10,
  damage:20,
  nb_frame:3,
  attack_list:[['target','damage']],
  armor:1,


}

var mage_stats={
  type:'mage',
  hp:100,
  size:20,
  range:100,
  speed:20,
  damage:10,
  nb_frame:3,
  attack_list:[['target','damage']],
  armor:1,


}

var soldier_stats={
  type:'soldier',
  hp:150,
  size:20,
  range:20,
  speed:6,
  damage:10,
  nb_frame:3,
  attack_list:[['target','damage'],['target','shield']],
  armor:1,


}

var orc_stats={
  type:'orc',
  hp:200,
  size:20,
  range:40,
  speed:5,
  damage:5,
  attack_list:[['target','damage']],
  armor:1,


}

var shaman_stats={
  type:'shaman',
  hp:100,
  size:20,
  range:40,
  speed:8,
  damage:5,
  attack_list:[['target','damage'],['target','heal']],
  armor:1,


}

var gobelin_stats={
  type:'gobelin',
  hp:80,
  size:20,
  range:40,
  speed:10,
  damage:15,
  attack_list:[['target','damage']],
  armor:1,


}



const tab_warrior=[]

var tab_first_l=[[],[],[],[]]
var tab_first_r=[[],[],[],[]]
var total_warrior=0

function spawn_warior(pseudo, team){

  var state=barbarian_stats

  const b=getRandomInt(3)

  if(b==1){
    state=soldier_stats
  }
  if(b==2){
    state=spike_stats
  }

  //randomise TEAM
  if (team==0){
    team=1
  if(getRandomInt(2)==1){
    team=-1
  }
}

  if (team==-1){
    state=orc_stats
    if(b==1){
      state=shaman_stats
    }
    if(b==2){
      state=gobelin_stats
    }
  }



  const warrior= new Warrior(state,pseudo,team,getRandomInt(4))
  total_warrior+=1
  if (team==1){
    tab_first_l[warrior.line].push(warrior)
  }
  if (team==-1){
    tab_first_r[warrior.line].push(warrior)
  }

  warrior.y+=warrior.line*50
  tab_warrior.push(warrior)
  setTimeout(function() { spawn_warior('pazdp',0) }, 1000)
}

setTimeout(spawn_warior('pazdp',0), 1000)





function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}




function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height)

  for (let i = 0; i < tab_warrior.length; i++) {
   tab_warrior[i].draw(ctx)
}
 for (let i = 0; i < tab_first_l.length; i++) {
   for (let p = 0; p < tab_first_l[i].length; p++) {
     for (let y = 0; y < tab_first_r[i].length; y++) {

     check_collision(tab_first_l[i][p],tab_first_r[i][y])
   }
   }
}



  setTimeout(animate, 71)
//  requestAnimationFrame(animate)
}



function check_collision(a,b){
  if (a.x+a.range> b.x-b.size){
    if (a.state!='dead'){
      a.state='fight'
    }
    a.target=b
  }

  if (b.x-b.range< a.x+a.size){
    if (b.state!='dead'){
    b.state='fight'
  }
    b.target=a
  }
}

animate()





const client1 = new tmi.Client({
	channels: [ 'kamet0' ]
});


client1.on('message', (channel, tags, message, self) => {
  var pseudo=tags['display-name']
  spawn_warior(pseudo,1)
});
//client1.connect();


const client = new tmi.Client({
	channels: [ 'jbzzed' ]
});

client.on('message', (channel, tags, message, self) => {

  var pseudo=tags['display-name']
  spawn_warior(pseudo,-1)

});
//client.connect();
