import { Card, ICard } from "./card";

export interface IList {
    title: string;
    cards: Array<Card>;
    options: Array<IListOption>
}

interface IListOption {
    text: string;
    callback: Function;
}

export class List implements IList {

    htmlElement: HTMLElement;
    title: string;
    cards: Array<Card>;
    options: Array<IListOption>;

    constructor(initData: IList){
        this.title = initData.title;
        this.cards = new Array<Card>();
        this.options = new Array<IListOption>();

        // cards
        for(let card in initData.cards){
            this.cards.push(new Card(initData.cards[card]));
        }

        // options
        for(let option in initData.options){
            this.options.push(<IListOption> initData.options[option]);
        }

    }

    patch(options:IList){
        // title
        this.title = options.title;
        $(this.htmlElement).find(".kanban-list-title").html(this.title);
    }

    addCard(card:ICard){
        var newCard:Card = new Card(card);
        this.cards.push(newCard);
        $(this.htmlElement).find('.kanban-list-content').append(newCard.render());
    }

    render(){

        var container: HTMLElement = document.createElement("div");
		container.className = "kanbanboard-list";

        var listDOM = document.createRange().createContextualFragment(`
            <div class="kanban-list-header">
                <div class="kanban-list-title">
                    ${this.title}
                </div>
                <div class="kanban-list-header-button">
                    <button class="kanban-list-button"><i class="fas fa-ellipsis-h"></i></button>
                    <!-- options -->
                </div>
            </div>
            <div class="kanban-list-content">
                ${this.createListContent()}
            </div>
            <div class="kanban-list-footer">
                <button class="kanban-list-button kanban-list-footer-button"><i class="fas fa-plus"></i> Add new Card</button>
            </div>
        `);

        $(listDOM).find(".kanban-list-header-button").append(this.createListOptions());
        container.append(listDOM);
        this.htmlElement = container;
		return container;

    }

    createListOptions(){

        var container: HTMLElement = document.createElement("div");
		container.className = "kanban-list-header-button-dropdown";

        for(let option in this.options){
            var p: HTMLElement = document.createElement("p");
            p.style.margin = "0";
            p.append(this.options[option].text);
            p.addEventListener("click",(e:Event) => this.options[option].callback());
            container.append(p);
        }

        return container;

    }

    createListContent(){

        var container: HTMLElement = document.createElement("div");
		container.className = "kanban-list-content";

		for(let card in this.cards){
			container.append(this.cards[card].render());
		}

		return container.innerHTML;

    }

}