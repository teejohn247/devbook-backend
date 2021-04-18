import dotenv from 'dotenv';
import User from '../model/User';
import Notifications from '../model/Notifications'
const getNotification = async(req, res) => {
    try{
        let { time, page, limit } = req.params
        let currentDate = new Date().toISOString();
        console.log(time)
        console.log(`"${new Date().toISOString()}"`)
        console.log(currentDate);
        // {"date":{ $gte:ISODate("2019-02-10"), $lt:ISODate("2019-02-21") } }
        // receiver_id:req.payload.id},
        const notifications = await Notifications.find()
        .sort({date: -1})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        
        console.log('ds1',notifications2)
        const notifications2 = await Notifications.find({ receiver_id:req.payload.id, "date":{ $gte:time, $lt:Date.now() } });
        let totalNotifications = notifications2.length;
        notifications.push({totalNotifications: notifications2.length})

        
        console.log('ds2',notifications)
        if(!notifications){
            res.status(404).json({
                status:404,
                error:'notifications not found'
            })
            return;
        }
        res.status(200).json(
            notifications,
        )
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default getNotification;