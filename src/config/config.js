
export default {
    app:{
        PORT: process.env.PORT||8080,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        LOGGER_ENV: process.env.LOGGER_ENV
    },
    mongo:{
        URL: process.env.MONGO_URL||'localhost:27017'
    },
    jwt: {
        COOKIE: process.env.JWT_COOKIE,
        SECRET: process.env.JWT_SECRET
    },
    google:{
        CLIENT: process.env.GOOGLE_CLIENT,
        SECRET: process.env.GOOGLE_SECRET,
        KEY_FILE: process.env.GOOGLE_KEY_FILE,
        BUCKET_NAME: process.env.GOOGLE_BUCKET_NAME
    },
    mailer:{
        USER: process.env.NODE_MAILER_USER,
        PWD: process.env.NODE_MAILER_PASSWORD
    }
}