const { Aws, Enum, validator } = require('chingari');

const start = async () => {
    if (process.env.APP_ENV !== 'local') {
        const ssmParamStore = new Aws.SsmParamStore(Enum.ServiceName.CHAT_HELPER);
        await ssmParamStore.loadEnvs();
    } else {
        require('dotenv').config();
    }
    await validator.VerifyEnvsRequired();

    const mongo = require('./connection/db');
    await mongo.connectDB();

    const bootstrap = require('./service');
    bootstrap();
};


start().catch((err) => {
    console.error(err);
});
