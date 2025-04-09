export class NeuralNetwork {
  levels: Level[];

  constructor(neuronCounts: number[])
  {
    this.levels = [];
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    };
  };

  static feedForward(givenInputs: number[], network: NeuralNetwork)
  {
    let outputs = Level.feedForward(givenInputs, network.levels[0]);
    for (let i = 1; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    };

    return (outputs);
  };
};

export class Level {
  inputs: Array<number>;
  outputs: Array<number>;
  biases: Array<number>;
  weights: Array<Array<number>>;
  
  constructor(inputCount: number, outputCount: number)
  {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount);
    this.weights = new Array(inputCount);
    //il y aura autant de tableau de poids qu'il  y aura d'input et autant de poid dans un tableau qu'il y aura d'output
    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Array(outputCount);
    };

    Level.#randomize(this);
  };

  /**
   * @param level le niveau ou layer du reseau de neurones
   * fonction qui attribut des poids et des bais de facon aleatoire
   * les poids seront tous compris entre 1 et -1
   * de cette facon un neurone pourra indiquer que l'on ne peut pas tourner dans tel ou tel sens
   * les biais aussi
   */
  static #randomize(level: Level)
  {
    for (let i = 0; i < level.inputs.length; i++) {
      for (let j = 0; j < level.outputs.length; j++) {
        level.weights[i][j] = Math.random() * 2 - 1;
      };
    };
    for (let i = 0; i < level.biases.length; i++) {
      level.biases[i] = Math.random() * 2 - 1;
    };
  };
  
  /**
   * @param givenInputs les inputs de la couche 
   * @param level le layer de la couche 
   * 
   * D'abord attribuer les inputs a la couche sur laquelle on bosse
   * 
   * Puis deuxieme etapes, on boucle sur les outputs, pour chaque output:
   * (il ya autant de tableaux de weights que d'inputs, et chaque tableau
   * de weights comprend un nombre de weights egal au nombre de outputs);
   * 
   * donc pour chaque output on fait la somme de chaque input * la colonne de poids correspondant  a l'indice de l'output
   * les poids sont organise de cette maniere
   * WEIGHTS[INPUTS LEN][OUTPUTS LEN]
   */
  static feedForward(givenInputs: number[], level: Level)
  {
    for (let i = 0; i< level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i];
    };

    for (let i= 0; i < level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      };

      if (sum > level.biases[i]) {
        level.outputs[i] = 1; //on active ce neurone
      } else {
        level.outputs[i] = 0; // sinon on le desactive
      }
    };

    return (level.outputs);
  };
};
