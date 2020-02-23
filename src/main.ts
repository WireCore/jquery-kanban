import { Kanbanboard, IKanbanboard } from './kanbanboard';

interface KanbanboardOptions {
    kanbanboard?:JQuery;
}

declare global {
    interface JQuery {
        kanbanboard(options?:KanbanboardOptions): JQuery
    }
}

(function($) {
  $.fn.kanbanboard = function(options){
    var kanban = new Kanbanboard(<IKanbanboard> options);
    this.append(kanban.render());
    return this;
  };
})(jQuery);