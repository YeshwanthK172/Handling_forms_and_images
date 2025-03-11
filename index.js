const express = require("express")
const fileUplaod = require("express-fileupload")
const cloudinary = require("cloudinary")

cloudinary.config({
    // cloud_name: processs.env.CLOUD_NAME
    cloud_name: "dcsk8woyp",
    api_key: "394776883186295",
    api_secret: "fOz8X0Vnw6xCiQlOwEp_0e3ANcE",
  });


const app = express();

app.set('view engine', 'ejs')

//middlewares
app.use(express.json())// im gonna use something thats from the json<postman>// MIDDLEWARE
app.use(express.urlencoded({extended: true}))
app.use(fileUplaod(
    {
        useTempFiles:true,// these are only for fun, THEY WILL BE USED FOR UPLOADING FILES IN CLOUDINARY
        tempFileDir:"/tmp/"//useTempFiles key send the whole object given below
        /**
         *  samplefile: {
    name: 'Anjaneyar.png',
    data: <Buffer >,
    size: 530243,
    encoding: '7bit',
    tempFilePath: '\\tmp\\tmp-1-1741529791666',
    truncated: false,
    mimetype: 'image/png',
    md5: '1ff158fe7909fd676413535af32a9e5e',
    mv: [Function: mv]
  }
         */
    }
))

app.get("/myget", (req, res)  => {
    console.log(req.body);
    
    res.status(200).send(req.query);//its coming from the URL*****
})

app.post("/mypost", (req, res)  => {
    console.log(req.body);
  console.log(req.files);

  let result;
  let imageArray = [];

  // case - multiple images

  if (req.files) {
    for (let index = 0; index < req.files.samplefile.length; index++) {
      let result =  cloudinary.v2.uploader.upload(
        req.files.samplefile[index].tempFilePath,
        {
          folder: "Home",
        }
      );

      imageArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  // ### use case for single image
   //let file = req.files.samplefile;
   //result = cloudinary.uploader.upload(file.tempFilePath, {//tempFilePath has the temperory path of the file
    //folder: "../Home/users",
   //});

  console.log(result);

  details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    result,
    imageArray
  };

  res.send(details);
  console.log(details);
  
})

app.get("/mygetform", (req, res)  => {
    res.render("getforms");
})

app.get("/mypostform", (req, res)  => {
    res.render("postform");
})

app.listen(3000, () => {console.log("Server is running on port 3000");
})