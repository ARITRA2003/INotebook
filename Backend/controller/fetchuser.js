import jwt from "jsonwebtoken";
const SECRET="gfiebdc";

const fetchuser=(req,res,next)=>{
   const token=req.header('auth-token');
   if(!token){
        return res.status(401).send({error:"please Enter a valid token"});
   }

   try{
        const data=jwt.verify(token,SECRET);
        req.user=data.user;
        next();
   }
   catch(error){
        res.status(401).send({error:"please Enter a valid token"});
   }
}

export default fetchuser;
