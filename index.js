/*
Arc
v1.0
12/28/2018
*/
module.exports = function instagg(mod) {

                                                            ///////////////////////
                                                            ///// Dependancies ////
                                                            ///////////////////////
    const Vec3 = require('tera-vec3');

                                                            ///////////////////////
                                                            ////// Variables //////
                                                            ///////////////////////
    const waitTime = 5000; //depending on how quick u load u can lower this value a bit to port faster
    const ggZoneId = 9713;
    let enabled = true;
    let ggZoneConfirmed = false;
    let tpCoordinates = new Vec3(52226, 117230, 4360); //DO NOT EDIT, YOU GONNA LOSE THE NUMBERS, YOU GONNA GET STUCK IN SOME WEIRD SPOT AND ALL HELL IS GONNA BREAK LOOSE
    let gameID = 0;
                                                            ///////////////////////
                                                            //////// Hooks ////////
                                                            ///////////////////////
    mod.hook('S_LOGIN', 12, (event) => {
        gameID = event.gameId
    })
    mod.hook('S_LOAD_TOPO', 3, (event) => {
        if(enabled)
        {
            if(event.zone == ggZoneId)
            {
                ggZoneConfirmed = true;
            }
        }
    })
    mod.hook(`S_SPAWN_ME`, 3, (event) => {
        if(ggZoneConfirmed)
        {
            ggZoneConfirmed = false;
            setTimeout(function(){             
                mod.send('S_INSTANT_MOVE', 3,{
                    gameId: gameID,
                    loc: tpCoordinates,
                    w: 0
                }) 
            }, waitTime);
        }
    })
                                                            ///////////////////////
                                                            /////// Commands //////
                                                            ///////////////////////
    mod.command.add('instagg', () => {	
        if(enabled){
            enabled = false;
            mod.command.message(`Disabled`);
        }
        else{
            enabled = true;
            mod.command.message(`Enabled`);
        }
    })
}