import bcrypt from "bcryptjs";

const fun= async()=>{
    let pass="$2a$10$iPPHV/KsRRJ8O055NbFvTO5m1N6baq05pVWQo4tyEEY1c4MwjvtUO";
    let un="125676afffffff5";
    const ans= await bcrypt.compare(un,pass);
    console.log(ans);
}

fun();