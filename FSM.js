const FSM = {
  PLAYER: {
    TURNING: {
      name: "Turning",
      enter: (player) => {
        player.turningTimer = 0.2;
        // Aquí dispararías tu animación de giro
      },
      update: (player) => {
        player.turningTimer -= timeDelta;
        if (player.turningTimer <= 0) {
          player.Direction *= -1;
          FSM.changeState(player, "RUNNING");
          return;
        }
      },
    },
    SHAKING_OFF: {
      //Sacudirse los compsognathus encima de el
      name: "Shaking Off",
      enter: (player) => {
        player.Stamina -= 5;
        player.PlayerShakeInterval = 1;
      },
      update: (player) => {
        if (player.NumberOfCompsognathusAboveYou === 0) {
          FSM.changeState(player, "STANDING");
          return;
        }
        if (!getMoves().Shaking) {
          FSM.changeState(player, "STANDING_DIFFICULT");
          return;
        }
        if (player.PlayerShakeInterval <= 0) {
          player.NumberOfCompsognathusAboveYou -= 1;
          player.PlayerShakeInterval = 1;
        } else {
          player.PlayerShakeInterval -= timeDelta;
        }
      },
      exit: (player) => {},
    },
    STANDING: {
      //ESTANDO QUIETO
      name: "Standing Still",
      enter: (player) => {
        player.velocity.x = 0;
        player.Timer = 1;
      },
      update: (player) => {
        if (player.NumberOfCompsognathusAboveYou >= 3) {
          FSM.changeState(player, "STANDING_DIFFICULT");
          return;
        }
        if (getMoves().Jumping) {
          FSM.changeState(player, "JUMPING");
          return;
        }
        if (MoveAxisXListener()) {
          FSM.changeState(player, "RUNNING");
          return;
        }
        player.restore();
      },
      exit: (player) => {},
    },
    STANDING_DIFFICULT: {
      //ESTANDO QUIETO CON DIFICULTAD
      name: "Standing Still With Difficult",
      enter: (player) => {
        player.Timer = 1;
      },
      update: (player) => {
        player.restStamina();
        if (MoveAxisXListener()) {
          FSM.changeState(player, "WALKING_DIFFICULT");
          return;
        }
        if (getMoves().Shaking) {
          FSM.changeState(player, "SHAKING_OFF");
          return;
        }
      },
      exit: (player) => {},
    },
    JUMPING: {
      name: "Jumping",
      enter: (player) => {
        if (player.groundObject) {
          player.Stamina -= 10;
          player.velocity.y = 0.75;
        }
      },
      update: (player) => {
        if (player.velocity.y < 0) {
          FSM.changeState(player, "FALLING");
          return;
        }
      },
      exit: (player) => {},
    },
    FALLING: {
      //Regresando al suelo despues de saltar
      name: "Falling",
      enter: (player) => {},
      update: (player) => {
        if (player.groundObject) {
          FSM.changeState(player, "STANDING");
          return;
        }
      },
      exit: (player) => {},
    },
    RUNNING: {
      //Corriendo
      name: "Running",
      enter: (player) => {
        player.Timer = 1;
      },
      update: (player) => {
        MoveAxisX(player);
        player.restStamina(2);
        if (!MoveAxisXListener()) {
          FSM.changeState(player, "STANDING");
          return;
        }
      },
      exit: (player) => {},
    },
    WALKING_DIFFICULT: {
      //Caminando CON DIFICULTAD
      name: "Walking With Difficult",
      enter: (player) => {
        player.Timer = 1;
      },
      update: (player) => {
        player.restStamina(2);
        MoveAxisX(player, 1 / (player.NumberOfCompsognathusAboveYou + 1));
        if (!MoveAxisXListener()) {
          FSM.changeState(player, "STANDING_DIFFICULT");
          return;
        }
      },
      exit: (player) => {},
    },
    TRIPPING: {
      //TROPEZANDO por agotamiento
      name: "Tripping To The Ground",
      enter: (player) => {
        player.Timer = 5;
      },
      update: (player) => {
        player.Timer -= timeDelta;
        if (player.Timer <= 0) {
          FSM.changeState(player, "BEING_ATTACKED");
          return;
        }
      },
      exit: (player) => {},
    },
    BEING_ATTACKED: {
      //Siendo Atacado y suelo
      name: "Being Attacked",
      enter: (player) => {
        player.Timer = 1;
      },
      update: (player) => {
        // 1. Lógica de daño constante
        player.Timer -= timeDelta;
        if (player.Timer <= 0) {
          player.Stamina -= 5;
          player.Health -= 5;
          player.Timer = 1;
        }

        // 2. Transición a muerte
        if (player.Health <= 0) {
          FSM.changeState(player, "DYING");
          return;
        }
        // 3. Lógica de recuperación (tu código actual)
        const currentMoves = getMoves();

        // Detectar si se acaba de presionar (flanco de subida)
        const justPressedShaking = currentMoves.Shaking && !player.wasShaking;
        const justPressedAttacking =
          currentMoves.Attacking && !player.wasAttacking;

        if (justPressedShaking || justPressedAttacking) {
          player.Stamina = Math.min(player.Stamina + 2, 100);
        }

        // Actualizar estados anteriores para el siguiente frame
        player.wasShaking = currentMoves.Shaking;
        player.wasAttacking = currentMoves.Attacking;

        if (player.Stamina >= 50) {
          FSM.changeState(player, "LIFTING_UP");
        }
      },
      exit: (player) => {},
    },
    LIFTING_UP: {
      //Levantándose del Suelo
      name: "Lifting Up",
      enter: (player) => {
        player.Timer = 5;
        player.NumberOfCompsognathusAboveYou = 0;
      },
      update: (player) => {
        player.Timer -= timeDelta;
        if (player.Timer <= 0) {
          FSM.changeState(player, "STANDING");
          return;
        }
      },
      exit: (player) => {},
    },
    ATTACKING: {
      //Atacando a los compsognathus frente a el
      name: "Attacking",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    DYING: {
      //Muriendo devorado por los Compsognathus en el suelo.
      name: "Dying",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
  },
  COMPSOGNATHUS: {
    FOLLOWING_PLAYER: {
      //Seguirá al Jugador a cierta distancia mientras lo vea de frente y de espalda se acercara mas.
      name: "Follow the Player",
      enter: (compsognathus) => {},
      update: (compsognathus) => {
        compsognathus.velocity.x =
          compsognathus.GetValueDistance().Sign * compsognathus.ChaseSpeed;
        if (!compsognathus.IsItBehindHim()) {
          FSM.changeState(compsognathus, "KEEPING_DISTANCE");
          return;
        }
      },
      exit: (compsognathus) => {},
    },
    KEEPING_DISTANCE: {
      //Mantendrá una distancia frente a el jugador cuando este lo vea de frente si esta muy cerca por frente de el este retrocederá.
      name: "Keep its Distance",
      enter: (compsognathus) => {},
      update: (compsognathus) => {
        if (compsognathus.GetValueDistance().ABSDistance > 10) {
          compsognathus.velocity.x =
            compsognathus.GetValueDistance().Sign * compsognathus.ChaseSpeed;
        } else if (compsognathus.GetValueDistance().ABSDistance > 9) {
          compsognathus.velocity.x = 0;
        } else {
          compsognathus.velocity.x =
            compsognathus.GetValueDistance().Sign *
            (1.5 * compsognathus.ChaseSpeed) *
            -1;
        }
        if (compsognathus.IsItBehindHim()) {
          FSM.changeState(compsognathus, "FOLLOWING_PLAYER");
          return;
        }
      },
      exit: (compsognathus) => {},
    },
    CLIMBING_ONTO_PLAYER: {
      //Si se acerca al jugador por la espalda este pasara a trepar al instante
      name: "Climb onto the Players Back",
      enter: (compsognathus) => {},
      update: (compsognathus) => {},
      exit: (compsognathus) => {},
    },
    RUNNING_AWAY: {
      //Este correrá cuando el jugador lo ataque y se ocultara en la vegetación
      name: "Run away",
      enter: (compsognathus) => {},
      update: (compsognathus) => {},
      exit: (compsognathus) => {},
    },
    TAKING_DAMAGE: {
      //Recibirá Daño si el jugador lo ataca a distancia con un proyectil como una piedra.
      name: "Take Damage",
      enter: (compsognathus) => {},
      update: (compsognathus) => {},
      exit: (compsognathus) => {},
    },
    APPEARING: {
      //Este spawner en cierta zonas para empezar acosar al jugador
      name: "Appear in Vegetation",
      enter: (compsognathus) => {},
      update: (compsognathus) => {},
      exit: (compsognathus) => {},
    },
    FALLING_FROM_PLAYER: {
      //Este caerá desde la espalda del jugador al suelo para esconderse en la vegetación
      name: "Fall from the Player",
      enter: (compsognathus) => {},
      update: (compsognathus) => {},
      exit: (compsognathus) => {},
    },
    ATTACKING: {
      //Este al ver al jugador en el suelo pasara a atacarlo encima para irle bajando salud a este.
      name: "Attack the Player on the ground",
      enter: (compsognathus) => {},
      update: (compsognathus) => {},
      exit: (compsognathus) => {},
    },
  },
  //[ ] Check 13/07/2026
  // Función para procesar la lógica de cualquier entidad
  updateEntity: (entity, stateName) => {
    const state = FSM.PLAYER[stateName] || FSM.COMPSOGNATHUS[stateName];
    if (state && state.update) {
      state.update(entity);
    }
  },

  // Función para manejar cambios de estado
  changeState: (entity, newStateName) => {
    // Asegúrate de buscar el objeto del estado correcto
    const newState =
      FSM.PLAYER[newStateName] || FSM.COMPSOGNATHUS[newStateName];
    if (entity.CurrentState.name === newState.name) return;

    // Ejecuta exit
    if (entity.CurrentState.exit) entity.CurrentState.exit(entity);

    entity.CurrentState = newState; // Asignamos el objeto, no un string

    // Ejecuta enter
    if (newState.enter) newState.enter(entity);
  },
};
const MoveAxisX = (entity, limit = 1) => {
  let move = getMoves().moveAxisX;
  if (entity && entity.velocity) {
    entity.velocity.x += move.x * limit * (entity.groundObject ? 0.1 : 0.01);
    const MAX_SPEED = 1;
    entity.velocity.x = Math.max(
      Math.min(entity.velocity.x, MAX_SPEED),
      -MAX_SPEED
    );
  } else {
    console.warn("NO existe ENTITY");
  }
  entity.turnDirection(move.x);
};
const MoveAxisXListener = () => {
  let move = getMoves().moveAxisX;
  if (move.x == 0) {
    return false;
  } else {
    return true;
  }
};
const getMoves = () => {
  let move = vec2(0, 0);
  let isJumping = false;
  let isShaking = false;
  let isAttacking = false;
  if (isTouchDevice) {
    touchGamepadEnable = true;
    move = gamepadStick(0);
    isJumping = gamepadIsDown(0);
    isAttacking = gamepadIsDown(1);
    isShaking = gamepadIsDown(2);
  } else {
    move = keyDirection();
    isJumping = keyIsDown("Space");
    isAttacking = keyIsDown("KeyR");
    isShaking = keyIsDown("KeyE");
  }

  return {
    moveAxisX: move,
    Jumping: isJumping,
    Attacking: isAttacking,
    Shaking: isShaking,
  };
};
