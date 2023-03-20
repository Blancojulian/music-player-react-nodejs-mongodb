const whiteList = ['http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {

    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('No allowed by CORS'))
    }
  },
  optionSuccessStatus: 200
};


module.exports = corsOptions;