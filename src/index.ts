import app from '@/app';
import { prisma } from '@/config/prismaClient';
import { ENV } from '@/utils/constants';

const PORT = ENV.PORT;
async function main(){
  try {
    await prisma.$connect();
    console.log("✅ Conectado a la base de datos");

    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}/api/v1`);
      console.log(`Swagger running on: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
    process.exit(1);
  }
}

main();

