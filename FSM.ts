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
  COMPSOGNATHUS: {},
};
