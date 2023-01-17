'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
    if (typeof executor !== 'function') throw TypeError('executor must be a function');
    this._state = 'pending';
    this._handlerGroups = [];
    // _handlerGroups = [ f1(), f2(), f3() ]
    executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function(value) {
    if (this._state === 'pending') {
        this._state = 'fulfilled';
        this._value = value;
        this._callHandlers();
    }
};
$Promise.prototype._internalReject = function(reason) {
    if (this._state === 'pending') {
        this._state = 'rejected';
        this._value = reason;
        this._callHandlers();
    }
};

$Promise.prototype._callHandlers = function() {
    // _handlerGroups = [ {sc:()={...}, ec: false} || false, ()={...}, ()={...} ]
    // !![] => true
    while (this._handlerGroups.length) {
        const hd = this._handlerGroups.shift();
        if (this._state === 'fulfilled') {
            if (hd.successCb) {
                // Manejamos los 3 caminos posibles
                try {
                    const result = hd.successCb(this._value);
                    if (result instanceof $Promise) {
                        // Handler resuelve a promesa
                        return result.then(
                            data => hd.downstreamPromise._internalResolve(data),
                            error => hd.downstreamPromise._internalReject(error)
                        )
                    } else {
                        // Handler resuelve a value:
                        // Resuelve a la nueva promesa
                        hd.downstreamPromise._internalResolve(result);
                    }
                } catch (error) {
                    // Si existe error, entro al catch:
                    hd.downstreamPromise._internalReject(error);
                }
            } else {
                hd.downstreamPromise._internalResolve(this._value);
            }
        } else if (this._state === 'rejected') {
            if (hd.errorCb) {
                try {
                    const result = hd.errorCb(this._value);
                    if (result instanceof $Promise) {
                        return result.then(
                            data => hd.downstreamPromise._internalResolve(data),
                            error => hd.downstreamPromise._internalReject(error)
                        )
                    } else {
                        hd.downstreamPromise._internalResolve(result);
                    }
                } catch (error) {
                    hd.downstreamPromise._internalReject(error);
                }
            } else {
                hd.downstreamPromise._internalReject(this._value);
            }
        }
    }
}

$Promise.prototype.then = function(successCb, errorCb) {
    if (typeof successCb !== 'function') successCb = false;
    if (typeof errorCb !== 'function') errorCb = false;
    // Creamos una nueva promesa:
    const downstreamPromise = new $Promise(() => {});
    this._handlerGroups.push({
        successCb,
        errorCb,
        downstreamPromise
    })
    if (this._state !== 'pending') this._callHandlers();
    // Retorna una nueva promesa
    return downstreamPromise;
}

$Promise.prototype.catch = function(errorCb) {
    return this.then(null, errorCb);
}

module.exports = $Promise;
/*------------------------------------------------------- */
