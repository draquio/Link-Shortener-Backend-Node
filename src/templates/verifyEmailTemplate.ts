export const verifyEmailTemplate = (link: string): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verifica tu cuenta</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 50px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #4f46e5;
        padding: 20px;
        color: white;
        text-align: center;
      }
      .content {
        padding: 30px;
        color: #333333;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        margin-top: 20px;
        background-color: #4f46e5;
        color: #ffffff;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      .footer {
        margin-top: 40px;
        font-size: 12px;
        color: #888888;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>¡Bienvenido a LinkShortener!</h1>
      </div>
      <div class="content">
        <p>Gracias por registrarte. Para completar el proceso, por favor verifica tu dirección de correo haciendo clic en el botón abajo:</p>
        <a href="${link}" class="button">Verificar mi cuenta</a>
        <p>Si tú no creaste esta cuenta, puedes ignorar este correo.</p>
        <div class="footer">
          © 2025 LinkShortener. Todos los derechos reservados.
        </div>
      </div>
    </div>
  </body>
</html>
`;
