// these are redux files ...
// these are redundent code ,doing nothing in appp  logic...
// these are for future upgrade...
function Data(){
    return {
     owner:null,
     messages:{ MikeRossHarveySpecter:[ 
                    {val:"hello ji ,lol",route:"sent",time:"12:04 pm"},
                    {val:"hello ji",route:"replies",time:"12:04 pm"},
                    {val:"hello ji",route:"sent",time:"12:04 pm"}
                ]
     },
     contacts:[{id:1,name:'Louis Litt',imgSrc:'http://emilcarlsson.se/assets/louislitt.png',lastMsg:'You just got LITT up, Mike.',route:"recieve"},
               {id:2,name:'Mike Ross',imgSrc:'http://emilcarlsson.se/assets/harveyspecter.png',lastMsg:'Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.',route:'recieve'},
               {id:3,name:'Harvey Specter',imgSrc:'http://emilcarlsson.se/assets/harveyspecter.png',lastMsg:'Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.',route:"recieve"},
               {id:4,name:'Rachel Zane',imgSrc:'http://emilcarlsson.se/assets/rachelzane.png',lastMsg:'I was thinking that we could have chicken tonight, sounds good?',route:'sent'},
               {id:5,name:'Donna Paulsen',imgSrc:'http://emilcarlsson.se/assets/donnapaulsen.png',lastMsg:'Mike, I know everything! I\'m Donna..',route:'recieve'}
            ],
     openedContact:{id:5,name:'Donna Paulsen',imgSrc:'http://emilcarlsson.se/assets/donnapaulsen.png',lastMsg:'Mike, I know everything! I\'m Donna..',route:'recieve'}

    }
}
export default Data;