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
    - Si el usuario está logueado, mostrar información del mismo y botón de Log Out. (No se debe mostrar los botones de Registro y Login una vez que el usuario está logueado)

- Componente Login:
	- Tiene que tener la validación de usuario contra firebase
	- Registrar el log de ese usuario en firebase.
	- En caso de que sea exitoso registrar:
		- Usuario
		- Fecha de ingreso
	- En caso correcto deber rutear a la home
    - Debe tener botones de acceso rápido. 
    - Estos botones tienen que completar los campos de email y contraseña con un usuario válido que al presionar el botón ingresar acceda a la home. 

- Componente Registro:
    - Tiene que generar un nuevo usuario y redirigir al home al crearlo exitosamente, es decir, loguear al usuario automáticamente.
    - Emitir mensaje si el usuario ya se encuentra registrado. (NO USAR ALERT)