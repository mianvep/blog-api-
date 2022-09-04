# Rutas

- /api/v1/users
- /api/v1/users/:id
- /api/v1/users/me

//Rutas de autenticación

- /api/v1/auth/login
- /api/v1/auth/register
- /api/v1/auth/password-recovery
- /api/v1/auth/verify-account

- /api/v1/users
- - GET

- /api/v1/users/:id
- - GET
- - PUT (ADMIN)
- - DELETE (ADMIN)
    //las peticiones POST se manejaran en el register

- /api/v1/users/me //estas seran rutas protegidas donde podran hacer peticiones solo las usuarios logeados
- - GET
- - PUT
- - PATCH
- - DELETE

- /api/v1/auth/login
- - POST

- /api/v1/auth/register
- - POST

- /api/v1/auth/password-recovery
- - POST
- - PATCH
