
/**
 * @swagger
 * tags:
 *   - name: Autentificación
 *     description: Inició de sesión para uso de API's
 *   - name: Paquetes
 *     description: Registro, actualización y cancelación de paquetes
 * 
 */

/**
 * @swagger
 * path:
 *  /autenticar/:
 *    post:
 *      summary: Autentificacion de Cliente
 *      description: Envia usuario y contraseña para generar un Token con vigencia de 24 horas, que se solicita en cada petición
 *      tags: [Autentificación]
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/SolitToken'
 *      responses:
 *        "200":
 *          description: Token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Token'
 *        "404":
 *          description: Error de Credenciales
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error-Respuesta'
 * 
 * paths:
 *   /paquete/:
 *    post:
 *      summary: Registra Pedidos
 *      description: Registra Pedidos(Maximo 50 pedidos por petición) y regresa un JSON con la informacion de cada pedido con su respectiva Remesa y Paquete
 *      tags: [Paquetes]
 *      security:
 *       - ApiKeyAuth: []
 *      parameters:
 *        -
 *          name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWQiOjk5OCwiZmVjaGFfaW5pIj
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PaquetePost'
 *      responses:
 *        "200":
 *          description: Respuesta de Registro de Paquetes
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PaquetePost-Response'
 *        "401,403":
 *          description: Error de Token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error-Token-Respuesta'
 *    put:
 *      summary: Modifica Pedido
 *      description: Modifica el Pedido(Maximo 1 pedido por petición) y regresa un JSON con la informacion actualizada con su respectiva Remesa y Paquete
 *      tags: [Paquetes]
 *      security:
 *       - ApiKeyAuth: []
 *      parameters:
 *        -
 *          name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWQiOjk5OCwiZmVjaGFfaW5pIj
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PaquetePut'
 *      responses:
 *        "200":
 *          description: Respuesta de Modificación del Paquete
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PaquetePut-Response'
 *        "401,403":
 *          description: Error de Token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error-Token-Respuesta'
 *        "404":
 *          description: Error No se encontro el Pedido, Remesa y Paquete
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error-Respuesta'
 *        "204, 500":
 *          description: Error Modificación de Pedido
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error-Mensaje-Respuesta' 
 *    delete:
 *      summary: Cancela Pedido
 *      description: Cancela el Pedido indicado (Maximo 1 pedido por petición) y regresa un JSON con la informacion del estatus con su respectiva Remesa y Paquete
 *      tags: [Paquetes]
 *      security:
 *       - ApiKeyAuth: []
 *      parameters:
 *        -
 *          name: access-token
 *          in: header
 *          type: string
 *          required: true
 *          example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWQiOjk5OCwiZmVjaGFfaW5pIj
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PaqueteDelete'
 *      responses:
 *        "200":
 *          description: Respuesta de Cancelación del Paquete
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PaqueteDelete-Response'
 *        "401,403":
 *          description: Error de Token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error-Token-Respuesta'
 *        "404":
 *          description: Error No se encontro el Pedido, Remesa y Paquete
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error-Respuesta'
 *        "202, 500":
 *          description: Error Cancelación de Pedido
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error-Mensaje-Respuesta' 
 */