import { Observable } from "rxjs/Observable";
import { merge } from "rxjs/observable/merge";
import { take } from "rxjs/operators";
import { interval } from "rxjs/observable/interval";

const obs = Observable.create((o: any) => {
	o.next('String observable');
	setTimeout(() => {
		o.next('Second value from string observable');
	}, 3000)
});
const obs2 = interval(1000).pipe(take(5));

const subscribe = (val: number) => {
	addItem(val.toString());
}

const obsMerged = merge(obs, obs2);
obsMerged.subscribe(subscribe);

function addItem(v: string) {
	const node = document.createElement('li');
	const textNode = document.createTextNode(v);
	node.appendChild(textNode);
	document.getElementById('output').appendChild(node);
}