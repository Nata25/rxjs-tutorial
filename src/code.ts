import { BehaviorSubject } from "rxjs";

const subj = new BehaviorSubject('Initialising');
subj.subscribe((v: string) => {
	addItem(`Subject 1: ${v}`);
})

subj.next('First value');
subj.next('Second value');
subj.next('...just before init of the second subject...');

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