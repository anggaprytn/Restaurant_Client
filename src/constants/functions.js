export const convertToRupiah = (number) => {
	let rupiah = '';		
	let numRev = number.toString().split('').reverse().join('');
	for(let i = 0; i < numRev.length; i++) if(i%3 == 0) rupiah += numRev.substr(i,3)+'.';
	return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
}

export const convertToMoney = (number) => {
	let rupiah = '';		
	let numRev = number.toString().split('').reverse().join('');
	for(let i = 0; i < numRev.length; i++) if(i%3 == 0) rupiah += numRev.substr(i,3)+'.';
	return rupiah.split('',rupiah.length-1).reverse().join('');
}

export const convertToMinutes = (time) => {
	let minutes = Math.floor(time / 60);
	let seconds = time - (minutes * 60);

	minutes = minutes.toString().padStart(2, 0);
	seconds = seconds.toString().padStart(2, 0);

	return `${minutes}:${seconds}`
}
