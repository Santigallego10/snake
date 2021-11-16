document.addEventListener('DOMContentLoaded', () => { // Esta linea verifica que se vaya a ejecutar toda la estructura del HTML
  const squares = document.querySelectorAll('.grid div'); // En esta variable se seleccionan todo lo elmentos div que componen la cuadricula y los guardamos en una variable llamada squares. 
  const scoreDisplay = document.querySelector('span'); // El elemento que se encuentra entre las etiquetas span (0) guardelo en una variable constante llamada scoreDisplay.
  const startBtn = document.querySelector('.start'); // Guarde en la una constante llamda starBtn el elemento boton start.

  const width = 10; // Una constante llamada width con un valor asignado de 10.
  let currentIndex = 0; // Una variable definida con el nombre currenIndex asignada con el valor.
  let appleIndex = 0; // Variable definida con el nombre de appleIndex y asignacion del valor 0.
  let currentSnake = [2,1,0]; // Variable definida con el nombre currentSnake tipo array de tres elementos. 
  let direction = 1; // Variable definida con el nombre direction y con un valor asignado de 1.
  let score = 0; // Variable defina con el nombre score y con un valor asignado de cero.
  let speed = 0.9; // variable definidad con  el nombre speed y a la cual se asignado el de valor de 0.9
  let intervalTime = 0; // Variable definida con el nombre intervalTime y con un valor asignado de 0. 
  let interval = 0; // Variable  definida con el nombre interval  con el valor  de cero.



  //to start, and restart the game
  function startGame() { // Se crea una funcion llamada inicio del juego
    currentSnake.forEach(index => squares[index].classList.remove('snake')); //Del vector currentSnake recorra todos lo cuadritos de este vector y luego vaya despintado los cuadros de las primeras posiciones de culebra.
    squares[appleIndex].classList.remove('apple');//Inicia la manzana en su punto cero y luego la remueve.
    clearInterval(interval); // Esta funcion clearInterval resetea un el puntaje en el momento en que se vaya volver a iniciar el juego.
    score = 0; // En esta parte vuelve  a iniciar la variable  inicializar la variable score.
    randomApple();// Al comenzar o reiniciar el juego la mazana puede aparecer en algun lugar aleatorio de la cuadricula.
    direction = 1; // cuando comienza el juego la serpiente empieza a moverse a la derecha.
    scoreDisplay.innerText = score;// Modifica el puntaje cada vez que inicia o reinicia el juego.
    intervalTime = 1000;// Representa un 1 segundo (1000 milisegundos)
    currentSnake = [2,1,0];// Esta variable hace referencia a la serpiente es decir a su cuerpo,el 2 es la cola,1 es cuerpo y 0 la cabeza.
    currentIndex = 0;// Se refiere al espacio en el cual inicia la serpiente en cuadrante.
    currentSnake.forEach(index => squares[index].classList.add('snake')); // Recorre los espacios de este vector y le agrega a estos espacios la clase Snake ( pinta la serpiente) 
    interval = setInterval(moveOutcomes, intervalTime);// En esta linea se ejecuta la funcion moveOutcomes cada segundo.
  }


  //Funcion que trata con todos los movimientos de la serpiente.
  function moveOutcomes() { // Esta funcion se encarga de que la serpiente avance.

    // Trata con el movimiento de la serpiente en el caso de se choque con alguno de los muros.
    if (
      (currentSnake[0] + width >= (width * width) && direction === width ) || // Si la serpiente se choca con el muro  de abajo
      (currentSnake[0] % width === width -1 && direction === 1) || // Si la serpiente se choca con el muro derecho.
      (currentSnake[0] % width === 0 && direction === -1) || // Si la serpiente se choca con el muro izquierdo.
      (currentSnake[0] - width < 0 && direction === -width) ||  //Si la serpiente se choca con el muro de arriba.
      squares[currentSnake[0] + direction].classList.contains('snake') // si la serpiente se choca contra ella misma.
    ) {
      return clearInterval(interval) // limpia el intervalo si sucede alguna accion  de las que esta arriba.
    }

    const tail = currentSnake.pop(); // Remueve la cola de la serpiente
    squares[tail].classList.remove('snake');  // En esta linea  se hubica en el recuadro que le corresponde tail y se reumueva la clase snake para borrarle el color a la serpiente.s 
    currentSnake.unshift(currentSnake[0] + direction); // le da direccion a la cabeza de la serpiente.

    //Trata de la serpiente intentando conseguir la manzana.
    if(squares[currentSnake[0]].classList.contains('apple')) { // Si el cuadrante en el que hubica la cabeza de la serpiente contiene la clase apple.
      squares[currentSnake[0]].classList.remove('apple');     // Entonces remueva la clase apple ( manzana) del cuadrante en el que se encuentra la cabeza de la serpiente.
      squares[tail].classList.add('snake'); // En el cuadrante donde se hubique la variable tail agregue la clase snake.
      currentSnake.push(tail); // En esta linea se agrega al vector currentSnake la constante tail.
      randomApple();// Hubique la manzana en un  espacio del grid aleatoriamente.
      score++; // aumente el puntaje.
      scoreDisplay.textContent = score;// muestre el puntaje.
      clearInterval(interval);// reinicie el intervalo de tiempo 
      intervalTime = intervalTime * speed;// reinicie la velocidad a cero.
      interval = setInterval(moveOutcomes, intervalTime);//En esta linea se ejecuta la funcion moveOutcomes cada segundo.
    }
    squares[currentSnake[0]].classList.add('snake'); // agrega la clase snake a la cabeza de la serpiente es decir aumenta su cuerpo.
  }


  //Genera una nueva manzana cuando la serpiente la come
  function randomApple() { // 
    do{
      appleIndex = Math.floor(Math.random() * squares.length); // se genera un numero a aleatorio y es multiplicado por el numero (100) de divs y luego rendodea el numero resultante
    } while(squares[appleIndex].classList.contains('snake')); // En esta linea se asegura que la mazana no aparezca encima de la serpiente
    squares[appleIndex].classList.add('apple'); // En esta linea agrega la clase manazana que esta en esa posicion del arreglo.
  }


  //Esta funcion cambia la direccion de la serpiente.
  function control(e) {
    squares[currentIndex].classList.remove('snake'); //Remueva la clase snake en el cudrante con valor cero.

    if(e.keyCode === 39) {
      direction = 1; // Si presionamos la flecha derecha la serpiente ira hacia la derecha una sola vez.
    } else if (e.keyCode === 38) {
      direction = -width // si presionamos la flecha hacia arriba la serpiente ira de vuelta 10 cuadros, aparecera arriba. 
    } else if (e.keyCode === 37) {
      direction = -1 // si presionamos a la izquierda la serpiente ira  al izquierda una sola vez.
    } else if (e.keyCode === 40) {
      direction = +width //si presionamos la flecha hacia abajo la serpiente movera su cabeza e ira ahcia esa direccion.
    }
  }

  document.addEventListener('keyup', control);// Ejecuta la funcion control cuando el evento keyup se cumple.
  startBtn.addEventListener('click', startGame); // Este es un boton de inicio del juego, ejecuta una funcion cuando el evento click se cumple.
});
