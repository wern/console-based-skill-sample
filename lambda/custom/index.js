const Alexa = require('alexa-sdk');

const capitals = new Map([
    ['deutschland', 'berlin'], 
    ['england', 'london'], 
    ['frankreich', 'paris']
    ]);

const handlers = {
    // Funktion fuer die Verarbeitung des CapitalIntents
    'CapitalIntent': function () {
        const country = this.event.request.intent.slots.country.value;
        const capital = capitals.get(country);
        const response = capital ?
            'die hauptstadt von '+ country +' ist ' + capitals.get(country) :
            'die hauptstadt von '+ country +' kenne ich leider nicht';
        this.response.speak(response);
        this.emit(':responseReady');
    },
    // Alle anderen Intents landen hier
    'Unhandled': function () {
        this.response.speak('Da fehlt wohl etwas');
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = '';  // hier APP-ID einfuegen
    alexa.registerHandlers(handlers);
    alexa.execute();
};
