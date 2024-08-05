import winston from 'winston';


const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'magenta',
    debug: 'cyan',
}

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    // Tell Winston that the logs must be colored
    winston.format.colorize({ all: true }),
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

winston.addColors(colors)

// Define which transports the logger must use to print out messages. 
// In this example, we are using three different transports 
const transports = [
    // Allow the use the console to print the messages
    new winston.transports.Console(),
]
// Create the logger instance that has to be exported 
// and used to log messages.
const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})

export default Logger