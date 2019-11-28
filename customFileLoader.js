module.exports = {
    loadMiddleware:(fileName,folderName = null)=>{
        let filePath = fileName;
        if(folderName){
            filePath = `${folderName}/${fileName}`;
        }
        return require(`./middlewares/${filePath}`);
    },
    loadApiController:(fileName,folderName = 'v1')=>{

           let  filePath = `${folderName}/${fileName}`;

        return require(`./controllers/api/${filePath}`);
    },
	loadAdminController:(fileName,folderName = 'v1')=>{
		
		let  filePath = `${folderName}/${fileName}`;
		
		return require(`./controllers/admin/${filePath}`);
	},
    loadModel:(fileName)=>{
        return require(`./models/${fileName}`);
    },
    loadServices:(fileName)=>{
        return require(`./services/${fileName}`);
    },
    loadConstants:(fileName)=>{
        return require(`./constants/${fileName}`);
    },
    loadConfig:(fileName="")=>{
        return require(`./config/${fileName}`);
    },
    loadHelper:(fileName="")=>{
        return require(`./helpers/${fileName}`);
    }
}