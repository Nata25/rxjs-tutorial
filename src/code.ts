import { Observable } from "rxjs/Observable";

const observer = (obs: any) => {
	obs.next('hi');
	setTimeout(() => {
		obs.next(`it's me`);
		// obs.error('Oooops...');
		obs.complete();
	}, 1000);
}

const observable = Observable.create(observer);

const subscribe = {
	next: (v: string) => addItem(v),
	error: (e: any) => console.error(e),
	complete: () => console.log('Complete!')
}
observable.subscribe(subscribe);

function addItem(v: string) {
	const node = document.createElement('li');
	const textNode = document.createTextNode(v);
	node.appendChild(textNode);
	document.getElementById('output').appendChild(node);
}