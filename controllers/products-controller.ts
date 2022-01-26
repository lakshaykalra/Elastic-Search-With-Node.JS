
import {services} from '../services'

console.log('<<<<<<<services>>>>>',services)




async function postProduct(req,res) {
    try{

        console.log('<<<<<<<<',req.body)

        const product=await services.elasticService.storeData(req.body)

        return res.json({
            statusCode:200,
            message:'Product Saved',
            data:{}
        })



    } catch(e){
        console.log('<<<<error in posting product>>>>>>',e)
        return res.json({
            statusCode:400,
            message:'Error'
        })

    }
    
}

async function getProduct(req,res) {
    try{

        const product=await services.elasticService.searchData(req.query.name)

        return res.json({
            statusCode:200,
            message:'Product Saved',
            data:product
        })



    } catch(e){
        console.log('<<<<error in posting product>>>>>>',e)
        return res.json({
            statusCode:400,
            message:'Error'
        })

    }
    
}

async function postBulkProducts(req,res) {
    try{

        console.log('<<<<<<<<',req.body)

        const product=await services.elasticService.storeBulkData()

        return res.json({
            statusCode:200,
            message:'Bulk Product Saved',
            data:{}
        })



    } catch(e){
        console.log('<<<<error in posting product>>>>>>',e)
        return res.json({
            statusCode:400,
            message:'Bulk Error'
        })

    }
    
}

export ={
    postProduct,
    getProduct,
    postBulkProducts
}