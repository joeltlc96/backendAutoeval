import dotenv from 'dotenv'
dotenv.config()

export const {
  PORT = 3000,
  SALT_ROUNDS = 10,
  PRIVATE_KEY = '12345',
  OPENAI_API_KEY = ''
} = process.env
