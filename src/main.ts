import * as $ from "jquery";
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

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);

    //const kanban = new Kanbanboard(kanbanboard);

    //elt.innerText = sayHello(name);
	//const greeter = new Greeter('message 1');
	//elt.innerText = greeter.greet();
}

showHello('greeting', 'TypeScript');