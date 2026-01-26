import { Sequelize } from "sequelize"
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_URL)

try {
  await sequelize.authenticate();
  console.log('Banco de dados conectado com sucesso!');
} catch (error) {
  console.error('Falha ao conectar com o banco:', error);
}

export default sequelize
