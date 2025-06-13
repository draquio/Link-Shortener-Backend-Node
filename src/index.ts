import app from './app';
import { ENV } from './utils/constants';

const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api/v1`);
  console.log(`Swagger running on: http://localhost:${PORT}/api-docs`);
});