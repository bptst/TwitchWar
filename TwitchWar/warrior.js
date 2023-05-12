var score_left=0
var score_right=0
var canvas = document.getElementById('canvas');

class Warrior {
  constructor(stats, pseudo, team, line) {
    this.team=team
    this.image=document.getElementById('img_sprite_run_'+stats['type']);
    this.type = stats['type'];
    this.pseudo = pseudo;
    this.spriteWidth=384/4;
    this.spriteHeight=96;
    this.width=this.spriteWidth ;
    this.height=this.spriteHeight;
    this.x=(canvas.width/2+(canvas.width/2-100)*-team)-this.width/2;
    this.y=1080-250;
    this.frame=0;
    this.nb_frame;
    this.speed=stats['speed']*team;
    this.state='walk';
    this.line=line;
    this.hp=stats['hp'];
    this.max_hp=stats['hp'];
    this.target=null;
    this.disapear=0;
    this.size=stats['size'];
    this.range=stats['range'];
    this.damage=stats['damage'];
    this.attack_list=stats['attack_list'];
    this.attack=stats['attack_list'][0];
    this.armor=stats['armor'];
  }

  draw(context){
    context.drawImage(this.image,this.frame *this.spriteWidth,0 , this.spriteWidth,this.spriteHeight, this.x,this.y, this.width, this.height);

    if (this.state!='dead'){
      context.fillText(this.pseudo, this.x+this.width/2, this.y+30);


    // HP BAR
    if (this.hp<this.max_hp){
      var pourcent=40*(this.hp/this.max_hp)
      if (pourcent<0){
        pourcent=0
      }
    context.drawImage(document.getElementById('hp_bar_red'),0,0 , 10,this.spriteHeight, this.x+20, this.y, 40, 200);
    context.drawImage(document.getElementById('hp_bar'),0,0 , 10,this.spriteHeight, this.x+20, this.y, pourcent, 200);
    }
  }

    this.update()
  }
  switch_attack(){
    const choix=getRandomInt(this.attack_list.length)
    this.attack=this.attack_list[choix]
    this.image=document.getElementById('img_sprite_attack_'+this.type+'_'+choix.toString())


  }
  attack_action(){
    this.armor=1

    if (this.attack[1]=='damage'){
      this.target.hp-=this.damage*this.target.armor
    }
    if (this.attack[1]=='heal'){
      this.hp+=this.damage
    }
    if (this.attack[1]=='shield'){
      this.hp+=this.armor=0.5
    }

  }

  remove(){
    if (this.team==1){
      for(var i = 0; i < tab_first_l[this.line].length; i++) {
         if(tab_first_l[this.line][i] == this) {
          tab_first_l[this.line].splice(i,1);
           mort_l+=1

          }
       }
  }else{
    for(var i = 0; i < tab_first_r[this.line].length; i++) {
         if(tab_first_r[this.line][i] == this) {
      tab_first_r[this.line].splice(i,1);
       mort_r+=1
      }
     }
  }
  }

  check_death(){
    if (this.hp<1){
      this.state='dead'
      if (this.target !=null){
      this.target.state='walk'
      this.target.target=null
      }
      this.remove()
      this.image=document.getElementById('img_sprite_death_'+this.type)
      this.frame=0
    }
    if (this.x<0){
      this.state='dead'
      score_right+=1
      document.getElementsByClassName('score_right')[0].innerHTML=score_right
    this.remove()
   }
    if (this.x>canvas.width ){
      this.state='dead'
      score_left+=1
      document.getElementsByClassName('score_left')[0].innerHTML=score_left
    this.remove()
       }
  }

  update(){

    if (this.state != 'dead'){
    this.check_death()

    switch (this.state) {
      case 'walk':
        this.x+=this.speed
        this.image=document.getElementById('img_sprite_run_'+this.type);
        break;
    case 'fight':
        this.switch_attack()
        if (this.target.state=='dead'){
          this.state='walk'
        }
        break;

    case 'dead':
      break

    default:
    console.log(`Etat pas défini`);
  }

    if (this.frame<this.nb_frame){
      this.frame+=1
    }
    else {
      this.frame=0
  //COMBAT
      if (this.state=='fight'){
        this.switch_attack()

        this.attack_action()
      }
    }
}
else{

  if (this.frame<this.nb_frame && this.frame!=-1){
    this.frame+=1
  }
  else{
    this.disapear+=1
    if (this.disapear>51){

    for(var i = 0; i < tab_warrior.length; i++) {
         if(tab_warrior[i] == this) {
        tab_warrior.splice(i,1);

          }
     }
}
  }
}
this.nb_frame=(this.image.naturalWidth/96)-1

  }
}
