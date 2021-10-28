import { Subject } from "rxjs";

const subj = new Subject();
subj.subscribe((v: string) => {
	addItem(`Subject 1: ${v}`);
})

subj.next('First value');
subj.next('Second value');

const unsub = subj.subscribe((v: string) => {
	addItem(`Subject 2: ${v}`);
})

subj.next('Third value');

unsub.unsubscribe();

subj.next('Final value');

function addItem(v: string) {
	const node = document.createElement('li');
	const textNode = document.createTextNode(v);
	node.appendChild(textNode);
	document.getElementById('output').appendChild(node);
}