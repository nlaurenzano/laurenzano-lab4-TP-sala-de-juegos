# laurenzano-lab4-TP-sala-de-juegos

Sprint 1: Entrega en clase 03 - 14/9
''''''''''''''''''''''''''''''''''''

- Armado del proyecto
- Subido a hosting WEB.
- Componente de Login.
- Componente de Home.
- Componente “Quién Soy”
- Favicon



Sprint 2: Entrega en Clase 04 - 21/9
''''''''''''''''''''''''''''''''''''

- Componente Home:
    - Tiene que ser el componente principal, el cual tendrá los accesos a los diferentes juegos y listados.
    - Si el usuario está logueado, mostrar información del mismo y botón de Log Out. (No se debe mostrar los botones de Registro y Login una vez que el usuario está logueado).

- Componente Login:
	- Tiene que tener la validación de usuario contra firebase.
	- Registrar el log de ese usuario en firebase.
	- En caso de que sea exitoso registrar:
		- Usuario.
		- Fecha de ingreso.
	- En caso correcto deber rutear a la home.
    - Debe tener botones de acceso rápido.
      Estos botones tienen que completar los campos de email y contraseña con un usuario válido que al presionar el botón ingresar acceda a la home:
      Algunos usuarios existentes:
      -	test1@lab4.com / password
      - admin@admin.com / password

- Componente Registro:
    - Tiene que generar un nuevo usuario y redirigir al home al crearlo exitosamente, es decir, loguear al usuario automáticamente.
    - Emitir mensaje si el usuario ya se encuentra registrado. (NO USAR ALERT)

**	Cambios en tsconfig.json:
	"compilerOptions": {
	 ...
	 ...
	   "strict": false,
	   "noPropertyAccessFromIndexSignature": false,
	 ...
	 ...
	},
	  "angularCompilerOptions": {
	    "strictTemplates": false
	  }


Sprint 4 (Clase 05)
'''''''''''''''''''

- Agregar el juego Preguntados
	- Tiene que obtener las imágenes de una api.
	- Realizar el llamado a la api desde un Service.
	- Dar al jugador opciones de elección. No se puede ingresar datos por teclado.

- Juego propio
	- Realizar juego propio.
		- Juegos que no se pueden utilizar
			- TATETI
			- MEMOTEST
			- PIEDRA PAPEL O TIJERA
	- Agregar descripción de su juego en la sección “Quién soy”. Debe contar con información de qué juego es y cómo se juega.

