import { Kanbanboard, IKanbanboard } from './kanbanboard';
import { IList, List } from './list';
import { ICard, Card } from './card';

interface KanbanboardOptions {
    kanbanboard?:JQuery;
}

interface AddListOptions {
  list?:JQuery;
}

interface EditListOptions {
  list?:List;
}

interface DeleteListOptions {
  list?:List;
}

interface AddCardOptions {
  card?:Card;
}

interface EditCardOptions {
  card?:Card;
}

interface DeleteCardOptions {
  card?:Card;
}

declare global {
    interface JQuery {
        kanbanboard(options?:KanbanboardOptions): Kanbanboard;
        addList(options?:AddListOptions):Kanbanboard;
        editList(options?:EditListOptions):Kanbanboard;
        deleteList(options?:DeleteListOptions):Kanbanboard;
        addCard(options?:AddCardOptions):Kanbanboard; 
        editCard(options?:EditCardOptions):Kanbanboard;
        deleteCard(options?:DeleteCardOptions):Kanbanboard;
    }
}

(function($) {
  $.fn.kanbanboard = function(options){
    var kanban = new Kanbanboard(<IKanbanboard> options);
    this.append(kanban.render());
    return kanban;
  };

  $.fn.addList = function(options){

    // wrong object check
    if(!(this[0] instanceof Kanbanboard)){
      throw new Error('Invalid variable. Expected Kanbanboard object');
    }

    var board:Kanbanboard = this[0];
    board.addList(<IList> options);

    return board;
  };

  $.fn.editList = function(options){

    // wrong object check
    if(!(this[0] instanceof List)){
      throw new Error('Invalid variable. Expected Kanbanboard List object');
    }
    
    var list:List = this[0];
    list.patch(<IList> options);

    return this;

  };

  $.fn.deleteList = function(options){

    // wrong object check
    if(!(this[0] instanceof Kanbanboard)){
      throw new Error('Invalid variable. Expected Kanbanboard List object');
    }

    var kanbanboard:Kanbanboard = this[0];
    $(options.list.htmlElement).remove();

    var listIndex = kanbanboard.lists.indexOf(options.list);
    if(listIndex > -1){
      kanbanboard.lists.splice(listIndex,1);
    }

    return this;

  };

  $.fn.addCard = function(options){

    // wrong object check
    if(!(this[0] instanceof List)){
      throw new Error('Invalid variable. Expected Kanbanboard List object');
    }

    var list:List = this[0];
    list.addCard(<ICard> options);

    return this;

  };

  $.fn.editCard = function(options){

    // wrong object check
    if(!(this[0] instanceof Card)){
      throw new Error('Invalid variable. Expected Kanbanboard List object');
    }

    var card:Card = this[0];
    card.patch(<ICard> options);

    return this;

  };

  $.fn.deleteCard = function(options){

    // wrong object check
    if(!(this[0] instanceof List)){
      throw new Error('Invalid variable. Expected Kanbanboard List object');
    }

    var list:List = this[0];

    $(options.card.htmlElement).remove();

    var cardIndex = list.cards.indexOf(options.card);
    if(cardIndex > -1){
      list.cards.splice(cardIndex, 1);
    }

    return this;

  };

})(jQuery);