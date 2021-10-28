import { Observable } from "rxjs/Observable";
import { tap, map } from "rxjs/operators";
import "rxjs/add/operator/share";

const observer = (obs: any) => {
	obs.next('hi');
	setInterval(() => {
		obs.next(`it's me`);
		// obs.error('Oooops...');
		// obs.complete();
	}, 1000);
}

const observable = Observable.create(observer)
.share();

const subscribe = {
	next: (v: string) => addItem(v),
	error: (e: any) => console.error(e),
	complete: () => console.log('Complete!')
}

observable.subscribe(subscribe);

setTimeout(() => {
	observable
	.pipe(
		tap(v => console.log(v)),
		map(v => `- subscription 2: ${v}`)
	)
	.subscribe(subscribe);
}, 2000);

function addItem(v: string) {
	const node = document.createElement('li');
	const textNode = document.createTextNode(v);
	node.appendChild(textNode);
	document.getElementById('output').appendChild(node);
}