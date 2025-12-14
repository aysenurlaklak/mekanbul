const addVenue = async function (req, res) {
    try{
        await Venue.create({
            // Diğer alanlar (...req.body sayesinde doğru gelir)
            ...req.body,
            // DÜZELTME 1: Sıra Longitude (Boylam) sonra Latitude (Enlem) olmalı
            // ve sayısal olduğundan emin olmalıyız
            coordinates:[parseFloat(req.body.long), parseFloat(req.body.lat)],
            hours:[{
                day:req.body.day1, 
                open:req.body.open1,
                close:req.body.close1,
                isClosed:req.body.isClosed1
            }
,{
                day:req.body.day2, 
                open:req.body.open2,
                close:req.body.close2,
                isClosed:req.body.isClosed2
            }
            ]
        }).then(function (venue) {
            createResponse(res,201,venue);
        });
    }
    catch(err){
        createResponse(res,404,err);
    }
}

const updateVenue = async function (req, res) {
   try{
       const updatedVenue = await Venue.findByIdAndUpdate(req.params.venueid,{
           ...req.body,
            // DÜZELTME 1: Sıra Longitude (Boylam) sonra Latitude (Enlem) olmalı
           coordinates:[parseFloat(req.body.long), parseFloat(req.body.lat)],
           hours:[
               {
                   day: req.body.day1, // DÜZELTME 2: days yerine day kullanıldı
                   open: req.body.open1,
                   close: req.body.close1,
                   isClosed:req.body.isClosed1
               },
               {
                   day: req.body.day2, // DÜZELTME 2: days yerine day kullanıldı
                   open: req.body.open2,
                   close: req.body.close2,
                   isClosed:req.body.isClosed2
               }
           ]
       },{new:true}
       );
       createResponse(res,201,updatedVenue);
   } catch (error) {
       createResponse(res,400,{status: "Güncelleme başarısız.",error});
   }
};