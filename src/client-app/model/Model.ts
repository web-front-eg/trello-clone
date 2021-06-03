import { delay } from "../util/timer.js";
export interface ICard {
  content: string;
}

export interface IList {
  title: string;
  cards: Array<ICard>;
}

export interface IState {
  lists: Array<IList>;
}

class Model {
  private state: IState;

  constructor(saveInterval: number = 5, syncInterval: number = 10) {
    this.state = {
      lists: [],
    };

    this.saveAutomatically(saveInterval);
    this.syncAutomatically(syncInterval);
  }

  public save(): void {
    try {
      // TOOD: POST data to server
      console.log("saved!");
    } catch (e: unknown) {
      console.error("Save failed! : ", e);
    }
  }

  public sync(): void {
    try {
      // TODO: GET data from server and apply into state
      console.log("synchronized!");
    } catch (e: unknown) {
      console.error("Synchronization failed! : ", e);
    }
  }

  public async syncAutomatically(syncInterval: number): Promise<void> {
    while (true) {
      try {
        await delay(this.sync, syncInterval * 1000);
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
