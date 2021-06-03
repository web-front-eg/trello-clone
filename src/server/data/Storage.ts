import * as Model from "../model/Model";

class Storage {
  private _state: Model.IState = {} as Model.IState;

  public set state(newState: Model.IState) {
    this._state = newState;
    console.log(this._state);
  }

  public get state() {
    return this._state;
  }
}

export default new Storage();
