import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();

const { Pool } = pg;

const connectionConfig: any = {
  connectionString: process.env.DATABASE_URL,
}

if (process.env.MODE === "PROD") {
    connectionConfig.ssl = {
      rejectUnauthorized: false,
    };
  }



export const connection = new Pool(connectionConfig);
