"use strict";
///////////////////////////////////////////////////////////////////////////////
class Player extends EngineObject {
  constructor() {
    super(vec2(50, 10), vec2(1, 1), null, 0, GREEN);
    this.setCollision();
  }
  update() {
    const moveInput = keyDirection();
    this.velocity.x += moveInput.x * (this.groundObject ? 0.1 : 0.01);
    if (this.groundObject && moveInput.y > 0) {
      this.velocity.y = 0.75;
    }
    this.setCamera();
  }
  setCamera() {
    cameraPos.x = this.pos.x;
    if (this.pos.y < 9) {
      cameraPos.y = 9;
    } else {
      cameraPos.y = this.pos.y;
    }
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
function gameInit() {
  // called once after the engine starts up
  // setup the game
  gravity.y = -0.05;
  new GroundManager();
  new Player();
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
]);
