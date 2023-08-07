let logger =  (req,res,next)=>{
    let date = new Date().getHours();
    console.log(req.method,req.url, date);
    next();  
};

module.exports = logger;
