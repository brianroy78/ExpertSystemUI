

function abstractFetch(path: string, obj: any, callback: Function) {
    fetch(
        'http://127.0.0.1:5000' + path,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
        .then((response) => response.json()).then((json: any) => { callback(json) })
        .catch((error) => { })
        .finally(() => { })
}

export function insert(obj: any, callback: Function) { return abstractFetch('/insert', obj, callback) }
export function list(obj: any, callback: Function) { return abstractFetch('/list', obj, callback) }
export function listRules(obj: any, callback: Function) { return abstractFetch('/rules/list', obj, callback) }
export function getRules(obj: any, callback: Function) { return abstractFetch('/inference/get/rules', obj, callback) }
export function getVariable(obj: any, callback: Function) { return abstractFetch('/inference/get/variable', obj, callback) }
export function inferenceRespond(obj: any, callback: Function) { return abstractFetch('/inference/respond', obj, callback) }
export function parseFacts(obj: any, callback: Function) { return abstractFetch('/parse/facts', obj, callback) }
