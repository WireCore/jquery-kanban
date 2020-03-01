import { Card, ICard } from "./card";

export interface IList {
    title: string;
    cards: Array<Card>;
    options: Array<IListOption>;
    addCardEvent: Function;
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
    addCardEvent: Function;

    constructor(initData: IList){
        this.title = initData.title;
        this.cards = new Array<Card>();
        this.options = new Array<IListOption>();
        this.addCardEvent = initData.addCardEvent;

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
        return newCard;
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
                <!-- footer button -->
                <div class="kanban-list-footer-addItemContainer">
                    <textarea class="kanban-list-footer-addItem-Container-textarea" placeholder="Enter Text"></textarea>
                </div>
            </div>
        `);

        $(listDOM).find(".kanban-list-header-button").append(this.createListOptions());
        $(listDOM).find(".kanban-list-footer").append(this.createFooterButtonOpenTextarea());
        $(listDOM).find(".kanban-list-footer-addItemContainer").append(this.createFooterButtonAddCard());
        $(listDOM).find(".kanban-list-footer-addItemContainer").append(this.createFooterButtonCancelAddCard());

        // add textarea eventlistener
        $(listDOM).find('.kanban-list-footer-addItem-Container-textarea').on("keypress", function(e:any) {
            if(e.key === "Enter"){
                this.addCardListenerFunction();
                return false;
            }
        }.bind(this));

        container.append(listDOM);
        this.htmlElement = container;

		return container;

    }

    addCardListenerFunction(){
        var text = $(this.htmlElement).find('.kanban-list-footer-addItem-Container-textarea').val();
        var card: ICard = <ICard>{"title":text};
        var addedCard = this.addCard(card);
        $(this.htmlElement).find('.kanban-list-footer-addItem-Container-textarea').val('');
        $(this.htmlElement).find('.kanban-list-footer-addItem-Container-textarea').focus();
        this.addCardEvent(addedCard);
    }

    createFooterButtonOpenTextarea(){

        var button: HTMLElement = document.createElement("button");
        $(button).append('<i class="fas fa-plus"></i> Add new Card');
        button.classList.add("kanban-list-button");
        button.classList.add("kanban-list-footer-button");
        
        // click listener
        button.addEventListener("click",function(){
            $(this).css('display','none');
            $(this).parent().find(".kanban-list-footer-addItemContainer").css('display','block');
            $(this).parent().find(".kanban-list-footer-addItem-Container-textarea").focus();
        });

        return button;

    }

    createFooterButtonCancelAddCard(){
        
        var button: HTMLElement = document.createElement("button");
        $(button).append('<i class="fas fa-times"></i>');

        // click listener
        button.addEventListener("click",function(){
            $(this).parent().css('display','none');
            $(this).parent().parent().find('.kanban-list-footer-button').css('display','block');
        });

        return button;

    }

    createFooterButtonAddCard(){

        var button: HTMLElement = document.createElement("button");
        $(button).append("Add Card");

        button.addEventListener("click",function(){
            this.addCardListenerFunction();
        }.bind(this));

        return button;

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