import { Subject } from "rxjs/Subject";
import { take } from "rxjs/operators";
import { interval } from "rxjs/observable/interval";
import "rxjs/add/operator/skipUntil";

const obs = interval(1000).pipe(take(10));
const obs2 = new Subject();

const subscribe = (val: number) => {
	addItem(val.toString());
}

const skippedObs = obs.skipUntil(obs2);
skippedObs.subscribe(subscribe);

setTimeout(() => {
	obs2.next('Now you start!')
}, 3000);

function addItem(v: string) {
	const node = document.createElement('li');
	const textNode = document.createTextNode(v);
	node.appendChild(textNode);
	document.getElementById('output').appendChild(node);
}