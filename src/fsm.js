class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config = null) {
        if(config === null)
            throw new Error("Error");
        this.config = config;
        this.state = config.initial;
        this.history = [];
        this.changeHistory = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.config.states[state] === undefined)
            throw new Error("Error");
        this.updateHistory();
        this.changeHistory = [];
        this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.config.states[this.state].transitions[event] === undefined)
            throw new Error("Error");
        this.updateHistory();
        this.changeHistory = [];
        this.state = this.config.states[this.state].transitions[event];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.updateHistory();
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event = null) {
        if(event === null)
            return Object.keys(this.config.states);
        var states = [];
        Object.keys(this.config.states).forEach(element => {
            if(this.config.states[element].transitions[event] !== undefined)
                states.push(element);
        }); 

        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.history[0] === undefined)
            return false;
        this.changeHistory.push(this.state);
        this.state = this.history.pop();
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.changeHistory[0] === undefined)
            return false;
        this.history.push(this.state);
        this.state = this.changeHistory.pop();
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.changeHistory = [];
    }

    updateHistory(){
        this.history.push(this.state);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
