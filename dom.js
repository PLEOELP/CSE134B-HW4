/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advanced_walkBtn');
    element.addEventListener('click', function () {
        advanced_walk(document.querySelector("html"), 0);
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advanced_modifyBtn');
    element.addEventListener('click', function () {
        advanced_modify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('advanced_addBtn');
    element.addEventListener('click', function () {
        advanced_add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safe_removeBtn');
    element.addEventListener('click', function () {
        safe_remove();
    });

    element = document.getElementById('select_removeBtn');
    element.addEventListener('click', function () {
        select_remove();
    });    

    element = document.getElementById('cloneBtn');
    element.addEventListener('click', function () {
        clone();
    });

    element = document.getElementById('adv_cloneBtn');
    element.addEventListener('click', function () {
        advanced_clone();
    });    
}

function walk() {
   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);
}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    // alert(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`);

    let textareaNode = document.querySelector("#Q1a");
    textareaNode.textContent += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`;
}

/**
* Advanced_walk
* @param {Node} current walked node
* @param {Number} number of indent used in printing
* @return {undefined}
*/
function advanced_walk(node, indent){
    let textareaNode = document.querySelector("#Q1b");

    if (node.nodeType === 8){
        return;
    }
    if (node.nodeType === 3){
        let content = node.textContent.trim();
        if (content.length === 0){
            return;
        }
    }

    let format_str = null;
    for (let i = 0; i < indent; i++){
        textareaNode.textContent += "    ";
    }
    textareaNode.textContent += "|-- " + `${node.nodeName}\n`;
    
    let child = node.firstChild;
    while (child !== null){
        advanced_walk(child, indent+1);
        child = child.nextSibling;
    }

    // let childs = node.childNodes;
    // for (let i = 0; i < childs.length; i++){
    //     advanced_walk(childs[i], indent+1);
    // }
}


function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advanced_modify(){
    let h1 = document.querySelector("h1");
    h1.textContent = "DOM Manipulation is Fun!";
    h1.style.color = getComputedStyle(document.documentElement).getPropertyValue(`--darkcolor${getRandomIntInclusive(1,6)}`);

    let p1 = document.querySelector("#p1");
    if (p1.classList.contains("shmancy")){
        p1.classList.remove("shmancy");
    }
    else{
        p1.classList.add("shmancy");
    } 
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function advanced_add(){
    let selection = document.querySelector("#Q3");
    let selected_option = selection.querySelectorAll(`option`);

    for (let x of selected_option){
        if (x.selected === true){
            selected_option = x;
            break;
        }
    }

    let new_e = null;
    let e_content = document.querySelector("#added_content").value;
    console.log(e_content);
    switch(selected_option.value){
        case `textNode`:
            console.log("Case 1" + selected_option.value)
            new_e = document.createTextNode(e_content);
            break;
        case `element`:
            console.log(selected_option.value)
            let e_tag = document.querySelector("#added_tag").value;
            new_e = document.createElement(e_tag);
            new_e.textContent = e_content;
            break;
        case `comment`:
            new_e  =document.createComment(e_content);
            break;
    }

    let new_e_area = document.querySelector("#new_content")
    new_e_area.appendChild(new_e);
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safe_remove() {
    let body = document.querySelector("body");
    let target = body.lastChild;
    let next_target;
    while (target != null){
        next_target = target.previousSibling;
        if (target.id !== "controls"){
            document.body.removeChild(target);
        }
        target = next_target;
    }
}

function select_remove(){
    let target = document.querySelector("#select_remove").value;
    target = document.querySelectorAll(target);
    for (let tar of target){
        tar.remove();
    }
}

function clone(){
    let target = document.querySelector("#p1");
    let cloned_target = target.cloneNode(true);

    let area = document.querySelector("#cloned_content");
    area.appendChild(cloned_target);

}

function advanced_clone(){
    let template = document.querySelector("template");
    let card = template.content.cloneNode(true);

    let card_content = card.querySelector("article");
    // card_content.style.backgroundColor = "red";
    let card_title = card.querySelector("h3");
    card_title.textContent += Math.random();
    let card_p = card.querySelector("p");
    card_p.textContent += Math.random();

    

    let area = document.querySelector("#cloned_content");
    area.appendChild(card);
}

window.addEventListener('DOMContentLoaded', init);