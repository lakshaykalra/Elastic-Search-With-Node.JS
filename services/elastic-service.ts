import {Client} from '@elastic/elasticsearch'
import { createReadStream,readFile,writeFile } from 'fs'
import * as split from 'split2'
import * as util from 'util'
const readFileAsync=util.promisify(readFile)
const writeFileAsync=util.promisify(writeFile)

console.log('<<<<<<<<<',split)





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
            index:'comments',
            q:`*${search}*`
            // body:{
            //     query:{
            //         match:{
            //             title:search
            //         }
            //     }
            // }
        })

        return data.body.hits.hits



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

async function createNDJSONFile() {
    try{

        let data:any=await readFileAsync('./test.json')

        // data=data.toString()


        let wholeArray=JSON.parse(data)
        console.log('<<<<<<<<<whole array>>>>>>>>.',typeof wholeArray)

        wholeArray=wholeArray.map(element=>JSON.stringify(element)).join('\n')

        await writeFileAsync('./test.ndjson',wholeArray)


    }catch(e){

        console.log('<<<<<ERROR IN NDJSON FNCTION>>>>>')
        throw e
    }
    
}

async function storeBulkData() {
    try{


        // await prepare()

        await createNDJSONFile()

        let datasource=createReadStream('./test.ndjson').pipe(split())

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