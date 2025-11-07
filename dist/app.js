"use strict";

const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;
const ScrollBarSize = { x: (pageWidth / 10) * 4, y: (pageHeight / 100) * 4 };
function getPageSize() {
  return { x: window.innerWidth, y: window.innerHeight };
}
function getCellSize() {
  const pageSize = getPageSize();
  const cols_by_page = 10;
  const rows_by_page = 100;
  return {
    width: pageSize.x / cols_by_page,
    height: pageSize.y / rows_by_page,
  };
}
function getPosition(xPosition, yPosition) {
  const cellSize = getCellSize();
  return { x: cellSize.width * xPosition, y: cellSize.height * yPosition };
}

function getScrollBarSize(width, height, unityX, unityY) {
  return { width: (width / 10) * unityX, height: (height / 100) * unityY };
}
///////////////////////////////////////////////////////////////////////////////
class Player extends EngineObject {
  static StateList = {
    STANDING: "StandingStill",
    JUMPING: "Jumping",
    FALLING: "Falling",
    RUNNING: "Running",
    RUNNING_DIFFICULT: "RunningWithDifficult",
    TRIPPING: "TrippingToTheGround",
    BEING_ATTACKED: "BeingAttacked",
    LIFTING_UP: "LiftingUp",
    ATTACKING: "Attacking",
  };
  constructor() {
    super(vec2(50, 10), vec2(1, 2), null, 0, GREEN);
    this.setCollision();
    this.Direction = 1;
    this.Health = 100;
    this.Stamina = 100;
    this.HealthBar = new BarComponent({ x: 5, y: 5 }, RED);
    this.StaminaBar = new BarComponent({ x: 5, y: 12 }, GREEN);
    this.NumberOfCompsognathusAboveYou = 0;
    this.TimerInterval = 2;
    this.Timer = this.TimerInterval;
    this.State = Player.StateList.STANDING;
    this.angle = 0;
    this.Sprite = new SpritePlayer(this.pos, vec2(2, 6)); //1.57 es -90
    // this.angleVelocity = 0.001;//agrega momento angular osea gira
    // this.localAngle = ;
  }
  update() {
    this.settingSprites();
    this.inputs();
    this.setCamera();

    this.StaminaBar.adjustValue(this.Stamina);
    this.HealthBar.adjustValue(this.Health);

    // debugText(`Player Direction ${this.Direction}`, vec2(this.pos.x, 5));
    debugText(`State ${this.State}`, vec2(this.pos.x, 10));
    debugText(`Player posY ${this.pos.y}`, vec2(this.pos.x, 6));
    debugText(
      `Compsognathus ${this.NumberOfCompsognathusAboveYou}`,
      vec2(this.pos.x, 8)
    );
    this.restStamina();
    this.movement();
    // debugText(`Mouse ${mousePosScreen}`, vec2(this.pos.x, 7.5));
  }
  run() {}
  jump() {}
  attack() {}
  shake() {}
  movement() {
    if (this.State == Player.StateList.TRIPPING) {
      this.trippingToTheGround();
    }
  }
  settingSprites() {
    this.Sprite.mirror = this.Direction > 0 ? true : false;
    this.Sprite.pos = vec2(this.pos.x, this.pos.y + 2);
  }
  trippingToTheGround() {}
  inputs() {
    let move = vec2(0, 0);
    let isJumping = false;
    if (isTouchDevice) {
      touchGamepadEnable = true;
      isJumping = gamepadIsDown(0);
      move = gamepadStick(0);
    } else {
      move = keyDirection();
      isJumping = keyIsDown("Space");
    }

    this.velocity.x += move.x * (this.groundObject ? 0.1 : 0.01);

    if (this.groundObject && isJumping) {
      this.velocity.y = 0.75;
      this.State = Player.StateList.JUMPING;
    }
    if (this.groundObject) {
      if (move.x !== 0) {
        this.State = Player.StateList.RUNNING;
      } else if (!isJumping) {
        this.State = Player.StateList.STANDING;
      }
    } else {
      if (this.velocity.y > 0.05) {
        this.State = Player.StateList.JUMPING;
      } else if (this.velocity.y < -0.05) {
        this.State = Player.StateList.FALLING;
      }
    }

    this.turnDirection(move.x);
  }
  turnDirection(directionX) {
    if (directionX == 0) {
      return;
    }
    this.Direction = directionX < 0 ? -1 : 1;
    return;
  }
  setCamera() {
    cameraPos.x = this.pos.x;
    if (this.pos.y < 9) {
      cameraPos.y = 9;
    } else {
      cameraPos.y = this.pos.y;
    }
  }
  addCompsognathusAboveYou() {
    this.NumberOfCompsognathusAboveYou = this.NumberOfCompsognathusAboveYou + 1;
  }
  restStamina() {
    this.Timer -= timeDelta;
    if (this.Timer < 0) {
      if (this.Stamina > 0) {
        this.Stamina -= this.NumberOfCompsognathusAboveYou;
      } else {
        this.State = Player.StateList.TRIPPING;
      }
      this.Timer = this.TimerInterval;
    }
  }
}
class SpritePlayer extends EngineObject {
  constructor(pos, size) {
    super(pos, size);
    this.tileInfo = new TileInfo(vec2(0, 0), vec2(47, 79), 1);
    this.mass = 0;
    this.collide = false;
  }
}
class GroundManager extends EngineObject {
  constructor() {
    super();
    this.CHUNK_SIZE = 100;
    this.chunksGenerated = new Set();
    this.lastChunkX = -99999;
  }
  update() {
    const cameraChunkX = floor(cameraPos.x / this.CHUNK_SIZE);
    for (let i = 0; i < 3; i++) {
      const chunkToGenerate = cameraChunkX + i;
      if (
        chunkToGenerate > this.lastChunkX &&
        !this.chunksGenerated.has(chunkToGenerate)
      ) {
        this.generateChunk(chunkToGenerate);
        this.chunksGenerated.add(chunkToGenerate);
        this.lastChunkX = chunkToGenerate;
      }
    }
  }
  generateChunk(chunkX) {
    const startX = chunkX * this.CHUNK_SIZE;
    const levelSize = vec2(this.CHUNK_SIZE, 2);
    const newChunk = new TileCollisionLayer(
      vec2(startX, -1),
      levelSize,
      new TileInfo(vec2(0, 0), vec2(17.17), 0)
    );
    const groundLevelY = 5;
    const pos = vec2();
    for (pos.x = 0; pos.x < levelSize.x; pos.x++) {
      for (pos.y = 0; pos.y < groundLevelY; pos.y++) {
        newChunk.setData(pos, new TileLayerData(vec2(1, 1)));
        newChunk.setCollisionData(pos);
      }
    }
    newChunk.redraw();
  }
}
class Compsognathus extends EngineObject {
  constructor(pos, player) {
    super(pos, vec2(1, 1));
    this.color = RED;
    this.setCollision();
    this.Player = player;
    this.Direction = 1;
    this.ChaseSpeed = 0.08;
    this.Status = "Follow";
  }
  update() {
    debugText(`Status ${this.Status}`, vec2(this.Player.pos.x, 12));

    this.movements();
  }
  movements() {
    const Distance = Math.abs(this.GetValueDistance());
    const dirToPlayer = sign(this.Player.pos.x - this.pos.x);
    if (this.IsItBehindHim()) {
      this.follow(dirToPlayer, Distance);
    } else {
      this.keepDistance(dirToPlayer, Distance);
    }
  }
  GetValueDistance() {
    return this.pos.x - this.Player.pos.x;
  }
  IsItBehindHim() {
    return (
      (this.GetValueDistance() < 0 && this.Player.Direction > 0) ||
      (this.GetValueDistance() > 0 && this.Player.Direction < 0)
    );
  }
  checkIfPlayerIsNotJumpingOrAttacking() {
    return !(
      this.Player.State == Player.StateList.JUMPING ||
      this.Player.State == Player.StateList.FALLING
    );
  }
  follow(moveVector, _Distance) {
    this.Status = "Follow";
    this.velocity.x = moveVector * this.ChaseSpeed;
    if (
      _Distance < this.size.x * 2 &&
      this.checkIfPlayerIsNotJumpingOrAttacking()
    ) {
      this.attack();
    }
  }

  keepDistance(moveVector, _Distance) {
    if (_Distance > 10) {
      this.follow(moveVector, _Distance);
    } else if (_Distance > 9) {
      this.Status = "Stay Front You";
      this.velocity.x = 0;
    } else {
      this.Status = "Keep Distance";
      this.velocity.x = moveVector * (1.5 * this.ChaseSpeed) * -1;
    }
  }
  attack() {
    this.Status = "Its Attacking You";
    this.Player.addCompsognathusAboveYou();
    this.destroy();
  }
}
class BarComponent extends UIScrollbar {
  constructor(Coords, color) {
    super(vec2(0, 0), vec2(0, 0));
    this.color = color;
    this.interactive = false;
    this.resize();
    this.Coords = Coords;
  }
  update() {
    this.resize();
    this.reposition();
  }
  resize() {
    const size = getPosition(4, 4);
    this.size = vec2(size.x, size.y);
  }
  reposition() {
    const position = getPosition(this.Coords.x, this.Coords.y);
    this.pos = vec2(position.x, position.y);
  }
  adjustValue(value) {
    this.value = parseFloat(value / 100).toFixed(2);
  }
}
function gameInit() {
  new UISystemPlugin();

  //[ ] LittleJs no tiene metodon para ubicar ui pero se basa en pixeles de la pantalla no en el pos global del engine
  gravity.y = -0.05;
  new GroundManager();
  const player = new Player();
  new Compsognathus(vec2(40, 10), player);
  new Compsognathus(vec2(50, 10), player);
  new Compsognathus(vec2(60, 10), player);
  canvasClearColor = hsl(0.6, 0.5, 0.5);
}
///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
  // called every frame at 60 frames per second
  // handle input and update the game state
}
///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {
  // called after physics and objects are updated
  // setup camera and prepare for render
}
///////////////////////////////////////////////////////////////////////////////
function gameRender() {
  // called before objects are rendered
  // draw any background effects that appear behind objects
}
///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
  // called after objects are rendered
  // draw effects or hud that appear above all objects
  //   LJS.drawTextScreen("Hello World!", LJS.mainCanvasSize.scale(0.5), 80);
}
///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, [
  "../media/protp-Gnd.png",
  "../media/sample.png",
]);
