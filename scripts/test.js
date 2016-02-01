
var util = require('./util');


util.series(["npm run build","karma start --single-run --no-auto-watch --browsers PhantomJS"], function(err){

    if(err)
    {
        console.log(err);
        process.exit(1);
    }

    process.exit(0);
});

