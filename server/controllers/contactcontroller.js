import User from "../models/userschema.js";


const searchcontact = async(req,res,next)=>{
try {
    const {searchTerm} = req.body;
    if(searchTerm === undefined || searchTerm === null){
        console.log(searchTerm)
        return res.status(404).json({
            message: "Search Term is Required",
        })
    }

    const cleansearchterm = searchTerm.replace(
        /[.*+?^${}()|[\]\\]/g,"\\$&"
    )

    const regex = new RegExp(cleansearchterm,"i")

    const contact = await User.find({
        $and : [{ _id: {$ne: req.userid } },
          {  
        $or: [{firstName:regex},{lastName:regex},{email:regex}],
     },
    ],
    })
    return res.status(200).json({contact})

} catch (error) {
    console.log(error)
    res.status(500).json({message:"Internal Server Error"})
}
}

export {searchcontact}