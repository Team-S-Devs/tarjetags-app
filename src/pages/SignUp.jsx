import React from 'react'

const SignUp = () => {
  return (
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-4">
                <h2>Registro</h2>
                <form>
                    <div class="form-group">
                        <label for="username">Usuario:</label>
                        <input type="text" class="form-control" id="username" placeholder="Ingresa tu usuario" />
                    </div>
                    <div class="form-group">
                        <label for="email">Correo Electrónico:</label>
                        <input type="email" class="form-control" id="email" placeholder="Ingresa tu correo electrónico" />
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña:</label>
                        <input type="password" class="form-control" id="password" placeholder="Ingresa tu contraseña" />
                    </div>
                    <button type="submit" class="btn btn-primary">Registrarse</button>
                </form>
            </div>

            {/* <!-- Segunda Columna --> */}
            <div class="col-md-4">
                <h2>Información Adicional</h2>
                <p>Aquí puedes agregar información adicional sobre el registro.</p>
            </div>

            {/* <!-- Tercera Columna (Solo en pantallas grandes) --> */}
            <div class="col-md-4 d-none d-md-block">
                <img src="tu-imagen.jpg" alt="Imagen de Registro" class="signup-image" />
            </div>
        </div>
    </div>
  )
}

export default SignUp