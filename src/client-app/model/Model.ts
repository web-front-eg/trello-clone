import { Service } from "../service/Service.js";
import { delay } from "../util/timer.js";
import { IList, IState } from "./ModelInterface.js";

class Model {
  private state: IState;

  constructor(saveInterval: number = 5, syncInterval: number = 10) {
    this.state = {
      lists: [],
    };

    // this.saveAutomatically(saveInterval);
    // this.syncAutomatically(syncInterval);

    document
      .querySelector(".save")!
      .addEventListener("click", e => this.save.bind(this, e));
    document
      .querySelector(".load")!
      .addEventListener("click", e => this.load.bind(this, e));
  }

  public async save(): Promise<void> {
    try {
      // TOOD: POST data to server
      await Service.POST_SaveLists(this.state);
      console.log("saved!");
    } catch (e: unknown) {
      console.error("Save failed! : ", e);
    }
  }

  public async load(): Promise<void> {
    try {
      // TODO: GET data from server and apply into state
      await Service.GET_LoadLists();
      console.log("loaded!");
    } catch (e: unknown) {
      console.error("Load failed! : ", e);
    }
  }

  public async loadAutomatically(syncInterval: number): Promise<void> {
    while (true) {
      try {
        await delay(this.load, syncInterval * 1000);
      } catch (e: unknown) {
        console.error(`sync automatically failed! error status code: ${e}`);
      }
    }
  }

  public async saveAutomatically(saveInterval: number): Promise<void> {
    while (true) {
      try {
        await delay(this.save, saveInterval * 1000);
      } catch (e: unknown) {
        console.error(`save automatically failed! error status code: ${e}`);
      }
    }
  }

  public addNewList(title: string): void {
    this.state.lists.push(<IList>{ title, cards: [] });
  }

  public addNewCard(listPos: number, content: string): number {
    const cardsArr = this.state.lists[listPos].cards;
    const order = cardsArr.length;
    cardsArr.push({ content });

    return order;
  }

  public updateCards(newState: IState): void {
    this.state = newState;
    console.log(this.state);
  }
}

export default new Model(5, 10);
