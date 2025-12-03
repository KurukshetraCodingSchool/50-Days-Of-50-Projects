    // Basic Setup
    const canvas = document.querySelector("#gamecanva")
    const ctx = canvas.getContext("2d")

    const scoretext = document.querySelector("#ScoreText")
    const statusText = document.querySelector("#StatusText")
    const restartbtn = document.querySelector("#restartbtn")

    const W = canvas.width;
    const H = canvas.height;

    //player Setup

    const player = {
        x: W/2 - 20,
        y: H - 70,
        w:40,
        h:50,
        speed:4,   // speed
        moveLeft :false,
        moveRight : false
    };



    // Game Data

    let bulltes = [];
    let enemies = [];
    let lastEnemySpwan = 0;
    let lastTime = 0;
    let score = 0;
    let gameOver = false;
    let shootCoolDown = 350;
    let lastShotTime = 0;
    const enemyspawnInterval = 1000;


    // Controls

    document.addEventListener("keydown",(e)=>{
        const k = e.key.toLowerCase();
        if(k === 'arrowleft' || k === 'a') player.moveLeft = true;
        if(k === 'arrowright' || k === 'd') player.moveRight = true;
        if(e.code === 'Space' || e.key === " " ) shootBullet();

        
    })

    document.addEventListener('keyup' , (e)=>{
        const k = e.key.toLowerCase();
        if(k === 'arrowleft' || k === 'a') player.moveLeft = false;
        if(k === 'arrowright' || k === 'd') player.moveRight = false;
    })

    restartbtn.addEventListener("click", resetGame)

    // bullet shoot

    function shootBullet(){
    const now = performance.now();

    if(now - lastShotTime < shootCoolDown || gameOver ) return;

    lastShotTime = now;

    bulltes.push({
        x: player.x + player.w/2 - 3,
        y : player.y,
        w :6,
        h :15,
        speed:4   // show bulltes
    })

    }


    //Enemy 

    function spawnEnemy (){
        const w = 35;
        const h = 35;
        enemies.push({
            x:Math.random() * (W - w),
            y: -h,
            w, 
            h,
            speed: 0.8 + Math.random() * 1.2,
        });
    }


    // reset Game 

    function resetGame (){
    score = 0;
    gameover = false;
    bulltes = [];
    lastEnemy = 0;
    lastshotTime = 0;
    statusText.textContent = "Playing.......";
    scoretext.textContent = "Score : 0"
  
    requestAnimationFrame(gameLoop);

    }



    // collision check

    function isCollding(a,b){
        return(
            a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.y + a.h > b.y 
        );
    }

    // Update 

    function update (delta){
        if(gameOver) return;

        if(player.moveLeft) player.x -= player.speed
        if(player.moveRight) player.x += player.speed


        if(player.x < 0) player.x = 0;
        if(player.x + player.w > W) player.x = W - player.w;

        lastEnemySpwan += delta

        if(lastEnemySpwan >= enemyspawnInterval){
            lastEnemySpwan = 0;
            spawnEnemy();
        }

        // Update Bulltes 
        bulltes.forEach(b => b.y -= b.speed);
        bulltes = bulltes.filter(b => b.y + b.h > 0)

    // update enemis

    enemies.forEach(e => e.y += e.speed);

 
    for(let ei = enemies.length - 1; ei >= 0; ei--){
        const en = enemies[ei]
           if(en.y > H){
        gameOver = true;
        statusText.textContent = "Game Over";
        break;
           }
        for(let bi = bulltes.length - 1 ; bi>=0; bi--){
    const bl = bulltes[bi];
    if(isCollding(bl,en)){
        enemies.splice(ei,1)
        bulltes.splice(bi,1)
        score += 10;
        scoretext.textContent = "Score: " + score;
        break;
    }
}
    }

    }


    // drawing

    function draw (){
        ctx.fillStyle = "black";
        ctx.fillRect( 0 , 0 ,W , H);

        for(let i = 0; i<=40 ; i++){
            const sx = (i*73) % W;
            const sy = ((i*73)+Math.floor(lastTime))%H
            ctx.fillStyle = "rgb(0, 68, 128)";
        ctx.fillRect(sx,sy , 2 , 2);   
        }
    }

    function drawPlayer(){
    ctx.fillStyle = "rgb(0, 68, 128)"
    ctx.beginPath()
    ctx.moveTo(player.x + player.w/2 , player.y)
    ctx.lineTo(player.x , player.y + player.h)
    ctx.lineTo(player.x + player.w , player.y + player.h)
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(178, 66, 51, 0.86)"
    ctx.fillRect(player.x + player.w/2 , player.y + 15 , 10, 12)

    }

    function drawBulltes(){
        ctx.fillStyle = "rgba(250, 250, 6, 0.85)";
        bulltes.forEach(b => ctx.fillRect(b.x , b.y , b.w , b.h))
    }


    function drawEnimes(){
        enemies.forEach(e=>{
            ctx.fillStyle = "rgba(144, 0, 255, 0.93)"
            ctx.fillRect (e.x , e.y , e.w, e.h);
            ctx.fillStyle = "#ffff"
            ctx.fillRect(e.x + 5 , e.y + 8 , 6,6)
            ctx.fillRect(e.x +e.w - 11 , e.y + 8 , 6 ,6)
        })
    }

    function drawTextOverlay(){
        if(gameover){
            ctx.fillStyle = "#dedede"
            ctx.fillRect(0,0, W, H)
            ctx.fillStyle = "#ffff"
            ctx.textAlign = "26px"
            ctx.fillText ("Game Over " , W / 2 , H/2 -10)
            ctx.font ="16px"
            ctx.fillText = "Press Restart" , W/2, H/2 + 20
        }
    }


    function gameLoop(ts){

    if(!lastTime)  lastTime = ts;

    const deltaRaw = ts-lastTime;
    const delta = deltaRaw ;
    lastTime = ts;

    update(delta)
    draw()
    drawPlayer()
    drawBulltes()
    drawEnimes()
    drawTextOverlay();
        
    if (!gameOver) requestAnimationFrame(gameLoop);

    }
    resetGame ()

