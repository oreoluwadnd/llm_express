import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../../config.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  PORT: number | undefined;
  DATABASE: string | undefined;
  JWT_SECRET: string | undefined;
  JWT_EXPIRES_IN: string | undefined;
  API_VERSION: string | undefined;
  API_PREFIX: string | undefined;
  JWT_COOKIE_EXPIRES_IN: unknown;
}

interface Config {
  PORT: number;
  DATABASE: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  API_VERSION: string;
  API_PREFIX: string;
  JWT_COOKIE_EXPIRES_IN: unknown;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    DATABASE: process.env.DATABASE,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    API_VERSION: process.env.API_VERSION,
    API_PREFIX: process.env.API_PREFIX,
    JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
