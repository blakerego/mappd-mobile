import { Injectable } from '@angular/core';

@Injectable()
export class ServerService {

	public rootUrl: string = 'http://localhost:3000';

	constructor() {}

}