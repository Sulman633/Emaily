if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
}
else{
    //for local machine aka dev environment keys
    module.exports = require('./dev.js')
}