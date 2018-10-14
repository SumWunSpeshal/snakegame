window.onload = function() {
    canvas = document.getElementById("game-canvas");
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    context = canvas.getContext("2d");
    document.addEventListener("keydown",keyPush);
    setInterval(game, 1000/15); // 15 FPS
}

let playerPositionX = 10;
let playerPositionY = 10;
let gridSize = 30;
let tileCount = 30;
let appleX = 15;
let appleY = 15;
let pearX = 25;
let pearY = 12;
let xv = 0;
let yv = 0;
let trail= [];
let tail = 5;
let fruitCount = 0;

function keyPush(event) {
    switch(event.keyCode) {
        case 37:
            xv=-1;
            yv=0;
            break;
        case 38:
            xv=0;
            yv=-1;
            break;
        case 39:
            xv=1;
            yv=0;
            break;
        case 40:
            xv=0;
            yv=1;
            break;
    }
}

function game() {

    // Der keyPush gibt eine kontinuierliche Bewegung an --> Durch das Tastendrücken ändert sich permanent die Beschleunigung der Schlange in eine bestimmte Richtung.
    // playerPosition speichert anschließend die Position mit der vorgegebenen Richtungsänderung und wiederholt diesen Vorgang alle 15 FPS.

    playerPositionX += xv;
    playerPositionY += yv;

    // falls am linken Rand angekommen, wrappe und komme rechts wieder raus
    if(playerPositionX < 0) {
        playerPositionX = tileCount - 1;
    }

    // falls am rechten Rand angekommen, wrappe und komme links wieder raus
    if(playerPositionX > tileCount - 1) {
        playerPositionX = 0;
    }

    // falls am oberen Rand angekommen, wrappe und komme unten wieder raus
    if(playerPositionY < 0) {
        playerPositionY = tileCount - 1;
    }

    // falls am unteren Rand angekommen, wrappe und komme oben wieder raus
    if(playerPositionY > tileCount - 1) {
        playerPositionY = 0;
    }

    // context zeichnet kein bestimmtes Element! alles Dargestellte auf dem Canvas wird als gleichwertig behandelt.
    // #FF7500 ist nicht die Farbe die spezifisch der Schlange zugewiesen wird, sondern es wird dort gezeichnet, wo die Schlange sich befinden müsste.
    // Einfärbung und Schlangenposition sind unabhängig voneinander.
    context.fillStyle="black";

    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // und hier wird dann einfach "übermalt". Deswegen ist es auch nicht wichtig, dass keine spezifischen Elemente zugeordnet werden. Die Reihenfolge spielt dabei eine erhebliche Rolle! Farbe, Position, Farbe, Position.
    context.fillStyle="#00FF00";

    for(var i = 0; i < trail.length; i++) {
        context.fillRect(
          trail[i].x * gridSize,
          trail[i].y * gridSize,
          gridSize - 2,
          gridSize - 2
        ); // ist das '-2' die Lücke zwischen den einzelnen Snake-Blocks aus denen sich die Schlange zusammensetzt?

        // falls die Schlange sich selbst in den Schwanz gebissen hat, resette und setze den Schwanz auf 5
        if(trail[i].x == playerPositionX && trail[i].y == playerPositionY) {
            tail = 5;

            if (fruitCount > 0) {
              alert('you lost');
            }
        }
    }

    // gib die playerPosition an das Trail weiter damit es dann von fillRect gezeichnet werden kann.
    trail.push({
      x:playerPositionX,
      y:playerPositionY
    });

    // entferne den ersten gerenderten Trail-Block solange der Schwanz kürzer ist als der Trail.
    // Somit sind gerenderte Blöcke nicht permanent und die Schlange kann sich fortbewegen,
    // statt unendlich lang zu werden.
    while(trail.length > tail) {
      trail.shift();
    }

    if (appleX == playerPositionX && appleY == playerPositionY) {
        tail++;
        fruitCount++;
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);

        console.log('you ate ' + fruitCount + ' fruits');
    }

    // einfärben des Apfels
    context.fillStyle = "#FF0000";
    context.fillRect(
      appleX * gridSize,
      appleY * gridSize,
      gridSize - 2,
      gridSize - 2
    );

    if (pearX == playerPositionX && pearY == playerPositionY) {
        tail++;
        fruitCount++;
        pearX = Math.floor(Math.random() * tileCount);
        pearY = Math.floor(Math.random() * tileCount);

        console.log('you ate ' + fruitCount + ' fruits');
    }

    // einfärben der Birne
    context.fillStyle = "yellow";
    context.fillRect(
      pearX * gridSize,
      pearY * gridSize,
      gridSize - 2,
      gridSize - 2
    );
}
