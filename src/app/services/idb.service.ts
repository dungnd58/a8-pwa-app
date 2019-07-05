import { Injectable } from "@angular/core";
import { openDB, deleteDB } from 'idb';
import { Subject, Observable } from 'rxjs';
import * as moment from 'moment';
import { store } from '@angular/core/src/render3';
@Injectable({
    providedIn: 'root'
})

export class IdbService {
    private _dataChange: Subject<any> = new Subject<any>();
    private _dbPromise;
    private _dbName: string = 'a8-pwa-database';
    
    public networkMode: string = 'online';

    constructor(){
        if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
        }
        navigator.onLine === true ? this.networkMode = 'online' : this.networkMode = 'offline';
    }

    connectToIDB() {
        //this.deleteIDB();
        this._dbPromise = openDB(this._dbName, 1, {
            upgrade(db, oldVersion, newVersion) { //Called if this version of the database has never been opened before
                console.log('OLD: ' + oldVersion);
                console.log('NEW: ' + newVersion);
                let todayOS = db.createObjectStore('Today', {
                    keyPath: 'date', //define primary keys
                });
                //objectStore.createIndex('indexName', 'property', {unique, multiEntry});
                todayOS.createIndex('date', 'date', {unique: true});
                let historyOS = db.createObjectStore('History', {
                    keyPath: 'id',
                    autoIncrement: true //key generator will creates a unique value for every object added to the object store
                });
                historyOS.createIndex('id', 'id', {unique: true});
            },
            blocked() {
                console.log('There are older versions of DB open on the origin. So this version cannot open.')
            }
        })
    }

    deleteIDB() {
        deleteDB(this._dbName);
    }

    addItems(target: string, data: any) {
        this._dbPromise.then(db => {
            const tx = db.transaction(target, 'readwrite');
            let store = tx.objectStore(target);
            store.put(data);
            //this method doesn't actually close the transaction. The transaction completes on its own
            return tx.complete;
        }).then(() => {
            console.log(`added new item to ${target} OS`);
            this.getAllData(target).then((item: any) => {
                return this._dataChange.next(item);
            })
        });
    }

    updateItems(target: string, data: any) {
        this._dbPromise.then(db => {
            const tx = db.transaction(target, 'readwrite');
            let store = tx.objectStore(target);
            store.put(data);
            return tx.complete;
        }).then(() => {
            console.log(`updated item in ${target} OS`);
            this.getAllData(target).then((item: any) => {
                return this._dataChange.next(item);
            })
        });
    }

    deleteItems(target: string, data: any) {
        this._dbPromise.then(db => {
            const tx = db.transaction(target, 'readwrite');
            let store = tx.objectStore(target);
            store.delete(data);
            return tx.complete;
        }).then(() => {
            console.log(`updated item in ${target} OS`);
            this.getAllData(target).then((item: any) => {
                return this._dataChange.next(item);
            })
        });
    }

    getAllData(target: string) {
        let today = moment().startOf('day').unix();
        this._dbPromise.then(db => {
            const tx = db.transaction(target, 'readonly');
            let store = tx.objectStore(target);
            return store.openCursor();
        }).then(cursor => {
            if(!cursor) return;
            console.log('Cursored at: ',cursor.key);
            cursor.value.map(field => {
                if(field.date < today) {
                    store.delete(field);
                }
            })
        });
    }

    dataChanged(): Observable<any> {
        return this._dataChange;
    }
}