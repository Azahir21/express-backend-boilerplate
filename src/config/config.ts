import dotenv from "dotenv";

dotenv.config();

interface Config {
  server: {
    port: number;
    env: string;
  };
  database: {
    url: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  admin: {
    username: string;
    email: string;
    password: string;
  };
}

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    console.error(`Environment variable ${key} is required`);
    process.exit(1);
  }
  return value || defaultValue!;
};

export const config: Config = {
  server: {
    port: parseInt(getEnv("SERVER_PORT", "8080")),
    env: getEnv("SERVER_ENV", "development"),
  },
  database: {
    url: getEnv("DATABASE_URL"),
  },
  jwt: {
    secret: getEnv("JWT_SECRET", "your-secret-key-change-this-in-production"),
    expiresIn: getEnv("JWT_EXPIRES_IN", "72h"),
  },
  admin: {
    username: getEnv("DEFAULT_ADMIN_USERNAME", "admin"),
    email: getEnv("DEFAULT_ADMIN_EMAIL", "admin@example.com"),
    password: getEnv("DEFAULT_ADMIN_PASSWORD", "admin123"),
  },
};
