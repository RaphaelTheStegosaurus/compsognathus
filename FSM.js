const FSM = {
  PLAYER: {
    SHAKING_OFF: {
      //Sacudirse los compsognathus encima de el
      name: "Shaking Off",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    STANDING: {
      //ESTANDO QUIETO
      name: "Standing Still",
      enter: (player) => {},
      update: (player) => {
        // Transición explícita: si hay movimiento, cambiar a RUNNING
        if (getMoves().Jumping) {
          FSM.changeState(player, "JUMPING");
        }
        if (MoveAxisXListener()) {
          FSM.changeState(player, "RUNNING");
        }
      },
      exit: (player) => {},
    },
    STANDING_DIFFICULT: {
      //ESTANDO QUIETO CON DIFICULTAD
      name: "Standing Still With Difficult",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    JUMPING: {
      //Saltar
      name: "Jumping",
      enter: (player) => {
        if (player.groundObject) {
          player.velocity.y = 0.75;
        }
      },
      update: (player) => {
        if (!getMoves().Jumping) {
          FSM.changeState(player, "STANDING");
        }
      },
      exit: (player) => {},
    },
    FALLING: {
      //Regresando al suelo despues de saltar
      name: "Falling",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    RUNNING: {
      //Corriendo
      name: "Running",
      enter: (player) => {},
      update: (player) => {
        // Ejecutar movimiento
        MoveAxisX(player);

        // Transición explícita: si no hay movimiento, volver a STANDING
        if (!MoveAxisXListener()) {
          FSM.changeState(player, "STANDING");
        }
      },
      exit: (player) => {},
    },
    WALKING_DIFFICULT: {
      //Caminando CON DIFICULTAD
      name: "Walking With Difficult",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    TRIPPING: {
      //TROPEZANDO por agotamiento
      name: "Tripping To The Ground",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    BEING_ATTACKED: {
      //Siendo Atacado
      name: "Being Attacked",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    LIFTING_UP: {
      //Levantándose del Suelo
      name: "Lifting Up",
      enter: (player) => {},
      update: (player) => {},
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
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    KEEPING_DISTANCE: {
      //Mantendrá una distancia frente a el jugador cuando este lo vea de frente si esta muy cerca por frente de el este retrocederá.
      name: "Keep its Distance",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    CLIMBING_ONTO_PLAYER: {
      //Si se acerca al jugador por la espalda este pasara a trepar al instante
      name: "Climb onto the Players Back",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    RUNNING_AWAY: {
      //Este correrá cuando el jugador lo ataque y se ocultara en la vegetación
      name: "Run away",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    TAKING_DAMAGE: {
      //Recibirá Daño si el jugador lo ataca a distancia con un proyectil como una piedra.
      name: "Take Damage",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    APPEARING: {
      //Este spawner en cierta zonas para empezar acosar al jugador
      name: "Appear in Vegetation",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    FALLING_FROM_PLAYER: {
      //Este caerá desde la espalda del jugador al suelo para esconderse en la vegetación
      name: "Fall from the Player",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
    },
    ATTACKING: {
      //Este al ver al jugador en el suelo pasara a atacarlo encima para irle bajando salud a este.
      name: "Attack the Player on the ground",
      enter: (player) => {},
      update: (player) => {},
      exit: (player) => {},
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
const MoveAxisX = (entity) => {
  let move = getMoves().moveAxisX;
  if (entity && entity.velocity) {
    entity.velocity.x += move.x * (entity.groundObject ? 0.1 : 0.01);
  } else {
    console.log("NO existe ENTITY");
    console.log(entity);
  }
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
  if (isTouchDevice) {
    touchGamepadEnable = true;
    move = gamepadStick(0);
    isJumping = gamepadIsDown(0);
  } else {
    move = keyDirection();
    isJumping = keyIsDown("Space");
  }

  return { moveAxisX: move, Jumping: isJumping };
};
const IsJumping = () => {};
