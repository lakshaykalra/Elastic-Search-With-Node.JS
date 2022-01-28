
import { createWriteStream, fstat } from 'fs'
import fetch from 'node-fetch'
import {promisify} from 'util'
import {pipeline} from 'stream'
const streamPipeline = promisify(pipeline);
import ndjson from 'ndjson'

// import * as p from 'stream'
// const { pipeline } = require('stream/promises');


async function saveJSON() {

    try{

        const response=await fetch('https://jsonplaceholder.typicode.com/todos')


     // await streamPipeline(response.body,createWriteStream('./test.json')) // 1

      response.body.pipe(createWriteStream('./test.json')) // 2

     console.log('<<<<<<<<<end<<<',)

    } catch(e){
        console.log('>>>>>>>',e)
    }

}

saveJSON()

// async function saveNDJSON(){
//     try{

//         const response=await fetch('https://jsonplaceholder.typicode.com/todos')

//         response.body.pipe().on('data',obj=>{
//            console.log('<<<<<,obj>>>>>>',obj)
//         })





//     } catch(e){
//         console.log('<<<<<<<<<<<<<<',e)
//         return e
//     }
// }

// saveNDJSON()
// import { createReadStream } from 'fs'

// import split2 from 'split2'

// createReadStream('./test1.json').pipe(split2(JSON.parse)).on('data',doc=>{
//     console.log('<<<<<<<<',doc)
// })