const pubsub = (() => {
    // 
    const events = [{name:"", subs:[]}]
    // 
    const publish = (eventName, data) => {
        //
        console.log(`Calling event:`, eventName);
        // 
        let event = events.find((element) => element.name === eventName)
        // 
        if(event)
        {
            event.subs.map((element) => 
            {
                console.log("Callback:", element);
                element(data);
            });
        }
    }
    // 
    const subscribe = (eventName, callback) => {
        // 
        console.log(`Subscribing to event:`, eventName);
        // 
        let event = events.find((element) => element.name === eventName)
        // 
        if(event)
        {
            if(!event.subs.includes(callback))
            {
                console.log("Adding callback");
                event.subs.push(callback);
            }
        }
        else {
            events.push({
                name: eventName,
                subs: [callback]
            })
        }

        console.log("Current Pubsubs: ", events);
    }
    // 
    const unsubscribe = (eventName, callback) => {
        console.log("Unsubscribing to event:", eventName);
        let event = events.find((element) => element.name === eventName);
        let sub = event.subs.splice(event.subs.findIndex((element) => element.name === callback), 1);

        console.log("Current Pubsubs: ", events);
    }

    return { publish: publish, subscribe: subscribe, unsubscribe: unsubscribe }
})();

export default pubsub;