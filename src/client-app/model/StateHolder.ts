import { ICard, IList, IState } from "./ModelInterface.js";

export class StateHolder {
  /**
   * data representation of all lists and cards
   */
  private _state: IState = {
    lists: [],
  };

  public get state(): IState {
    if (!this._state.lists) {
      throw new Error("no lists inside the state is valid!");
    }

    return this._state;
  }

  public set state(newState: IState) {
    this._state = newState;
  }

  public pushList(title: string) {
    this.state.lists.push(<IList>{ title, cards: [] });
  }

  public pushCard(listPos: number, content: string) {
    this.state.lists[listPos].cards.push(<ICard>{ content });
  }

  public reinitList() {
    this.state.lists = [];
  }
}
