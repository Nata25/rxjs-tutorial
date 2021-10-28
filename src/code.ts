import { Observable } from "rxjs/Observable";
import { interval } from "rxjs/observable/interval";
import { take } from "rxjs/operators";

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

const obsWithInterval = interval(1000).pipe(take(5));
const sub1 = obsWithInterval.subscribe((val) => addItem(`from obsInterval: ${val}`));

const obsWithInterval2 = interval(1000).pipe(take(5));
const sub2 = obsWithInterval2.subscribe((val) => addItem(`I will be cancelled: ${val}`));
setTimeout(() => {
	sub2.unsubscribe()
}, 4000);

sub2.add(sub1); // sub1 is cancelled along with sub2 which is cancelled explicitly

function addItem(v: string) {
	const node = document.createElement('li');
	const textNode = document.createTextNode(v);
	node.appendChild(textNode);
	document.getElementById('output').appendChild(node);
}