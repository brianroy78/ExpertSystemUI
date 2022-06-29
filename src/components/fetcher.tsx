

function fetch_(path: string, obj: any, callback: Function) {
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

export function insert(obj: any, callback: Function) { return fetch_('/insert', obj, callback) }
export function update(obj: any, callback: Function) { return fetch_('/update', obj, callback) }
export function delete_(obj: any, callback: Function) { return fetch_('/delete', obj, callback) }
export function list(obj: any, callback: Function) { return fetch_('/list', obj, callback) }
export function getSessionId(obj: any, callback: Function) { return fetch_('/inference/start', obj, callback) }
export function getSessionIdFrom(obj: any, callback: Function) { return fetch_('/inference/start/from', obj, callback) }
export function inferenceRespond(obj: any, callback: Function) { return fetch_('/inference/respond', obj, callback) }
export function deleteInference(obj: any, callback: Function) { return fetch_('/inference/delete', obj, callback) }


export function insertVariable(obj: any, callback: Function) { return insert({ ...obj, _type_: 'variable' }, callback) }
export function insertClient(obj: any, callback: Function) { return insert({ ...obj, _type_: 'client' }, callback) }
export function insertQuotation(obj: any, callback: Function) { return insert({ ...obj, _type_: 'quotation' }, callback) }

export function listClients(callback: Function) { list({ _type_: 'client' }, (json: any) => { callback(json) }) }

export function listVariables(callback: Function) {
    list({
        _type_: 'variable',
        _relations_: [{ _relation_name_: 'options' }]
    }, (json: any) => { callback(json) })
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
    }, (json: any) => { callback(json) })
}

export function listDevices(callback: Function) { list({ _type_: 'device', }, (json: any) => { callback(json) }) }

export function listQuotation(client_id: any, callback: Function) {
    list({
        _type_: 'quotation',
        _filters_: [
            ['client_id', client_id]
        ]
    }, (json: any) => { callback(json) })
}

export function deleteQuotationById(id: any, callback: Function) {
    delete_({
        _type_: 'quotation',
        id: id
    }, (json: any) => { callback(json) })
}

export function listSelectedOptions(quotationId: any, callback: Function) {
    list({
        _type_: 'selected_option',
        _filters_: [
            ['quotation_id', quotationId]
        ],
        _relations_: [
            {
                _relation_name_: 'option',
                _relations_: [
                    { _relation_name_: 'variable' }
                ]
            }
        ]
    }, (json: any) => { callback(json) })

}