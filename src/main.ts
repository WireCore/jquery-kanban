import { Kanbanboard, IKanbanboard } from './kanbanboard';
import { IList, List } from './list';
import { ICard, Card } from './card';

interface KanbanboardOptions {
    kanbanboard?:JQuery;
}

interface AddListOptions {
  list?:JQuery;
}

interface AddCardOptions {
  list?:number;
  card?:Card;
}

declare global {
    interface JQuery {
        kanbanboard(options?:KanbanboardOptions): Kanbanboard;
        addList(options?:AddListOptions):Kanbanboard;
        addCard(options?:AddCardOptions):Kanbanboard;
    }
}

(function($) {
  $.fn.kanbanboard = function(options){
    var kanban = new Kanbanboard(this,<IKanbanboard> options);
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

  $.fn.addCard = function(options){

    // wrong object check
    if(!(this[0] instanceof Kanbanboard)){
      throw new Error('Invalid variable. Expected Kanbanboard object');
    }
    
    var board:Kanbanboard = this[0];
    board.lists[options.list].addCard(<ICard> options.card);
    $(board.htmlObject).empty();
		$(board.htmlObject).append(board.render());

    return this;
  };

})(jQuery);