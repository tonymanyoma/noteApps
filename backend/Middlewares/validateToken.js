require('dotenv').config();


const middleware = {

    verify: function (req, res, next) {
        // console.log('Token', req.headers['authorization'])

        if(req.headers['authorization']){
            const formatToken =  req.headers['authorization'].split(' ');
            
            const token = formatToken[1];
        
            if (!token)res.send('Access denied')

            if (token == process.env.API_TOKEN){
                next();
            }else{
                res.send('Access denied, token incorrect')
            }
        }else{
            res.send('Access denied, not authorization token')
        }
    
    }
}

module.exports = middleware;