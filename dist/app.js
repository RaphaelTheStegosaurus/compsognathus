"use strict";
///////////////////////////////////////////////////////////////////////////////
class Player extends EngineObject {
  constructor() {
    super(vec2(0, 0), vec2(1, 1), null, 0, GREEN);
  }
  update() {
    const moveInput = keyDirection();
    this.velocity = moveInput;
  }
}
function gameInit() {
  new Player();
  // called once after the engine starts up
  // setup the game
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
  "",
]);
