interface IKanbanboard {
    lists: Array<List>;
}

export class Kanbanboard implements IKanbanboard {
    
    lists: Array<List>;

    constructor(initData: IKanbanboard){
        this.lists = new Array<List>();

        console.log(initData);
        for(let list in initData){
            this.lists.push(new List({"title":"test","cards":[]}));
            //this.lists.push(new IList(initData[list]));
        }

    }

    render(){



    }

    /*greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }*/
}

interface IList {
    title: string;
    cards: Array<Card>;
}

class List implements IList {

    title: string;
    cards: Array<Card>;

    constructor(initData: IList){
        this.title = initData.title;

        console.log(this);

    }

}

class Card {

    title: string;
    image: string;
    icons: Array<Icon>;
    labels: Array<Label>;

}

class Icon {

    icon: string;
    text: string;

}

class Label {

    color: string;

}