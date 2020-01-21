const { NODE_ENV } = process.env;

const getConfig = (ENV) => {
    if (ENV === "test") {
        return require("./config.test.json");
    }

    return require("./config.json");
};


module.exports = getConfig(NODE_ENV);