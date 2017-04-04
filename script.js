'use strict';

const fs = require('fs');
const crypto = require('crypto');
const stream = require('stream');
const Transform  = require("stream").Transform;

const input = fs.createReadStream("data/input.txt");
let output = fs.createWriteStream("data/output.txt");
const md5 = crypto.createHash('md5');

let in1 = input.pipe(md5);

in1.pipe(output);
in1.pipe(process.stdout);

let in2 = fs.createReadStream("data/input.txt");
let out2 = fs.createWriteStream("data/output.txt");
const md52 = crypto.createHash('md5');

class hTransform extends Transform {
	constructor(options) {
		super(options);
	}
	_transform(chunk, encoding, callback) {
		md52.update(chunk.toString());
		this.push(md52.digest('hex'));
		callback();
	}
}

const htr = new hTransform();
output = fs.createWriteStream('data/output2.txt');

in2.pipe(htr);
in2.pipe(output);
in2.pipe(process.stdout);
