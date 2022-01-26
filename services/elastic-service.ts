import {Client} from '@elastic/elasticsearch'
import { createReadStream } from 'fs'
import split2 from 'split2'



const client=new Client({
    cloud:{
        id:'Test:dXMtZWFzdDQuZ2NwLmVsYXN0aWMtY2xvdWQuY29tJDYwNDY5NGJlM2MyOTRlZjliMDgwZmFhNjU4ZDMyM2U1JGIxZGVmMDRiMWFjMTQzZTVhZjkwZTg2YWI5ODA5MzFi'
    },
    auth:{
        username:'elastic',
        password:'QWqq6AcQM1mHm92SdH8r2Qt4'
    }
})

async function testElasticSearch(){
    try{

        const response=await client.info()

        console.log('<<<<<success<<',response)

    } catch(error){
        console.log('<<<<<<<ERROR<>>',error)
    }
}



async function storeData(productData){
    try{

        const data=await client.index({
            index:'products',
            body:JSON.stringify(productData)
        })

        return true



    } catch(e){
        console.log('<<<<ERROR IN STORING DATA IN ELASTIC>>>',e)
        throw e
    }
}


async function searchData(search){
    try{

        const data=await client.search({
            index:'products',
            body:{
                query:{
                    match:{
                        name:search
                    }
                }
            }
        })

        return data



    } catch(e){
        console.log('<<<<ERROR IN STORING DATA IN ELASTIC>>>',e)
        throw e
    }
}

async function prepare() {

    // if index exists, return
    // if index doesn't exists, create mapping and create index

    const exists= await client.indices.exists({index:'comments'})

    console.log('<<<<<<<<<<<<<<IS EXIST>>>>>>>>',exists)

    if(exists.body) return 
    else{
      return  await client.indices.create({
            index:'comments',
            body:{
                mappings:{
                    properties:{
                        userId:{type:'integer'},
                        id:{type:'integer'},
                        title:{type:'text'},
                        completed:{type:'boolean'}

                    }

                }
            }
        })
    }
    
}

async function storeBulkData() {
    try{


        await prepare()

        let datasource=createReadStream('./test.json').pipe(split2())

      const result=  await client.helpers.bulk({
            datasource,
            onDocument(doc){
                return {
                    index:{_index:'comments'}
                }
            }

        })

        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<',result)



    } catch(e){
        console.log('<<<<<ERROR IN SAVING BULK DATA>>>>.',e)
    }
    
}





export ={
    storeData,
    searchData,
    storeBulkData
}