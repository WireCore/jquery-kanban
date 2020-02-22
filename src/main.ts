//import { sayHello } from './greet';
//import { Greeter } from './kanbanboard';
import * as $ from "jquery";
//import { Kanbanboard } from './kanbanboard';

/*interface FooOptions {
    color?: string
  }

  declare global {
    interface JQuery {
      foo(options?: FooOptions): JQuery
    }
  }

  $.fn.foo = function(this: JQuery, options?: FooOptions) {
    const settings: FooOptions = {
      color: 'blue',
      ...options,
    }
    return this.each(function() {
      $(this).css({ 'background-color': settings.color })
    })
  }*/

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
    
    console.log(options);
    return this;

};
})(jQuery);

//declare var test123:string;
//test123 = "test12345";

//$('body').css('background-color','red');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);

    //const kanban = new Kanbanboard(kanbanboard);

    //elt.innerText = sayHello(name);
	//const greeter = new Greeter('message 1');
	//elt.innerText = greeter.greet();
}

showHello('greeting', 'TypeScript');