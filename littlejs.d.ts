/**
 * - Update or render function for a plugin
 */
type PluginCallback = () => any;
/**
 * - Called after the  starts, can be async
 */
type GameInitCallback = () => void | Promise<void>;
/**
 * - Update or render function for the game
 */
type GameCallback = () => any;
/**
 * - Function that processes an object
 */
type ObjectCallbackFunction = (object: EngineObject) => any;
/**
 * - Checks if a position is colliding
 */
type LineTestFunction = (pos: Vector2) => any;
/**
 * - A function that draws to a 2D canvas context
 */
type Canvas2DDrawFunction = (
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
) => any;
/**
 * - Function called when a sound ends
 */
type AudioEndedCallback = (source: AudioBufferSourceNode) => any;
/**
 * - Function that processes a medal
 */
type MedalCallbackFunction = (medal: Medal) => any;
/**
 * - Function that processes a particle
 */
type ParticleCallbackFunction = (particle: Particle) => any;
/**
 * LittleJS - The Tiny Fast JavaScript Game Engine
 * MIT License - Copyright 2021 Frank Force
 *
 * Engine Features
 * - Object oriented system with base class engine object
 * - Base class object handles update, physics, collision, rendering, etc
 * - Engine helper classes and functions like Vector2, Color, and Timer
 * - Super fast rendering system for tile sheets
 * - Sound effects audio with zzfx and music with zzfxm
 * - Input processing system with gamepad and touchscreen support
 * - Tile layer rendering and collision system
 * - Particle effect system
 * - Medal system tracks and displays achievements
 * - Debug tools and debug rendering system
 * - Post processing effects
 * - Call engineInit() to start it up!
 * @namespace Engine
 */
/** Name of engine
 * @type {string}
 * @default
 * @memberof Engine */
declare const engineName: string;
/** Version of engine
 * @type {string}
 * @default
 * @memberof Engine */
declare const engineVersion: string;
/** Frames per second to update
 * @type {number}
 * @default
 * @memberof Engine */
declare const frameRate: number;
/** How many seconds each frame lasts, engine uses a fixed time step
 * @type {number}
 * @default 1/60
 * @memberof Engine */
declare const timeDelta: number;
/** Array containing all engine objects
 * @type {Array<EngineObject>}
 * @memberof Engine */
declare let engineObjects: Array<EngineObject>;
/** Current update frame, used to calculate time
 * @type {number}
 * @memberof Engine */
declare let frame: number;
/** Current engine time since start in seconds
 * @type {number}
 * @memberof Engine */
declare let time: number;
/** Actual clock time since start in seconds (not affected by pause or frame rate clamping)
 * @type {number}
 * @memberof Engine */
declare let timeReal: number;
/** Is the game paused? Causes time and objects to not be updated
 * @type {boolean}
 * @default false
 * @memberof Engine */
declare let paused: boolean;
/** Get if game is paused
 * @return {boolean}
 * @memberof Engine */
function getPaused(): boolean;
/** Set if game is paused
 * @param {boolean} [isPaused]
 * @memberof Engine */
function setPaused(isPaused?: boolean): void;
/**
 * @callback GameInitCallback - Called after the engine starts, can be async
 * @return {void|Promise<void>}
 * @memberof Engine
 */
/**
 * @callback GameCallback - Update or render function for the game
 * @memberof Engine
 */
/** Startup LittleJS engine with your callback functions
 * @param {GameInitCallback} gameInit - Called once after the engine starts up, can be async for loading
 * @param {GameCallback} gameUpdate - Called every frame before objects are updated (60fps), use for game logic
 * @param {GameCallback} gameUpdatePost - Called after physics and objects are updated, even when paused, use for UI updates
 * @param {GameCallback} gameRender - Called before objects are rendered, use for drawing backgrounds/world elements
 * @param {GameCallback} gameRenderPost - Called after objects are rendered, use for drawing UI/overlays
 * @param {Array<string>} [imageSources=[]] - List of image file paths to preload (e.g., ['player.png', 'tiles.png'])
 * @param {HTMLElement} [rootElement] - Root DOM element to attach canvas to, defaults to document.body
 * @example
 * // Basic engine startup
 * engineInit(
 * () => { LOG('Game initialized!'); },  // gameInit
 * () => { updateGameLogic(); },         // gameUpdate
 * () => { updateUI(); },                // gameUpdatePost
 * () => { drawBackground(); },          // gameRender
 * () => { drawHUD(); },                 // gameRenderPost
 * ['tiles.png', 'tilesLevel.png']       // images to load
 * );
 * @memberof Engine */
function engineInit(
  gameInit: GameInitCallback,
  gameUpdate: GameCallback,
  gameUpdatePost: GameCallback,
  gameRender: GameCallback,
  gameRenderPost: GameCallback,
  imageSources?: Array<string>,
  rootElement?: HTMLElement
): Promise<void>;
/** Update each engine object, remove destroyed objects, and update time
 * @memberof Engine */
function engineObjectsUpdate(): void;
/** Destroy and remove all objects
 * @memberof Engine */
function engineObjectsDestroy(): void;
/** Collects all object within a given area
 * @param {Vector2} [pos] - Center of test area, or undefined for all objects
 * @param {Vector2|number} [size] - Radius of circle if float, rectangle size if Vector2
 * @param {Array<EngineObject>} [objects=engineObjects] - List of objects to check
 * @return {Array<EngineObject>} - List of collected objects
 * @memberof Engine */
function engineObjectsCollect(
  pos?: Vector2,
  size?: Vector2 | number,
  objects?: Array<EngineObject>
): Array<EngineObject>;
/**
 * @callback ObjectCallbackFunction - Function that processes an object
 * @param {EngineObject} object
 * @memberof Engine
 */
/** Triggers a callback for each object within a given area
 * @param {Vector2} [pos] - Center of test area, or undefined for all objects
 * @param {Vector2|number} [size] - Radius of circle if float, rectangle size if Vector2
 * @param {ObjectCallbackFunction} [callbackFunction] - Calls this function on every object that passes the test
 * @param {Array<EngineObject>} [objects=engineObjects] - List of objects to check
 * @memberof Engine */
function engineObjectsCallback(
  pos?: Vector2,
  size?: Vector2 | number,
  callbackFunction?: ObjectCallbackFunction,
  objects?: Array<EngineObject>
): void;
/** Return a list of objects intersecting a ray
 * @param {Vector2} start
 * @param {Vector2} end
 * @param {Array<EngineObject>} [objects=engineObjects] - List of objects to check
 * @return {Array<EngineObject>} - List of objects hit
 * @memberof Engine */
function engineObjectsRaycast(
  start: Vector2,
  end: Vector2,
  objects?: Array<EngineObject>
): Array<EngineObject>;
/**
 * @callback PluginCallback - Update or render function for a plugin
 * @memberof Engine
 */
/** Add a new update function for a plugin
 * @param {PluginCallback} [update]
 * @param {PluginCallback} [render]
 * @param {PluginCallback} [glContextLost]
 * @param {PluginCallback} [glContextRestored]
 * @memberof Engine */
function engineAddPlugin(
  update?: PluginCallback,
  render?: PluginCallback,
  glContextLost?: PluginCallback,
  glContextRestored?: PluginCallback
): void;
/**
 * LittleJS Debug System
 * - Press Esc to show debug overlay with mouse pick
 * - Number keys toggle debug functions
 * - +/- apply time scale
 * - Debug primitive rendering
 * - Save a 2d canvas as a png image
 * @namespace Debug
 */
/** True if debug is enabled
 * @type {boolean}
 * @default
 * @memberof Debug */
declare const debug: boolean;
/** True if the debug overlay is active, always false in release builds
 * @type {boolean}
 * @default
 * @memberof Debug */
declare let debugOverlay: boolean;
/** True if watermark with FPS should be shown, false in release builds
 * @type {boolean}
 * @default
 * @memberof Debug */
declare let showWatermark: boolean;
/** Asserts if the expression is false, does nothing in release builds
 * Halts execution if the assert fails and throws an error
 * @param {boolean} assert
 * @param {...Object} [output] - error message output
 * @memberof Debug */
function ASSERT(assert: boolean, ...output: any[]): void;
/** Log to console if debug is enabled, does nothing in release builds
 * @param {...Object} [output] - message output
 * @memberof Debug */
function LOG(...output: any[]): void;
/** Draw a debug rectangle in world space
 * @param {Vector2} pos
 * @param {Vector2} [size=Vector2()]
 * @param {Color|string} [color]
 * @param {number} [time]
 * @param {number} [angle]
 * @param {boolean} [fill]
 * @param {boolean} [screenSpace]
 * @memberof Debug */
function debugRect(
  pos: Vector2,
  size?: Vector2,
  color?: Color | string,
  time?: number,
  angle?: number,
  fill?: boolean,
  screenSpace?: boolean
): void;
/** Draw a debug poly in world space
 * @param {Vector2} pos
 * @param {Array<Vector2>} points
 * @param {Color|string} [color]
 * @param {number} [time]
 * @param {number} [angle]
 * @param {boolean} [fill]
 * @param {boolean} [screenSpace]
 * @memberof Debug */
function debugPoly(
  pos: Vector2,
  points: Array<Vector2>,
  color?: Color | string,
  time?: number,
  angle?: number,
  fill?: boolean,
  screenSpace?: boolean
): void;
/** Draw a debug circle in world space
 * @param {Vector2} pos
 * @param {number} [size] - diameter
 * @param {Color|string} [color]
 * @param {number} [time]
 * @param {boolean} [fill]
 * @param {boolean} [screenSpace]
 * @memberof Debug */
function debugCircle(
  pos: Vector2,
  size?: number,
  color?: Color | string,
  time?: number,
  fill?: boolean,
  screenSpace?: boolean
): void;
/** Draw a debug point in world space
 * @param {Vector2} pos
 * @param {Color|string} [color]
 * @param {number} [time]
 * @param {number} [angle]
 * @param {boolean} [screenSpace]
 * @memberof Debug */
function debugPoint(
  pos: Vector2,
  color?: Color | string,
  time?: number,
  angle?: number,
  screenSpace?: boolean
): void;
/** Draw a debug line in world space
 * @param {Vector2} posA
 * @param {Vector2} posB
 * @param {Color|string} [color]
 * @param {number} [width]
 * @param {number} [time]
 * @param {boolean} [screenSpace]
 * @memberof Debug */
function debugLine(
  posA: Vector2,
  posB: Vector2,
  color?: Color | string,
  width?: number,
  time?: number,
  screenSpace?: boolean
): void;
/** Draw a debug combined axis aligned bounding box in world space
 * @param {Vector2} posA
 * @param {Vector2} sizeA
 * @param {Vector2} posB
 * @param {Vector2} sizeB
 * @param {Color|string} [color]
 * @param {number} [time]
 * @param {boolean} [screenSpace]
 * @memberof Debug */
function debugOverlap(
  posA: Vector2,
  sizeA: Vector2,
  posB: Vector2,
  sizeB: Vector2,
  color?: Color | string,
  time?: number,
  screenSpace?: boolean
): void;
/** Draw a debug axis aligned bounding box in world space
 * @param {string} text
 * @param {Vector2} pos
 * @param {number} [size]
 * @param {Color|string} [color]
 * @param {number} [time]
 * @param {number} [angle]
 * @param {string} [font]
 * @param {boolean} [screenSpace]
 * @memberof Debug */
function debugText(
  text: string,
  pos: Vector2,
  size?: number,
  color?: Color | string,
  time?: number,
  angle?: number,
  font?: string,
  screenSpace?: boolean
): void;
/** Clear all debug primitives in the list
 * @memberof Debug */
function debugClear(): void;
/** Trigger debug system to take a screenshot
 * @memberof Debug */
function debugScreenshot(): void;
/** Save a canvas to disk
 * @param {HTMLCanvasElement|OffscreenCanvas} canvas
 * @param {string} [filename]
 * @param {string} [type]
 * @memberof Debug */
function debugSaveCanvas(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  filename?: string,
  type?: string
): void;
/** Save a text file to disk
 * @param {string}     text
 * @param {string}     [filename]
 * @param {string}     [type]
 * @memberof Debug */
function debugSaveText(text: string, filename?: string, type?: string): void;
/** Save a data url to disk
 * @param {string}     dataURL
 * @param {string}     filename
 * @memberof... */
// ... (El archivo contiene más declaraciones que han sido modificadas de la misma forma)
