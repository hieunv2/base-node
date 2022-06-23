const dotenv = require("dotenv");
const path = require("path");
const Joi = require("@hapi/joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.string().default("localhost"),
    DB_PORT: Joi.number().default(27017),
    DB_ROOT_USER: Joi.string().default("user"),
    DB_ROOT_PASS: Joi.string().default("booking@123"),
    DB_NAME: Joi.string().default("booking"),
    DB_USER: Joi.string().default("user"),
    DB_PASSWORD: Joi.string().default("booking@123"),
    JWT_SECRET: Joi.string()
      .required()
      .description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_SECONDS: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    SMTP_HOST: Joi.string().description("server that will send the emails"),
    SMTP_PORT: Joi.number().description("port to connect to the email server"),
    SMTP_USERNAME: Joi.string().description("username for email server"),
    SMTP_PASSWORD: Joi.string().description("password for email server"),
    EMAIL_FROM: Joi.string().description(
      "the from field in the emails sent by the app"
    ),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

const MONGODB_URL = `mongodb://${envVars.DB_ROOT_USER}:${envVars.DB_ROOT_PASS}@${envVars.DB_HOST}:${envVars.DB_PORT}/${envVars.DB_NAME}?authSource=admin`;

console.log("MONGODB_URL", MONGODB_URL);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationSeconds: envVars.JWT_ACCESS_EXPIRATION_SECONDS,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
};
