

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
export function update(obj: any, callback: Function) { return abstractFetch('/update', obj, callback) }
export function list(obj: any, callback: Function) { return abstractFetch('/list', obj, callback) }
export function getInferenceStart(obj: any, callback: Function) { return abstractFetch('/inference/start', obj, callback) }
export function inferenceRespond(obj: any, callback: Function) { return abstractFetch('/inference/respond', obj, callback) }


export function insertVariable(obj: any, callback: Function) {
    return abstractFetch(
        '/insert', { ...obj, _type_: 'variable' }, callback
    )
}

export function listVariables(callback: Function) {
    list({
        _type_: 'variable',
        _relations_: [{ _relation_name_: 'options' }]
    }, (json: any) => {
        callback(json)
    })
}

export function listRules(callback: Function) {
    list({
        _type_: 'rule',
        _relations_: [
            {
                _relation_name_: 'premises',
                _relations_: [
                    { _relation_name_: 'variable' },
                    { _relation_name_: 'value' },
                ]
            },
            {
                _relation_name_: 'conclusions',
                _relations_: [
                    { _relation_name_: 'variable' },
                    { _relation_name_: 'value' },
                ]
            }
        ]
    }, (json: any) => {
        callback(json)
    })
}