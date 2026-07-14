const FSM = {
  PLAYER: {
    SHAKING_OFF: {
      //Sacudirse los compsognathus encima de el
      name: "Shaking Off",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    STANDING: {
      //ESTANDO QUIETO
      name: "Standing Still",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    STANDING_DIFFICULT: {
      //ESTANDO QUIETO CON DIFICULTAD
      name: "Standing Still With Difficult",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    JUMPING: {
      //Saltar
      name: "Jumping",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    FALLING: {
      //Regresando al suelo despues de saltar
      name: "Falling",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    RUNNING: {
      //Corriendo
      name: "Running",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    WALKING_DIFFICULT: {
      //Caminando CON DIFICULTAD
      name: "Walking With Difficult",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    TRIPPING: {
      //TROPEZANDO por agotamiento
      name: "Tripping To The Ground",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    BEING_ATTACKED: {
      //Siendo Atacado
      name: "Being Attacked",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    LIFTING_UP: {
      //Levantándose del Suelo
      name: "Lifting Up",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    ATTACKING: {
      //Atacando a los compsognathus frente a el
      name: "Attacking",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    DYING: {
      //Muriendo devorado por los Compsognathus en el suelo.
      name: "Dying",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
  },
  COMPSOGNATHUS: {
    FOLLOWING_PLAYER: {
      //Seguirá al Jugador a cierta distancia mientras lo vea de frente y de espalda se acercara mas.
      name: "Follow the Player",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    KEEPING_DISTANCE: {
      //Mantendrá una distancia frente a el jugador cuando este lo vea de frente si esta muy cerca por frente de el este retrocederá.
      name: "Keep its Distance",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    CLIMBING_ONTO_PLAYER: {
      //Si se acerca al jugador por la espalda este pasara a trepar al instante
      name: "Climb onto the Players Back",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    RUNNING_AWAY: {
      //Este correrá cuando el jugador lo ataque y se ocultara en la vegetación
      name: "Run away",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    TAKING_DAMAGE: {
      //Recibirá Daño si el jugador lo ataca a distancia con un proyectil como una piedra.
      name: "Take Damage",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    APPEARING: {
      //Este spawner en cierta zonas para empezar acosar al jugador
      name: "Appear in Vegetation",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    FALLING_FROM_PLAYER: {
      //Este caerá desde la espalda del jugador al suelo para esconderse en la vegetación
      name: "Fall from the Player",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
    ATTACKING: {
      //Este al ver al jugador en el suelo pasara a atacarlo encima para irle bajando salud a este.
      name: "Attack the Player on the ground",
      enter: (player: any) => {},
      update: (player: any) => {},
      exit: (player: any) => {},
    },
  },
};
