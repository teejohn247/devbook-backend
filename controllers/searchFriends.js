import Profile from '../model/Profile';


const searchFriends= async(req, res) => {
    let page = req.params.page;
    let limit = req.params.limit;
    try{
        let { name } = req.query

    
        console.log('here')
        console.log(name)

        var record = await Profile.find()

        var filter = {};


        if(name){
            const s = name
            const regex = new RegExp(s, 'i') // i for case insensitive
            filter.name = {$regex: regex};
        };
        
        // if(author){
        //     const s = author
        //     const regex = new RegExp(s, 'i') // i for case insensitive
        //     filter.author = {$regex: regex}
        // };

        // if(date){
        //     filter.date = date;
        // };

   
         const records = await Profile.find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        console.log(records)

        const count = await Profile.find().countDocuments();
        
        console.log(count)
        if(!records){
            res.status(404).json({
                status:404,
                error:'no record available'
            })
        }

        if(name){
            const result = await Profile.find(
                    { tags : { $elemMatch : { "tag_name" : `${tag_name}`} } }, filter
                );
              return res.status(200).json({
                status:200,
                result,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            })
            };
        
        res.status(200).json({
            status:200,
            records,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default searchFriends;