import { Observable } from "rxjs/Observable";
import { take, tap, pluck } from "rxjs/operators";
import { interval } from "rxjs/observable/interval";
import { fromEvent } from "rxjs/observable/fromEvent";

const observer = (obs: any) => {
	obs.next('hi');
	setTimeout(() => {
		obs.next(`it's me`);
		// obs.error('Oooops...');
		obs.complete();
	}, 1000);
}

const observable = fromEvent(document, 'mousemove');

const subscribe = {
	next: (v: string) => addItem(v),
	error: (e: any) => console.error(e),
	complete: () => console.log('Complete!')
}

setTimeout(() => {
	observable
	.pipe(
		pluck('clientX'),
		tap(e => console.log(e))
	)
	.subscribe(subscribe);
}, 3000);

function addItem(v: string) {
	const node = document.createElement('li');
	const textNode = document.createTextNode(v);
	node.appendChild(textNode);
	document.getElementById('output').appendChild(node);
}